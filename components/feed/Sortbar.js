import { useState, useEffect } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../inputs/Dropdown";
import Select from "../google/Select";
const Cont = styled.div`
  background-color: ${(props) => props.colors.tan};
  padding: 16px;
  border-top: 1px solid ${(props) => props.colors.darkPink};
  border-bottom: 1px solid ${(props) => props.colors.darkPink};
  .dropdown__selected {
    height: auto;
    min-height: 40px;
  }
  .location-selector {
    background: #fff;
    padding: 16px 8px;
    border-left: 1px solid ${(props) => props.colors.black};
    border-bottom: 1px solid ${(props) => props.colors.black};
    width: 172px;
    border-right: 1px solid ${(props) => props.colors.black};

    .dropdown__selected {
      border-radius: 2px;
      width: 100%;
      background-color: ${(props) => props.colors.lightBeige};
      border: none;
    }

    .dropdown__menu {
      width: 100%;
      border: none;
    }
  }
`;

const LocationSelector = ({
  countries,
  country,
  updateRegion,
  options,
  setOptions,
  states,
  state,
  setStates,
  statesStale,
  city,
  cities,
  citiesStale,
  setCities,
}) => {
  return (
    <div className="location-selector">
      <h5 className="light contrast mar-bottom-8">COUNTRY</h5>
      <Select
        regions={countries}
        value={country}
        updateValue={updateRegion}
        searchPlaceholder="Search"
        options={options}
        setOptions={setOptions}
        name="country"
      />
      <div className="mar-bottom-16"></div>
      <h5 className="light contrast mar-bottom-8">STATE</h5>
      <Select
        regions={statesStale}
        value={state}
        updateValue={updateRegion}
        options={states}
        setOptions={setStates}
        name="state"
      />
      <div className="mar-bottom-16"></div>
      <h5 className="light contrast mar-bottom-8">CITY</h5>
      <Select
        regions={citiesStale}
        value={city}
        updateValue={updateRegion}
        searchPlaceholder="Search"
        options={cities}
        setOptions={setCities}
        name="city"
      />
    </div>
  );
};
const Sortbar = ({ locationsFetch }) => {
  const [farmLocations, setFarmLocations] = useState(locationsFetch);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [statesStale, setStatesStale] = useState("");
  const [city, setCity] = useState("");
  const [citiesStale, setCitiesStale] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [data, setData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [options, setOptions] = useState([]);
  const [regions, setRegions] = useState([]);

  const [value, setValue] = useState("All");

  useEffect(() => {
    if (country !== "") {
      setValue(`${`${country}`}${state !== "" ? `, ${state}` : ""} ${city}`);
    }
  }, [country, state, city]);

  const changeHandler = (value, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: {
        value,
        error: value !== "" ? "" : prev[name].error,
      },
    }));
    if (name === "country") {
      updateCountry(value);
    } else if (name === "state") {
      updateState(value);
    } else if (name === "city") {
      updateCity(value);
    }
  };

  useEffect(() => {
    axios
      .get(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      )
      .then((res) => {
        setData((prevData) => {
          return res.data;
        });
        setRegions((prevData) => {
          return [...new Set(res.data.map((item) => item.country))].sort();
        });
        setOptions((prevData) => {
          return [...new Set(res.data.map((item) => item.country))].sort();
        });
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setLocations((prevLocations) => {
      return farmLocations.filter((location) => {
        return location.address[0]?.country_id.name === country;
      });
    });
  }, [country]);

  useEffect(() => {
    setLocations((prevLocations) => {
      return farmLocations.filter((location) => {
        return location.address[0]?.state_id.name === state;
      });
    });
  }, [state]);

  function updateCountry(value) {
    setCountry((prevCountry) => {
      return value;
    });
    let states = data.filter((item) => {
      return item.country === value;
    });
    states = [...new Set(states.map((item) => item.subcountry))];
    states.sort();
    setStates((prevStates) => {
      return states;
    });
    setStatesStale((prevStates) => {
      return states;
    });
    setState("");
    setCity("");
  }

  function updateState(value) {
    setState((prevState) => {
      return value;
    });
    let cities = data.filter((city) => city.subcountry === value);
    cities = cities.map((city) => city.name);
    cities.sort();
    setCities(cities);
    setCitiesStale(cities);
  }

  function updateCity(value) {
    setCity((prevCity) => {
      return value;
    });
  }

  function updateRegion(location, name) {
    if (name === "country") {
      updateCountry(location);
    } else if (name === "state") {
      updateState(location);
    } else if (name == "city") {
      updateCity(location);
    }
  }
  const updateValue = () => {};
  return (
    <Cont colors={COLORS} className="flex align-center">
      <FontAwesomeIcon icon={faSort} className="red icon-med mar-right-32" />
      <h5 className="mar-right-32">Date</h5>
      <div className="mar-right-16">
        <p className="bold">From</p>
        <input type="date" />
      </div>
      <div className="mar-right-32">
        <p className="bold">To</p>
        <input type="date" />
      </div>

      <h5 className="mar-right-16">Location</h5>
      <Dropdown
        title="Location"
        value={value}
        updateValue={updateValue}
        defaultOptionLabel={"All"}
        name={"All"}
        DropdownComponent={
          <LocationSelector
            countries={regions}
            country={country}
            updateRegion={updateRegion}
            options={options}
            setOptions={setOptions}
            states={states}
            statesStale={statesStale}
            state={state}
            setStates={setStates}
            cities={cities}
            citiesStale={citiesStale}
            city={city}
            setCities={setCities}
          />
        }
      />
    </Cont>
  );
};

export default Sortbar;
