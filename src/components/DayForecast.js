import { useEffect, useState } from "react";
import { styled } from "styled-components"
import getIconFromWeatherCode from "../services/icons";
import { FaRegCalendarAlt } from "react-icons/fa";

const Day = styled.div`
    display: flex;
    flex-direction : row;
    align-items : center;
`

const DayContainer = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    border-radius : 20px;
    background-color : #3A3D3D;
    width : 100%;
    opacity : 60%;
    padding : 10px;
    transition : all 1s;
    margin-top : 30px;
    &:hover {
        opacity: 80%;
    }
`

const DayLabel = styled.h4`
    margin-top : 4px;
    margin-bottom : 4px;
`

function DayForecast({dailyData}) {
    
    const [nextDays, setNextDays] = useState([]);

    useEffect(() => {
        console.log(dailyData)
        setNextDays(dailyData.time.map((day, index) => {
            if(dailyData.weathercode[index]) {
                const dayString = (new Date(day)).toLocaleString('fr-FR', {  weekday: 'long' })
    
                return {
                    time : index === 0 ? "Aujourd'hui" : dayString.charAt(0).toUpperCase() + dayString.slice(1) ,
                    temperature_min : dailyData.temperature_2m_min[index],
                    temperature_max : dailyData.temperature_2m_max[index],
                    weathercode :  dailyData.weathercode[index]
                };
            } else {
                return null;
            }
        }).filter(n => n));
    }, [dailyData]);

    return (
        <DayContainer>
            <DayLabel><FaRegCalendarAlt /> Prévision sur {nextDays.length} jours</DayLabel>
            <hr style={{width : "98%"}} />
            {nextDays && nextDays.map((day,index) => (
                <Day key={`day-${index}`}>
                    <DayLabel>{day.time}</DayLabel>
                    <img alt={day.weathercode} src={getIconFromWeatherCode(day.weathercode, true)} width="50px" />
                </Day>
            ))}
        </DayContainer>
    )
}

export default DayForecast;