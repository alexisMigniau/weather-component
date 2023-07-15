const searchCity = async (city, count = 10, lang = 'fr') => {
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=${count}&language=${lang}`);

    if(res.ok) {
        return await res.json();
    } else {
        return false;
    }
}

const getMeteo = async (lat, long) => {
    const res = await fetch(`https://api.open-meteo.com/v1/meteofrance?latitude=${lat}&longitude=${long}&current_weather=true&hourly=temperature_2m,weathercode,is_day&timezone=auto&forecast_days=11&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset`);

    if(res.ok) {
        return await res.json();
    } else {
        return false;
    }
}

export { searchCity, getMeteo };