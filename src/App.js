import React from 'react'
import './index.css'
import cold from './assets/cold.jpg'
import hot from './assets/hot.jpg'

const App = () => {
  return (
    <div className="app" style={{ backgroundImage: `url(${cold})` }}>
      <div className="overlay">
        <div className="container">
          <div className="section section__inputs">
            <input type="text" name="city" placeholder="Enter City..."></input>
            <button>°F</button>
          </div>
          <div className="section section__temperature">
            <div className="icon">
              <h3>London, GB</h3>
              <img src="" alt="weather" />
              <h3>Cloudy</h3>
            </div>
            <div className="temperature">
              <h1>35 °C</h1>
            </div>
          </div>
          {/* bottom description */}
        </div>
      </div>
    </div>
  )
}

export default App
