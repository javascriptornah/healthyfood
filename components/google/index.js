import styled from "styled-components";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import Bottombar from "./Bottombar";
import MarkerComponent from "./MarkerComponent";
import Alert from "../popups/alert";
import { useState, useCallback, useEffect } from "react";
import { insertCountries } from "../../utils/supabaseFunctions";
const Cont = styled.div`
  min-height: 100vh;
`;

const containerStyle = {
  width: "100%",
  height: "70vh",
};

const center = {
  lat: 45.4215,
  lng: -75.695,
};

const options = {
  imagePath:
    "'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
};

function createKey(location) {
  return location.lat + location.lng;
}
const Index = ({ locations, tagsFetch, addTag }) => {
  const [location, setLocation] = useState("");
  const [markers, setMarkers] = useState([]);
  useEffect(() => {
    setMarkers((prev) => {
      return locations.map((location, index) => {
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
          />
        );
      });
    });
  }, [locations]);

  console.log(markers);
  const [libraries] = useState(["places"]);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries,
  });
  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);

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
  return isLoaded ? (
    <Cont>
      {adding && <Alert />}

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={7}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={(e) => adding && addMarker(e)}
        options={{ gestureHandling: "greedy" }}
      >
        {markers}
      </GoogleMap>
      <button onClick={focusSearchBar}>add marker</button>
      <Bottombar
        adding={adding}
        startAdding={startAdding}
        stopAdding={stopAdding}
        location={location}
        setLocation={updateLocation}
        tagsFetch={tagsFetch}
        addTag={addTag}
      />
    </Cont>
  ) : (
    <> </>
  );
};

export default Index;