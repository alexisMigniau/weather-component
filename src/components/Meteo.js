import { useRef} from "react";
import { styled } from "styled-components"
import getIconFromWeatherCode from "../services/icons";
import CloudyNight from "../video/cloudy-night.mp4"
import DayForecast from "./DayForecast";
import HourForecast from "./HourForecast";

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
    display: flex;
    flex-direction : column;
    align-items : center;
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

const CityHeader = styled.div`
    display: flex;
    column-gap : 20px;
`

const CityDescripion = styled.h3`
    color : #ADADAD;
`



function Meteo({data, city}) {

    const videoRef= useRef();

    const setPlayBack = () => {
      videoRef.current.playbackRate = 0.25;
    };

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
                <CityHeader>
                    <h2>{city.name}</h2>
                    <img style={{paddingLeft : "5px"}} alt={city.country} src={`https://hatscripts.github.io/circle-flags/flags/${city.country_code.toLowerCase()}.svg`} width="40" />
                </CityHeader>
                <CityDescripion>{[city.country, city.admin1, city.admin2, city.admin3, city.admin4].filter(a => a !== "" && a !== city.name).filter((value, index, array) => array.indexOf(value) === index).join(', ')}</CityDescripion>
            </CityData>
            <img style={{marginTop : "-40px", marginBottom : "-50px"}} alt={data.current_weather.weathercode} src={getIconFromWeatherCode(data.current_weather.weathercode, data.current_weather.is_day)} width="150px" />
            <Temperature>{data.current_weather.temperature} C°</Temperature>
           <HourForecast hourlyData={data.hourly} />
            <DayForecast dailyData={data.daily} />
        </MeteoContainer>
    )
}

export default Meteo