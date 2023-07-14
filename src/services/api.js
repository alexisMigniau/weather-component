const searchCity = async (city, count = 10, lang = 'fr') => {
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=${count}&language=${lang}`);

    if(res.ok) {
        return await res.json();
    } else {
        return false;
    }
}

const getMeteo = async (lat, long) => {
    const res = await fetch(`https://api.open-meteo.com/v1/meteofrance?latitude=${lat}&longitude=${long}&current_weather=true&hourly=temperature_2m,weathercode,is_day&timezone=auto&forecast_days=7`);

    if(res.ok) {
        return await res.json();
    } else {
        return false;
    }
}

export { searchCity, getMeteo };