import { useEffect, useState } from 'react'
import './index.css'
import cold from './assets/cold.jpg'
import hot from './assets/hot.jpg'
import Descriptions from './components/Descriptions'
import { getWeather } from './weatherService'

const App = () => {
  const [city, setCity] = useState('Lisbon')
  const [weather, setWeather] = useState(null)
  const [units, setUnits] = useState('metric')
  const [bg, setBg] = useState(hot)

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getWeather(city, units)
      setWeather(data)

      const threshold = units === 'metric' ? 20 : 60
      if (data.temp <= threshold) setBg(cold)
      else setBg(hot)
    }
    fetchWeather()
  }, [units, city])

  const handleUnits = (e) => {
    const button = e.currentTarget
    const currentUnit = button.innerText.slice(1)

    const isCelsius = currentUnit === 'C'
    button.innerText = isCelsius ? '°F' : '°C'
    setUnits(isCelsius ? 'metric' : 'imperial')
  }

  const handleEnterKey = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value)
      e.currentTarget.blur()
    }
  }

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={handleEnterKey}
                type="text"
                name="city"
                placeholder="Enter City..."
              ></input>
              <button onClick={handleEnterKey}>Go</button>
            </div>
            <div className="section section__temperature">
              <div className="icon">
                <h3>
                  {weather.name}, {weather.country}
                </h3>
                <img src={weather.iconURL} alt="weather" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>
                  {`${weather.temp.toFixed()} °${
                    units === 'metric' ? 'C' : 'F'
                  }`}
                </h1>
              </div>
              {/* style to be larger */}
              <button onClick={(e) => handleUnits(e)}>°F</button>
            </div>
            {/* bottom description */}
            <Descriptions weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
