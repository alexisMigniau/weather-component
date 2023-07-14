import { useRef} from "react";
import { styled } from "styled-components"
import getIconFromWeatherCode from "../services/icons";
import CloudyNight from "../video/cloudy-night.mp4"
import { FaRegClock, FaRegCalendarAlt } from "react-icons/fa";

const MeteoContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
`

const Temperature = styled.h3`
    color : white;
    font-size : 30px;
`

const CityData = styled.div`
`

const CloudVideo = styled.video`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index : -10;
    object-fit: cover;
`

const HourContainer = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    border-radius : 20px;
    background-color : #3D3D3D;
    width : 100%;
    opacity : 60%;
    padding : 10px;
    transition : all 1s;
    &:hover {
        opacity: 80%;
    }
`

const HourLabel = styled.h4`
    margin: 10px;
    font-size : 18px;
    align-items : center;
    display : flex;
    column-gap : 20px;
`

const Hours = styled.div`
    display: flex;
    flex-direction : row;
    justify-content : space-evenly;
    column-gap : 25px;
`

const Hour = styled.div`
    display: flex;
    flex-direction : column;
    align-items : center;
    font-size : 14px;
`

const HourContent = styled.h4`
    margin-top : 4px;
    margin-bottom : 4px;
`

const DayContainer = styled(HourContainer)`
    margin-top : 30px;
`

function Meteo({data, city}) {

    const videoRef= useRef();

    const setPlayBack = () => {
      videoRef.current.playbackRate = 0.25;
    };

    const currentHourIso = (new Date()).getHours();

    const indexOfCurrentHour = data.hourly.time.findIndex((time) => (new Date(time).getHours() === currentHourIso));

    const nextDayHourly = [];

    for(let i = indexOfCurrentHour; i < indexOfCurrentHour + 24; i++) {
        nextDayHourly.push({
            time : i === indexOfCurrentHour ? "maint." :  (new Date(data.hourly.time[i])).getHours() + " h",
            is_day : data.hourly.is_day[i],
            temperature : data.hourly.temperature_2m[i],
            weathercode :  data.hourly.weathercode[i]
        });
    }

    return (
        <MeteoContainer>
            <CloudVideo
                autoPlay
                muted
                preload="true" 
                src={CloudyNight}
                onCanPlay={setPlayBack}
                ref={videoRef}
            />
            <CityData>
                <h2>{city.name}</h2>
            </CityData>
            <img style={{marginTop : "-30px", marginBottom : "-30px"}} alt={data.current_weather.weathercode} src={getIconFromWeatherCode(data.current_weather.weathercode, data.current_weather.is_day)} width="200px" />
            <Temperature>{data.current_weather.temperature} C°</Temperature>
            <HourContainer>
                <HourLabel><FaRegClock /> Prévision heure par heure</HourLabel>
                <hr style={{width : "98%"}} />
                <Hours>
                    {nextDayHourly.map(({time, weathercode, is_day, temperature}, index) => (
                        <Hour key={`hour-${index}`}>
                            <HourContent>{time.padStart(4, '0')}</HourContent>
                            <img alt={weathercode} src={getIconFromWeatherCode(weathercode, is_day)} width="40px" />
                            <HourContent>{temperature} C°</HourContent>
                        </Hour>
                    ))}
                </Hours>
            </HourContainer>
            <DayContainer>
                <HourLabel><FaRegCalendarAlt /> Prévision sur 10 jours</HourLabel>
                <hr style={{width : "98%"}} />
            </DayContainer>
        </MeteoContainer>
    )
}

export default Meteo