import styled from "styled-components";
import { useState, useCallback, useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import FishMarkerComponent from "./FishMarkerComponent";
import FishMarker from "./FishMarker";
import SeaMarker from "./SeaMarker";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Circle, useMap } from "react-leaflet";
import L from "leaflet";

const Cont = styled.div`
  width: 100%;
  height: 100%;
  //min-height: 100vh;
  .leaflet-container {
    width: 100%;
    height: 85vh;
    z-index: 1;
  }
  .google-holder {
    display: flex;
    @media only screen and (max-width: 800px) {
      flex-direction: column-reverse;
    }
  }
`;

const Index = ({ oceansFetch, seasFetch, pollutionFetch, fishFetch }) => {
  const ZOOM_LEVEL = 4;
  const mapRef = useRef();
  const [oceans, setOceans] = useState(oceansFetch);
  const [seas, setSeas] = useState(seasFetch);
  const [pollution, setPollution] = useState(pollutionFetch);
  const [fish, setFish] = useState(fishFetch);

  const [center, setCenter] = useState({
    lat: 34.621,
    lng: -41.166,
  });

  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  const [oceanElems, setOceanElems] = useState(
    oceans.map((ocean, index) => {
      return (
        <Circle
          center={{
            lat: ocean.lat,
            lng: ocean.lng,
          }}
          radius={ocean.radius * 1000}
          key={index}
          pathOptions={{
            weight: 2,
            color: "#0000FF",
            fillOpacity: 0.2,
            clickable: false,
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

  return (
    <Cont>
      <Toaster />

      <div className="google-holder">
        <MapContainer
          ref={mapRef}
          className="leaflet-container"
          center={center}
          zoom={ZOOM_LEVEL}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ChangeView center={center} zoom={ZOOM_LEVEL} />
          {oceanElems}
          {oceanMarkers}

          {seaElems}
          {seaMarkers}

          {pollutionElems}
          {pollutionMarkers}

          {fishMarkers}
        </MapContainer>
      </div>

      <div className="lg-spacer"></div>
    </Cont>
  );
};

export default Index;
