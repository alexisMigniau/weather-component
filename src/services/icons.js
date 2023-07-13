const icons = [
    {
        file_name : 'clear',
        hasNight : true,
        codes : [0]
    },
    {
        file_name : 'partly-cloudy',
        hasNight : true,
        codes : [1,2,3]
    },
    {
        file_name : 'fog',
        hasNight : false,
        codes : [45, 48]
    },
    {
        file_name : 'drizzle',
        hasNight : false,
        codes : [51, 53, 55, 56, 57]
    },
    {
        file_name : 'rain',
        hasNight : false,
        codes : [61, 63, 65, 80, 81, 82]
    },
    {
        file_name : 'freezingrain',
        hasNight : false,
        codes : [66, 67]
    },
    {
        file_name : 'snow',
        hasNight : false,
        codes : [71, 73, 75, 77, 85, 86]
    },
    {
        file_name : 'thunderstorm',
        hasNight : false,
        codes : [95]
    },
    {
        file_name : 'thunderstorm-hail',
        hasNight : false,
        codes : [96, 99]
    }
]

function getIconFromWeatherCode(code, is_day) {
    let icon = icons.find((icon) => icon.codes.includes(code))

    let file_name = icon.file_name;

    if(icon.hasNight) {
        file_name += is_day ? "-day" : "-night";
    }

    return `https://raw.githubusercontent.com/basmilius/weather-icons/dev/design/fill/final/${file_name}.svg`;
}

export default getIconFromWeatherCode