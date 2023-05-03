import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import COLORS from "../data/colors";
import Location from "../components/farmmap/Location";
import Products from "../components/farmmap/Products";
import { fetchLocations, fetchTags } from "../utils/supabaseFunctions";
import Results from "../components/farmmap/Results";
import Farm from "../components/farmmap/Farm";
const Cont = styled.div`
  margin-top: 48px;
  padding: 16px;
  @media only screen and (max-width: 500px) {
    padding: 4px;
  }
  .content-container {
    max-width: 1360px;
    margin: 0 auto;
    justify-content: space-between;
  }
  .interface {
    @media only screen and (max-width: 1340px) {
      justify-content: center;
    }
  }
`;

export async function getServerSideProps() {
  const tagsFetch = await fetchTags();
  const locationsFetch = await fetchLocations();
  return {
    props: {
      tagsFetch,
      locationsFetch,
    },
  };
}
const Farmmap = ({ tagsFetch, locationsFetch }) => {
  const [searchTags, setSearchTags] = useState([]);
  const [farmLocations, setFarmLocations] = useState(locationsFetch);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [statesStale, setStatesStale] = useState("");
  const [city, setCity] = useState("");
  const [citiesStale, setCitiesStale] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [data, setData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [options, setOptions] = useState([]);
  const [regions, setRegions] = useState([]);
  const [foodLocations, setFoodLocaitons] = useState(locationsFetch);

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
        console.log(location.address[0].country_id.name === country);
        return location.address[0].country_id.name === country;
      });
    });
  }, [country]);

  useEffect(() => {
    setLocations((prevLocations) => {
      return farmLocations.filter((location) => {
        return location.address[0].state_id.name === state;
      });
    });
  }, [state]);

  useEffect(() => {
    const func = async () => {
      const dataFetch = await fetch("https://api.db-ip.com/v2/free/self").then(
        (res) => res.json()
      );
      console.log("location");
      console.log(dataFetch);
      updateCountry(dataFetch.countryName);
      setCountry(dataFetch.countryName);
    };

    func();
  }, []);
  /*
  useEffect(() => {
    setLocations((prevLocations) => {
      return farmLocations.filter((location) => {
        return location.city_id?.name === city;
      });
    });
  }, [city]);*/

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

  return (
    <Cont colors={COLORS}>
      <div className="center-inline mar-bottom-48">
        <div className="header-3">
          <h4>FIND FARMS NEAR YOU</h4>
        </div>
      </div>
      <div className="content-container">
        <div className="flex flex-wrap space-between interface">
          <Location
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

          <Products
            tagsFetch={tagsFetch}
            searchTags={searchTags}
            setSearchTags={setSearchTags}
          />
        </div>
        <div className="mar-bottom-32"></div>

        <Results locations={locations} />
      </div>
    </Cont>
  );
};

export default Farmmap;
