import { useEffect, useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Toggle from "../inputs/Toggle";
import Searchbar from "../search/Searchbar";
import { PlacesAutocomplete } from "./Bottombar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faLocationDot,
  faEgg,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import Select from "./Select";
const Cont = styled.div`
  background-color: ${(props) => props.colors.tan};
  padding: 4px 8px;

  .filter-bar {
    display: flex;
    background-color: ${(props) => props.colors.lightBeige};
    border-radius: 16px;
    padding: 8px;
    flex-direction: column;
  }
  .filter-bar-top {
    flex-wrap: wrap;
    display: flex;
    @media only screen and (max-width: 600px) {
      flex-direction: column;
    }
  }

  .toggles-holder {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    @media only screen and (max-width: 300px) {
      justify-content: center;
    }
    border-top: 1px solid ${(props) => props.colors.grey};
    padding-top: 8px;
  }
  input {
    border: 1px solid ${(props) => props.colors.grey};

    &:focus {
      border: 1px solid ${(props) => props.colors.darkPink};
      outline: none;
    }
  }
  .dropdown__selected {
    border: none;
  }
  .submit-btn {
    @media only screen and (max-width: 400px) {
      display: flex !important;
      width: 100%;
      justify-content: center;
    }
  }
  .mobile-submit {
    @media only screen and (min-width: 1000px) {
      display: none !important;
    }
  }
  .desktop-submit {
    @media only screen and (max-width: 1000px) {
      display: none !important;
    }
  }
`;
const Topbar = ({
  tagsFetch,
  updateCoords,
  locations,
  setLocationsFilter,
  fetchLocation,
  center,
  radiusValues,
  setRadiusValues,
  value,
  setValue,
  setLocationDistances,
}) => {
  const [address, setAddress] = useState({ lat: center.lat, lng: center.lng });
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState([]);
  const [searchTags, setSearchTags] = useState([]);
  const [text, setText] = useState("");
  const [filterTags, setFilterTags] = useState([]);
  const updateText = (e) => {
    let val = e.currentTarget.value;
    setText((prevText) => {
      return val.toLowerCase();
    });
  };

  useEffect(() => {
    console.log("???");
    console.log(address);
  }, [address]);
  useEffect(() => {
    setTags((prev) => {
      return tagsFetch.sort(function (a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    });
    setFilterTags((prev) => {
      return tagsFetch.sort(function (a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    });
  }, []);

  function findClosestTag() {
    if (tags.length == 0) return;
    setFilterTags((prevTags) => {
      return tags.filter((tag) => {
        return tag.name.includes(text);
      });
    });
  }

  function removeSearchTag(id) {
    const item = searchTags.find((tag) => {
      return tag.id === id;
    });
    setFilterTags((prevTags) => {
      return [...prevTags, item];
    });
    setTags((prevTags) => {
      return [...prevTags, item];
    });
    setSearchTags((prevTags) => {
      const tags = prevTags.filter((tag) => {
        return tag.id !== id;
      });
      return [...tags];
    });
    /*
    setContext((prev) => {
      return {
        ...prev,
        tags: searchTags,
      };
    });*/
  }
  function removeSearchTag(id) {
    const item = searchTags.find((tag) => {
      return tag.id === id;
    });
    setFilterTags((prevTags) => {
      return [...prevTags, item];
    });
    setTags((prevTags) => {
      return [...prevTags, item];
    });
    setSearchTags((prevTags) => {
      const tags = prevTags.filter((tag) => {
        return tag.id !== id;
      });
      return [...tags];
    });
  }
  function pushSearchTag(tag) {
    setSearchTags((prevTags) => {
      return [...prevTags, tag];
    });
    setText("");
  }

  useEffect(() => {
    const delayType = setTimeout(() => {
      findClosestTag();
    }, 500);
    return () => clearTimeout(delayType);
  }, [text]);

  function removeTag(id) {
    const item = tags.find((tag) => {
      return tag.id === id;
    });
    pushSearchTag(item);
    setTags((prevTags) => {
      const tags = prevTags.filter((tag) => {
        return tag.id !== id;
      });
      return [...tags];
    });
    setFilterTags((prevTags) => {
      const tags = prevTags.filter((tag) => {
        return tag.id !== id;
      });
      return [...tags];
    });
  }
  function submitSearch(e) {
    e.preventDefault();
    if (filterTags.length <= 0) {
      return;
    }

    let id = filterTags[0].id;
    removeTag(id);
    setText("");
  }

  const [dynamicRadius, setDynamicRadius] = useState(radiusValues);
  const updateValue = (val) => {
    setValue(val);
  };
  const [filters, setFilters] = useState({
    grassFed: { checked: false, name: "grassFed" },
    organic: { checked: false, name: "organic" },
    soyFree: { checked: false, name: "soyFree" },
    unfrozen: { checked: false, name: "unfrozen" },
    dewormerFree: { checked: false, name: "dewormerFree" },
    pastureRaised: { checked: false, name: "pastureRaised" },
    vaccineFree: { checked: false, name: "vaccineFree" },
  });
  const updateFilters = (field) => {
    setFilters((prev) => {
      return {
        ...prev,
        [field]: { ...prev[field], checked: !prev[field].checked },
      };
    });
  };
  const toggles = Object.entries(filters).map(([key, val], index) => {
    return <Toggle key={index} selected={val} setSelected={updateFilters} />;
  });

  const filterLocationsByTags = () => {
    return locations.filter((location) =>
      searchTags.every((searchTag) =>
        location.tags.some((tag) => tag == searchTag.name)
      )
    );
  };
  const [firstLoad, setFirstLoad] = useState(true);
  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
    } else {
      applyFilter();
    }
  }, [filters, value, tags, address]);

  const filterLocationsByCheckboxes = (locations) => {
    const checkedBoxes = Object.entries(filters)
      .filter(([key, val]) => {
        return val.checked;
      })
      .map((box) => box[0]);

    return locations.filter((location) => {
      return checkedBoxes.every((box) => {
        return location[box] == "true";
      });
    });
  };
  const [radiusText, setRadiusText] = useState("");
  useEffect(() => {
    setLocationDistances((prev) => {
      const [lat1, lon1] = [address.lat, address.lng];
      const returnLocations = locations.map((location) => {
        const [lat2, lon2] = [
          location.address[0]?.lat,
          location.address[0]?.lng,
        ];
        const φ1 = (lat1 * Math.PI) / 180,
          φ2 = (lat2 * Math.PI) / 180,
          Δλ = ((lon2 - lon1) * Math.PI) / 180,
          R = 6371e3;
        const d =
          Math.acos(
            Math.sin(φ1) * Math.sin(φ2) +
              Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ)
          ) * R;
        const curRadius =
          radiusText != "" ? Number(radiusText) : Number(value.match(/[0-9]*/));

        return {
          name: location.name,
          distance: (d / 1000).toFixed(2),
          id: location.id,
        };
      });
      return returnLocations;
    });
  }, [address, locations]);
  const latitudeCalc = (locationsFilter) => {
    const [lat1, lon1] = [address.lat, address.lng];
    const returnLocations = locationsFilter.filter((location) => {
      const [lat2, lon2] = [location.address[0]?.lat, location.address[0]?.lng];
      const φ1 = (lat1 * Math.PI) / 180,
        φ2 = (lat2 * Math.PI) / 180,
        Δλ = ((lon2 - lon1) * Math.PI) / 180,
        R = 6371e3;
      const d =
        Math.acos(
          Math.sin(φ1) * Math.sin(φ2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ)
        ) * R;
      const curRadius =
        radiusText != "" ? Number(radiusText) : Number(value.match(/[0-9]*/));

      if (d / 1000 <= curRadius) return true;
    });
    return returnLocations;
  };

  const applyFilter = () => {
    if (address == "" && address.lat == undefined) {
      toast("Please select an address from the dropdown.", {
        duration: 4000,
        position: "top-center",

        // Styling
        style: { border: "1px solid #E52323", backgroundColor: "#eee2dc" },
        className: "",

        // Custom Icon
        icon: "👇",

        // Change colors of success/error/loading icon
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },

        // Aria
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
      const searchBarElem = document.querySelector("#address-input");
      searchBarElem.focus();
      searchBarElem.classList.add("scale-pop-anim");

      searchBarElem.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        searchBarElem.classList.remove("scale-pop-anim");
      }, 1000);

      return;
    }
    let locationsFilter = filterLocationsByTags();
    locationsFilter = filterLocationsByCheckboxes(locationsFilter);
    locationsFilter = latitudeCalc(locationsFilter);
    setLocationsFilter(locationsFilter);
  };
  return (
    <Cont colors={COLORS}>
      <div className="filter-bar-holder">
        <div className="filter-bar">
          <div className="flex space-around filter-bar-top">
            <div className="mar-bottom-16">
              <p>Tags</p>
              <Searchbar
                text={text}
                updateText={updateText}
                removeSearchTag={removeSearchTag}
                pushTag={pushSearchTag}
                pushSearchTag={pushSearchTag}
                tags={searchTags}
                submitSearch={submitSearch}
                removeTag={removeTag}
                filterTags={filterTags}
                colors={COLORS}
              />
            </div>
            <div className="mar-bottom-16">
              <p>City, address or location</p>
              <PlacesAutocomplete
                setAddress={setAddress}
                location={location}
                setLocation={setLocation}
                updateCoords={updateCoords}
              />
            </div>
            <div className="mar-bottom-16 ">
              <Select
                title="Enter radius"
                regions={radiusValues}
                options={dynamicRadius}
                setOptions={setDynamicRadius}
                name="radius"
                value={value}
                updateValue={updateValue}
              />
            </div>
          </div>
          <div className="toggles-holder small-scrollbar mar-bottom-16 ">
            {toggles}
          </div>

          {/*
          <div
            onClick={applyFilter}
            className="blue-btn-one flex-inline align-center submit-btn mobile-submit"
          >
            <h5 className="mar-right-8">Search</h5>
            <FontAwesomeIcon icon={faSearch} className="icon-ssm white" />
          </div>
  */}
        </div>

        {/*
        <div
          onClick={applyFilter}
          className="blue-btn-one flex-inline align-center submit-btn desktop-submit"
        >
          <h5 className="mar-right-8">Search</h5>
          <FontAwesomeIcon icon={faSearch} className="icon-ssm white" />
        </div>
  */}
      </div>
    </Cont>
  );
};

export default Topbar;
