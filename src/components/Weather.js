import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { getMeteo } from "../services/api";
import Meteo from "./Meteo";
import SearchCity from "./SearchCity";

const Container = styled.div`
    display : flex;
    flex-direction : row;
    align-items : center;
    justify-content : center;
    width : 100%;
    height : 100%;
    padding-top : 100px;
`

function Weather() {

    const [citySelected, setCitySelected] = useState(null);
    const [meteoData, setMeteoData] = useState(null);

    useEffect(() => {
        if(citySelected !== null) {
            console.log(citySelected)
           fetchMeteo()
        }
    }, [citySelected])

    const fetchMeteo = async () => {
        const res = await getMeteo(citySelected.latitude, citySelected.longitude);
        setMeteoData(res)
    }

    return (
        <Container>
            {citySelected === null && <SearchCity onCitySelected={setCitySelected}/>}
            {meteoData !== null && <Meteo data={meteoData}/> }
        </Container>
    )   
}

export default Weather;