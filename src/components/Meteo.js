import { useEffect, useState } from "react";
import { styled } from "styled-components"

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

function Meteo({data}) {

    const [meteoData, setMeteoData] = useState(data)
    const [fileName, setFileName] = useState("");

    useEffect(() => {

         // Traduction des weather codes
        // Si il y a une différence entre le jour et la nuit
        const {weather_code, is_day} = meteoData.current_weather;
        
        let file_name = "";

        if(weather_code === 0) {
            file_name = 'clear';
        }

        if(weather_code === 1) {
            file_name = 'mostly-clear'
        }

        // Si différence entre day et night ajout
        if([0].includes(weather_code)) 
        {
            file_name += is_day ? "-day" : "-night";
        }

        console.log(file_name)

        setFileName(fileName);

    }, [meteoData]);

    return (
        <MeteoContainer>
            {fileName && <img alt={meteoData.current_weather.weather_code} src={`https://raw.githubusercontent.com/roe-dl/weathericons/master/weathericons/${fileName}.svg`} width="80" />}
            <Temperature>{meteoData.current_weather.temperature} C°</Temperature>
        </MeteoContainer>
    )
}

export default Meteo