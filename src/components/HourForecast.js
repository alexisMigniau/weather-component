import { useEffect, useState } from "react";
import { styled } from "styled-components";
import getIconFromWeatherCode from "../services/icons";
import { FaRegClock } from "react-icons/fa";

const HourContainer = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    border-radius : 20px;
    background-color : #3A3D3D;
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

function HourForecast({hourlyData}) {

    const [nextHours, setNextHours] = useState([])

    useEffect(() => {
        const currentHourIso = (new Date()).getHours();

        const indexOfCurrentHour = hourlyData.time.findIndex((time) => (new Date(time).getHours() === currentHourIso));

        const nextDayHourly = [];

        for(let i = indexOfCurrentHour; i < indexOfCurrentHour + 24; i++) {
            nextDayHourly.push({
                time : i === indexOfCurrentHour ? "maint." :  (new Date(hourlyData.time[i])).getHours() + " h",
                is_day : hourlyData.is_day[i],
                temperature : hourlyData.temperature_2m[i],
                weathercode :  hourlyData.weathercode[i]
            });
        }

        setNextHours(nextDayHourly)
    }, [hourlyData])

    return(
        <HourContainer>
            <HourLabel><FaRegClock /> Prévision heure par heure</HourLabel>
            <hr style={{width : "98%"}} />
            <Hours>
                {nextHours.map(({time, weathercode, is_day, temperature}, index) => (
                    <Hour key={`hour-${index}`}>
                        <HourContent>{time.padStart(4, '0')}</HourContent>
                        <img alt={weathercode} src={getIconFromWeatherCode(weathercode, is_day)} width="40px" />
                        <HourContent>{temperature} C°</HourContent>
                    </Hour>
                ))}
            </Hours>
        </HourContainer>
    )
}

export default HourForecast;