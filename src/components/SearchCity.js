import { useEffect, useState } from "react"
import { styled } from "styled-components";
import { searchCity } from "../services/api";

const InputContainer = styled.div`
    display: flex;
    flex-direction : column;
    row-gap : 20px;
`

const SelectCustom = styled.div`
    width: 300px;
    margin-top: 30px;
    background-color : #2C2C2C;
    padding : 5px;
    border-radius : 10px;
`

const CityContainer = styled.div`
    height: 50px;
    font-size : 20px;
    display : flex;
    flex-direction : row;
    align-items : center;
    width: 100%;
    justify-content : space-evenly;
    margin-top : 4px;
    margin-bottom : 4px;
    border-radius : 10px; 
    transition : all 0.3s;
    &:hover {
        background-color : #3D3D3D;
    }
`

function SearchCity({onCitySelected}) {

    const [search, setSearch] = useState("");

    const [cities, setCities] = useState([]);

    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleSelectCity = (index) => {
        onCitySelected(cities[index]);
    }

    // Attente de l'utilisateur
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            const res = await searchCity(search);

            if(res.results) {
                setCities(res.results)
            } else {
                setCities([])
            }
          }, 500)
      
          return () => clearTimeout(delayDebounceFn)
    }, [search])

    return (
        <div>
            <InputContainer>
                <label htmlFor="search-city">Rechercher une ville</label>
                <input name="search-city" type="text" placeholder="Paris" value={search} onChange={handleChangeSearch}/>
            </InputContainer>
            {cities && cities.length > 0 &&
                <SelectCustom name="select-city">
                    {cities.map((city, index) => (
                        <CityContainer key={`city-${index}`} onClick={() => handleSelectCity(index)}>
                            <h4 style={{width: '60%'}}>{city.name}</h4>
                            <img alt={city.country} src={`https://hatscripts.github.io/circle-flags/flags/${city.country_code.toLowerCase()}.svg`} width="30" />
                        </CityContainer>
                    ))}
                </SelectCustom>
            }  
        </div>
    )
}

export default SearchCity;