import { useEffect, useState } from 'react'
import './index.css'
import cold from './assets/cold.jpg'
// import hot from './assets/hot.jpg'
import Descriptions from './components/Descriptions'
import { getWeather } from './weatherService'

const App = () => {
  const [weather, setWeather] = useState(null)
  const [units, setUnits] = useState('imperial')

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getWeather('Boston', units)
      setWeather(data)
      console.log(data)
    }
    fetchWeather()
  }, [units])

  const handleUnits = (e) => {
    const button = e.currentTarget
    const currentUnit = button.innerText.slice(1)
    console.log(currentUnit)

    const isCelsius = currentUnit === 'C'
    button.innerText = isCelsius ? '°F' : '°C'
    setUnits(isCelsius ? 'metric' : 'imperial')
  }

  return (
    <div className="app" style={{ backgroundImage: `url(${cold})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                type="text"
                name="city"
                placeholder="Enter City..."
              ></input>
              <button onClick={(e) => handleUnits(e)}>°F</button>
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
