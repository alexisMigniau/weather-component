import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { getMeteo } from "../services/api";
import Meteo from "./Meteo";
import SearchCity from "./SearchCity";

const Container = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : center;
    width : 100%;
    height : 100%;
    padding-top : 40px;
`

const HeaderContainer = styled.div`
    display: flex;
    flex-direction : row;
`

const ChangeCityButton = styled.button`
    border-radius: 0px 40px 40px 0px;
    border : none;
    height : 50px;
    background-color: #2C2C2C;
    color : white;
    font-size : 20px;
    position : absolute;
    top : 20px;
    left : 0px;
    letter-spacing : 1px;
    padding-right : 20px;
    padding-left : 20px;
    transition : all 1s;
    opacity : 60%;
    &:hover {
        background-color: #3D3D3D;
        cursor : pointer;
    }
`

function Weather() {

    const [citySelected, setCitySelected] = useState(null);
    const [meteoData, setMeteoData] = useState(null);

    useEffect(() => {
        if(citySelected !== null) {
           fetchMeteo()
        }
    }, [citySelected])

    const fetchMeteo = async () => {
        const res = await getMeteo(citySelected.latitude, citySelected.longitude);
        setMeteoData(res)
    }

    const handleResetCity = () => {
        setMeteoData(null)
        setCitySelected(null)
    }

    return (
        <Container>
            { citySelected === null && <SearchCity onCitySelected={setCitySelected}/>}
            { meteoData !== null && 
                <div>
                    <HeaderContainer>
                        <ChangeCityButton onClick={handleResetCity}>Changer de ville</ChangeCityButton>
                    </HeaderContainer>
                    <Meteo data={meteoData} city={citySelected}/>
                </div>
            }
        </Container>
    )   
}

export default Weather;