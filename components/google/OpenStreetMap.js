import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Circle, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import MarkerComponent from "../OpenStreetMap/MarkerComponent";
import FishMarkerComponent from "../fishmap/FishMarkerComponent";
import FishMarker from "../fishmap/FishMarker";
import SeaMarker from "../fishmap/SeaMarker";

import L from "leaflet";
const Cont = styled.div`
  width: 100%;
  height: 100%;
  .leaflet-container {
    width: 100%;
    height: 75vh;
    z-index: 1;
  }
`;

const OpenStreetMap = ({
  locations,
  locationsFilter,
  center,
  radius,
  oceansFetch,
  seasFetch,
  pollutionFetch,
  fishFetch,
}) => {
  const [markers, setMarkers] = useState([]);

  const ZOOM_LEVEL = 9;
  const mapRef = useRef();

  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }
  const [oceans, setOceans] = useState(oceansFetch);
  const [seas, setSeas] = useState(seasFetch);
  const [pollution, setPollution] = useState(pollutionFetch);
  const [fish, setFish] = useState(fishFetch);

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
            id={location.id}
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
            images={location.images}
          />
        );
      });
    });
  }, [locations, locationsFilter]);

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
        <FishMarkerComponent
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
        <FishMarkerComponent
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

  return (
    <Cont>
      <MapContainer
        center={center}
        zoom={ZOOM_LEVEL}
        ref={mapRef}
        className="leaflet-container"
      >
        <ChangeView center={center} zoom={ZOOM_LEVEL} />
        <Circle
          center={center}
          radius={Number(radius.match(/[0-9]*/)) * 1000}
          pathOptions={{
            color: "red",
            weight: 2,
            fillOpacity: 0.1,
          }}
        />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers}
        {oceanElems}
        {oceanMarkers}
        {seaElems} {seaMarkers}
        {pollutionElems}
        {pollutionMarkers}
        {fishMarkers}
      </MapContainer>
    </Cont>
  );
};

export default OpenStreetMap;
