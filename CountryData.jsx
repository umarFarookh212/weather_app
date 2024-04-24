import apiData from "./apiData.json";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const countries = apiData.map((country) => ({
  name: country.name.common,
  coords: country.latlng,
}));
const countriesByName = countries.reduce((result, country) => {
  const [lat, lon] = country.coords;
  result[country.name] = { lat, lon };
  return result;
});
export function CountryData(props) {
  const { value, coordValue } = props;

  return (
    <>
      <Select
        value={value}
        labelId="demo-select-small-label"
        id="demo-select-small"
        label="Country"
        onChange={function (ev) {
          coordValue({
            country: ev.target.value,
            coordinates: countriesByName[ev.target.value],
          });
        }}
      >
        {countries.map((country) => (
          <MenuItem value={country.name} key={country.name}>
            {country.name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
