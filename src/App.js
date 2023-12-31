import { useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";

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
    <Box id="app">
      <Box className="search">
        <Search // The onKeyPress event listener is attached to the input field,
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
          sx={{}}
        />
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "90%",
          padding: { xs: "1rem", sm: "1rem", md: "3rem", lg: "6rem" },
        }}
        className="container"
      >
        {/* <img src={bgImage} alt="background img" /> */}
        <Box sx={{}} className="top">
          <Box className="location">
            <Typography variant="p" component="p">
              {data.name}
            </Typography>
          </Box>
          <Box className="temp">
            {data.main ? (
              <Typography
                sx={{ fontSize: { xs: "4rem", sm: "6rem" }, fontWeight: "600" }}
              >
                {data.main.temp.toFixed()}℉
              </Typography>
            ) : null}
          </Box>
          <Box className="description">
            {data.weather ? (
              <Typography variant="p" component="p">
                {data.weather[0].main}
              </Typography>
            ) : null}
            {/* The code {data.main ? <h1>{data.main.temp.toFixed()}℉</h1> : null}
                is a conditional rendering statement in JSX.
                It checks if the data.main property exists and is truthy.
                If it does, it renders an <h1> element with the temperature value 
                from data.main.temp displayed as text.The toFixed() method is used 
                to round the temperature value to a fixed number of decimal places.
                The ℉ symbol represents the Fahrenheit unit.
                If the data.main property is falsy or does not exist, it renders null,
                 which effectively renders nothing. */}
          </Box>
        </Box>

        {data.name !== undefined && (
          <Box
            sx={{
              display: "grid",
              justifyContent: "center",
              textAlign: "center",
              padding: "1rem",
              width: "80%",
              borderRadius: "12px",
              margin: " auto 2.5%",
              backgroundColor: " rgba(255, 255, 255, 0.2)",
              position: "absolute",
              bottom: " 10%",
              justifySelf: "center",
              alignItems: "center",
              gridTemplateColumns: { xs: "1fr ", sm: "repeat(3,1fr)" },
              gridGap: "1rem",
            }}
            className="bottom"
          >
            <Box className="feels">
              {data.main ? (
                <Typography variant="p" component="p" className="bold">
                  {data.main.feels_like.toFixed()}℉
                </Typography>
              ) : null}
              <Typography variant="p" component="p">
                Feels like
              </Typography>
            </Box>
            <Box className="humidity">
              {data.main ? (
                <Typography variant="p" component="p" className="bold">
                  {data.main.humidity}%
                </Typography>
              ) : null}
              <Typography variant="p" component="p">
                Humidity
              </Typography>
            </Box>
            <Box className="wind">
              {data.wind ? (
                <Typography variant="p" component="p">
                  {data.wind.speed.toFixed()} MPH
                </Typography>
              ) : null}
              <Typography variant="p" component="p">
                Wind speed
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
const Search = styled("input")({
  padding: "0.7rem 1.5rem",
  fontSize: " 1.1rem",
  borderRadius: "25px",
  border: " 1px solid rgba(255, 255, 255, 0.8)",
  background: " rgba(255, 255, 255, 0.2)",
  color: " #fff",
});

export default App;
