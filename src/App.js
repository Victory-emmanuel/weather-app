import { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  // Two state variables are defined: data to store the weather data received from the API,
  // and location to store the user's input for the location.
  const [location, setLocation] = useState("");

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=c0b83dba471524ce5398fddaab5a330b`;
  //  The URL constant is defined, which contains the API endpoint for fetching weather data.
  //  It includes the user's input for the location and the API key.

  // The searchLocation function is defined to handle the search functionality.
  const searchLocation = (e) => {
    // It is triggered when the user presses the Enter key in the input field.
    if (e.key === "Enter") {
      // It makes an HTTP GET request to the API using the axios library, passing the URL as the endpoint.
      axios.get(URL).then((res) => {
        // Once the response is received,
        //  the weather data is stored in the data state variable using the setdata function.
        setData(res.data);
        console.log(res.data);
      });
      // Finally, the location state variable is reset to an empty string.
      setLocation("");
    }
  };

  return (
    <div id="app">
      <div className="search">
        <input
          // The onKeyPress event listener is attached to the input field,
          //  which triggers the searchLocation function when the Enter key is pressed.
          onKeyPress={searchLocation}
          // The onChange event listener is attached to the input field to update the location state
          //  variable as the user types in the input field.
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location...."
          type="text"
          // The value of the input field is set to the location state variable.
          // By setting value={location} on the input field,
          //  the value of the input field is set to the current value of
          //   the location state variable.
          //Whenever the user types in the input field, the onChange event handler
          // is triggered, which updates the location state variable with the new value:
          value={location}
        />
      </div>

      <div className="container">
        {/* <img src={bgImage} alt="background img" /> */}
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}℉</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
            {/* The code {data.main ? <h1>{data.main.temp.toFixed()}℉</h1> : null}
                is a conditional rendering statement in JSX.
                It checks if the data.main property exists and is truthy.
                If it does, it renders an <h1> element with the temperature value 
                from data.main.temp displayed as text.The toFixed() method is used 
                to round the temperature value to a fixed number of decimal places.
                The ℉ symbol represents the Fahrenheit unit.
                If the data.main property is falsy or does not exist, it renders null,
                 which effectively renders nothing. */}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}℉</p>
              ) : null}
              <p>Feels like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
