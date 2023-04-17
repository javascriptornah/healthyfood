import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Circle, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import MarkerComponent from "../OpenStreetMap/MarkerComponent";
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

const OpenStreetMap = ({ locations, locationsFilter, center, radius }) => {
  const [markers, setMarkers] = useState([]);

  const ZOOM_LEVEL = 9;
  const mapRef = useRef();

  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }
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
      </MapContainer>
    </Cont>
  );
};

export default OpenStreetMap;
