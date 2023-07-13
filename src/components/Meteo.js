import { useEffect, useState } from "react";
import { styled } from "styled-components"
import getIconFromWeatherCode from "../services/icons";

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

function Meteo({data, city}) {

    return (
        <MeteoContainer>
            <CityData>
                <h2>{city.name}</h2>
            </CityData>
            <img alt={data.current_weather.weathercode} src={getIconFromWeatherCode(data.current_weather.weathercode, data.current_weather.is_day)} width="200" />
            <Temperature>{data.current_weather.temperature} C°</Temperature>
        </MeteoContainer>
    )
}

export default Meteo