import React, {useState} from "react";
import axios from "axios";

function App() {
  //const apikey = "60d101570f17f2e05fa2441a325c9e3";
  const [data, setData] = useState({})
  const [location, setLocation] = useState("")
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=4ebd1b38cab10ac532251429e0d96a14`
  
  const searchLocation = (event) => {
    if(event.keyCode === 13) {
      axios.get(url).then((response) =>{
        setData(response.data)
        console.log(response.data)
      })
      setLocation('') //after search is set to empty
    }
  }
  return (
    <div className="app">
      <div className="search">
        <input 
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyDown={searchLocation}
        placeholder='Enter Location'
        type="text"/>

      </div>
      <div className ="container">
        <div className="top">
          <div className="location"><p>{data.name}</p></div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1>: null} {/* cant do just data.main.temp*/}
            </div> 
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p>: null}
          </div>
        </div>

        <div className="bottom">
          <div className="high">
            <p>high</p>
            {data.main ? <p>{data.main.temp_max.toFixed()}°F</p>: null}
            </div>
          <div className="low">
            <p>low</p>
            {data.main ? <p>{data.main.temp_min.toFixed()}°F</p>: null}
            </div>
          <div className="humidity">
            <p>humidity</p>
            {data.main ? <p>{data.main.humidity}%</p>: null}
            </div>
        </div>
      </div>

    </div>
  );
}

export default App;
