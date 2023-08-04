const API_KEY = 'fa20487f7b5541c24167fbb1dfeac3db'
// q=city name &appid=api key then any other params

const iconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}02@2x.png`

const getWeather = async (city, units = 'metric') => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`

  const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data)
  const {
    weather,
    main: { temp, feels_like, humidity, temp_min, temp_max, pressure },
    wind: { speed },
    sys: { country },
    name
  } = data

  const { description, icon } = weather[0]

  return {
    description,
    iconURL: iconURL(icon),
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    speed,
    country,
    name
  }
}

export { getWeather }
