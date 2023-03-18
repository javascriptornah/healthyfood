import styled from "styled-components";
import { GoogleMap, useJsApiLoader, Circle } from "@react-google-maps/api";
import { useState, useCallback, useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import MarkerComponent from "./MarkerComponent";
import FishMarker from "./FishMarker";
import SeaMarker from "./SeaMarker";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
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
const Index = ({ oceansFetch, seasFetch, pollutionFetch, fishFetch }) => {
  const [oceans, setOceans] = useState(oceansFetch);
  const [seas, setSeas] = useState(seasFetch);
  const [pollution, setPollution] = useState(pollutionFetch);
  const [fish, setFish] = useState(fishFetch);
  const circleRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState({
    lat: 34.621,
    lng: -41.166,
  });

  const [oceanElems, setOceanElems] = useState(
    oceans.map((ocean, index) => {
      return (
        <Circle
          center={{
            lat: ocean.lat,
            lng: ocean.lng,
          }}
          key={index}
          options={{
            strokeColor: "#0000FF",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#0000FF",
            fillOpacity: 0.2,
            clickable: false,
            draggable: false,
            editable: false,
            visible: true,
            radius: ocean.radius * 1000,
            zIndex: 1,
          }}
        />
      );
    })
  );

  const [oceanMarkers, setOceanMarkers] = useState(
    oceans.map((ocean, index) => {
      return (
        <MarkerComponent
          key={index}
          latLong={{
            lat: ocean.lat,
            lng: ocean.lng,
          }}
          name={ocean.name}
          icon="/icons/water.png"
        />
      );
    })
  );

  const [seaElems, setSeaElems] = useState(
    seas.map((sea, index) => {
      return (
        <Circle
          key={index}
          center={{
            lat: sea.lat,
            lng: sea.lng,
          }}
          options={{
            strokeColor: "#00FF00",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#00FF00",
            fillOpacity: 0.2,
            clickable: false,
            draggable: false,
            editable: false,
            visible: true,
            radius: sea.radius * 1000,
            zIndex: 1,
          }}
        />
      );
    })
  );

  const [seaMarkers, setSeaMarkers] = useState(
    seas.map((sea, index) => {
      return (
        <SeaMarker
          key={index}
          latLong={{
            lat: sea.lat,
            lng: sea.lng,
          }}
          name={sea.name}
          icon="/icons/sea.png"
          description={sea.description}
        />
      );
    })
  );

  const [pollutionElems, setPollutionlems] = useState(
    pollution.map((pollutionItem, index) => {
      return (
        <Circle
          key={index}
          center={{
            lat: pollutionItem.lat,
            lng: pollutionItem.lng,
          }}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.2,
            clickable: false,
            draggable: false,
            editable: false,
            visible: true,
            radius: pollutionItem.radius * 1000,
            zIndex: 1,
          }}
        />
      );
    })
  );

  const [pollutionMarkers, setPollutionMarkers] = useState(
    pollution.map((pollutionItem, index) => {
      return (
        <MarkerComponent
          key={index}
          latLong={{
            lat: pollutionItem.lat,
            lng: pollutionItem.lng,
          }}
          name={pollutionItem.name}
          icon="/icons/pollution.png"
          date={pollutionItem.date}
          severity={pollutionItem.severity}
          description={pollutionItem.description}
        />
      );
    })
  );

  const [fishMarkers, setFishMarkers] = useState(
    fish.map((fishItem, index) => {
      return (
        <FishMarker
          key={index}
          latLong={{
            lat: fishItem.lat,
            lng: fishItem.lng,
          }}
          name={fishItem.fish_id.name}
          appearance={fishItem.fish_id.appearance}
          description={fishItem.fish_id.description}
          icon="/icons/fish2.png"
        />
      );
    })
  );
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

  const [adding, setAdding] = useState(false);

  const startAdding = () => {
    setAdding(true);
  };

  const stopAdding = () => {
    setAdding(false);
  };

  const updateCoords = (position) => {
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

  console.log("xxx");
  console.log(oceanElems);
  return isLoaded ? (
    <Cont>
      <Toaster />

      <div className="google-holder">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={4}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={(e) => adding && addMarker(e)}
          options={{ gestureHandling: "greedy" }}
        >
          {oceanElems}
          {oceanMarkers}

          {seaElems}
          {seaMarkers}

          {pollutionElems}
          {pollutionMarkers}

          {fishMarkers}
        </GoogleMap>
      </div>

      <div className="lg-spacer"></div>
    </Cont>
  ) : (
    <> </>
  );
};

export default Index;
