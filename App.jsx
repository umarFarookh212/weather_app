import "./App.css";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { TableBody, TableHead } from "@mui/material";
import { useEffect, useState } from "react";
import { CountryData } from "./CountryData";

const getWeather = ({ lat, lon }) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=`
  ).then((api) => api.json());
};

function App() {
  const [country, setCountry] = useState("India");
  const [coordinates, setCoordinates] = useState(null);
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    if (!coordinates) {
      return;
    }
    getWeather(coordinates).then((weatherApi) => {
      console.log(weatherApi);
      setWeatherData(weatherApi);
    });
  }, [setWeatherData, coordinates]);
  const { timezone = 0 } = weatherData || {};
  const offsetTotalMins = timezone / 60;
  const offsetHrs = parseInt(offsetTotalMins / 60);
  const offsetMins = offsetTotalMins - offsetHrs * 60;
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 0.5, sm: 1, md: 1 }}
        >
          <Grid item xs={8}>
            <Card sx={{ maxWidth: 900, m: 3, minWidth: "90%" }}>
              <div className="container">
                <h2 className="heading">
                  {<Avatar alt="logo" src="src/logo.jpeg" />}
                  {weatherData.name} as of{" "}
                  {new Date(weatherData.dt * 1000).toLocaleDateString()} Time:{" "}
                  {offsetHrs}:{offsetMins}
                </h2>
                <CardMedia
                  component="img"
                  sx={{
                    maxHeight: "400px",
                    minWidth: "100%",
                  }}
                  image="src/display.jpeg"
                  alt="weather"
                  className="media"
                />
                <div className="text-block">
                  <h1>{weatherData.main?.temp || ""}°</h1>
                  <h3>{weatherData.weather?.description || ""}</h3>
                  <h3>Feels like {weatherData.main?.feels_like || ""}°</h3>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ maxWidth: "90%", m: 3, minHeight: "90%" }}>
              <FormControl sx={{ m: 1, minWidth: "95%" }} size="large">
                <InputLabel id="demo-select-small-label">Country</InputLabel>
                <CountryData
                  value={country}
                  coordValue={(geoValues) => {
                    const { country, coordinates } = geoValues;
                    setCountry(country);
                    setCoordinates(coordinates);
                  }}
                />
              </FormControl>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Card sx={{ maxWidth: 880, m: 2 }}>
              <Table>
                <TableHead className="TableHead">
                  <h2>
                    Weather Details in <u>{weatherData.name}</u>
                  </h2>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="td" scope="row">
                      <p>High/Low</p>
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="left">
                      <p>
                        {weatherData.main?.temp_max || ""}/
                        {weatherData.main?.feels_like || ""}
                      </p>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="td" scope="row">
                      <p>Humidity</p>
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="left">
                      <p>{weatherData.main?.humidity || ""}%</p>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="td" scope="row">
                      <p>Pressure</p>
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="left">
                      <p>{weatherData.main?.pressure || ""}Pa</p>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="td" scope="row">
                      <p>Visibility</p>
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="left">
                      <p>
                        {weatherData?.visibility || weatherData.visibility}km/h
                      </p>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="td" scope="row">
                      <p>Wind</p>
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="left">
                      <p>{weatherData.wind?.speed || ""}km/hr</p>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ maxWidth: 900, m: 2 }}></Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default App;
