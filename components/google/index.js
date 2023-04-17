import styled from "styled-components";
import dynamic from "next/dynamic";
import { GoogleMap, useJsApiLoader, Circle } from "@react-google-maps/api";
import Bottombar from "./Bottombar";
import MarkerComponent from "./MarkerComponent";
import Alert from "../popups/alert";
import Suppliers from "./Suppliers";
import { useState, useCallback, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Toaster } from "react-hot-toast";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
const OpenStreetMap = dynamic(() => import("./OpenStreetMap"), {
  ssr: false,
});
import latCountryCodes from "../../data/latCountryCodes.json";
const Cont = styled.div`
  min-height: 100vh;
  .google-holder {
    display: flex;
    @media only screen and (max-width: 800px) {
      flex-direction: column-reverse;
    }
  }
`;

const containerStyle = {
  width: "100%",
  height: "75vh",
};

const options = {
  imagePath:
    "'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
};

function createKey(location) {
  return location.lat + location.lng;
}

const Index = ({ locations, tagsFetch, addTag, fetchNewLocation, user }) => {
  const [location, setLocation] = useState("");
  const [locationsFilter, setLocationsFilter] = useState(locations);

  useEffect(() => {
    setLocationsFilter(locations);
  }, [locations]);
  const circleRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState({
    lat: 45.4215,
    lng: -75.695,
  });

  const [radiusValues, setRadiusValues] = useState([
    "5km",
    "10km",
    "25km",
    "50km",
    "100km",
    "200km",
    "500km",
    "1000km",
    "10000km",
  ]);
  const [radiusValue, setRadiusValue] = useState("10000km");
  useEffect(() => {
    setOptions((prev) => {
      return {
        ...prev,
        radius: Number(radiusValue.match(/[0-9]*/)) * 1000,
      };
    });
  }, [radiusValue]);
  useEffect(() => {
    setMarkers((prev) => {
      return locationsFilter.map((location, index) => {
        return (
          <MarkerComponent
            key={index}
            latLong={{
              lat: Number(location.address[0].lat),
              lng: Number(location.address[0].lng),
            }}
            name={location.name}
            description={location.description}
            email={location.email}
            number={location.number}
            website={location.website}
            pickup={location.pickup}
            address={location.address[0].text_address}
            hoursFrom={location.hoursFrom}
            hoursTo={location.hoursTo}
            tags={location.tags}
            products={location.products}
            icon={location.icon}
          />
        );
      });
    });
  }, [locations, locationsFilter]);
  const [coords, setCoords] = useState(null);

  const [libraries] = useState(["places"]);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries,
  });
  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const updateLocation = (value) => {
    setLocation(value);
  };

  const addMarker = async (e) => {
    //stopAdding();
    focusSearchBar();
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${e.latLng.lat()},${e.latLng.lng()}&key=${
        process.env.NEXT_PUBLIC_GOOGLE_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setLocation(data.results[0].formatted_address);
      });
    /*
    setLocations((prev) => {
      return [
        ...prev,
        {
          coords: { lat: e.latLng.lat(), lng: e.latLng.lng() },
          title: "beef",
          textContent: "words",
        },
      ];
    });
    */
  };

  const [adding, setAdding] = useState(false);

  const startAdding = () => {
    setAdding(true);
  };

  const stopAdding = () => {
    setAdding(false);
  };

  const focusSearchBar = () => {
    const searchBarElem = document.getElementById("address-input");
    searchBarElem.focus();
    searchBarElem.classList.add("scale-pop-anim");
    searchBarElem.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => {
      searchBarElem.classList.remove("scale-pop-anim");
    }, 1000);
  };

  const updateCoords = (position) => {
    console.log("position");
    console.log(position);
    window.localStorage.setItem(
      "position",
      JSON.stringify({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    );
    setCenter((prev) => {
      return {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  };
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(updateCoords);
    if (window !== undefined) {
      let location = JSON.parse(window.localStorage.getItem("position"));

      if (location == null || location.lat == null || location.lng == null) {
      } else {
        setCenter((prev) => {
          return {
            lat: location.lat,
            lng: location.lng,
          };
        });
      }
    }
  }, []);
  //DO THIS NEXT
  useEffect(() => {
    const checkForUserLocation = async () => {
      if (window !== undefined) {
        const location = JSON.parse(window.localStorage.getItem("position"));
        if (location == null) {
          // reverse this above
          const dataFetch = await fetch(
            "https://api.db-ip.com/v2/free/self"
          ).then((res) => res.json());

          const country = latCountryCodes.ref_country_codes.find(
            (code) => code.country == "hel"
          );

          if (country != undefined) {
            updateCoords({
              coords: {
                latitude: country.latitude,
                longitude: country.longitude,
              },
            });
          }
        }
      }
    };

    checkForUserLocation();
  }, []);
  const fetchLocation = async () => {
    if (coords !== null) {
      updateCoords(coords);
    } else {
      const dataFetch = await fetch("https://api.db-ip.com/v2/free/self").then(
        (res) => res.json()
      );

      setValue(dataFetch.city);
    }
  };
  useEffect(() => {
    const fetchLoc = async () => {
      if (data.length > 0) {
        const results = await getGeocode({ address: data[0].description });
        const { lat, lng } = await getLatLng(results[0]);

        updateCoords({ coords: { latitude: lat, longitude: lng } });
        setCoords({ coords: { latitude: lat, longitude: lng } });
      }
    };
    fetchLoc();
  }, [data]);

  const [options, setOptions] = useState({
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 50000,
    zIndex: 1,
  });
  const mapRef = useRef(null);

  //const isLoaded = true;
  const [locationDistances, setLocationDistances] = useState([]);

  return isLoaded ? (
    <Cont>
      <Toaster />
      <Topbar
        tagsFetch={tagsFetch}
        updateCoords={updateCoords}
        locations={locations}
        setLocationsFilter={setLocationsFilter}
        center={center}
        radiusValues={radiusValues}
        setRadiusValues={setRadiusValues}
        value={radiusValue}
        setValue={setRadiusValue}
        setLocationDistances={setLocationDistances}
      />
      <div className="google-holder">
        <Sidebar
          tagsFetch={tagsFetch}
          updateCoords={updateCoords}
          locations={locationsFilter}
          setLocationsFilter={setLocationsFilter}
          fetchLocation={fetchLocation}
          locationDistances={locationDistances}
        />{" "}
        {/*
        <GoogleMap
          ref={mapRef}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={(e) => adding && addMarker(e)}
          options={{ gestureHandling: "greedy" }}
        >
          <Circle
            visible={false}
            center={center}
            options={options}
            ref={circleRef}
          />

          {markers}
        </GoogleMap>
        
  */}
        <OpenStreetMap
          locations={locations}
          locationsFilter={locationsFilter}
          center={center}
          radius={radiusValue}
        />
      </div>

      <Bottombar
        adding={adding}
        startAdding={startAdding}
        stopAdding={stopAdding}
        location={location}
        setLocation={updateLocation}
        tagsFetch={tagsFetch}
        addTag={addTag}
        fetchNewLocation={fetchNewLocation}
        user={user}
        updateCoords={updateCoords}
      />
      <div className="lg-spacer"></div>
      <Suppliers />
    </Cont>
  ) : (
    <> </>
  );
};

export default Index;
