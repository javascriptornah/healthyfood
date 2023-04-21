import { useEffect, useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faLocationDot,
  faEgg,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import Searchbar from "../search/Searchbar";
import Listing from "../sidebar/listing";

const Cont = styled.div`
  background-color: ${(props) => props.colors.tan};
  flex-shrink: 0;
  width: 300px;
  padding: 8px;
  border-top: 2px solid ${(props) => props.colors.darkPink};
  border-bottom: 2px solid ${(props) => props.colors.darkPink};
  height: 75vh;
  overflow: hidden;
  .black-btn {
    position: sticky;
    margin-bottom: 32px;
  }
  .location-holder {
    height: 100%;
    overflow: auto;
  }
  @media only screen and (max-width: 900px) {
    width: 200px;
  }
  @media only screen and (max-width: 800px) {
    width: 80%;
    margin: 0 10%;
    .input-line {
      max-width: 200px;
      margin-bottom: 16px;
    }
  }
  @media only screen and (max-width: 400px) {
    width: 90%;
    margin: 0 5%;
  }
`;

const Sidebar = ({ locations, fetchLocation, locationDistances }) => {
  const locationsSort =
    locationDistances.length > 0
      ? locations.sort((a, b) => {
          let locA = locationDistances.find(
            (location) => location.name == a.name
          );
          let locB = locationDistances.find(
            (location) => location.name == b.name
          );
          return Number(locA.distance) < Number(locB.distance)
            ? -1
            : Number(locA.distance) > Number(locB.distance)
            ? 1
            : 0;
        })
      : locations;
  const sidebarLocations = locationsSort.map((location, index) => {
    const locationDistance = locationDistances.find(
      (locationDistance) => locationDistance.name == location.name
    );

    return (
      <Listing
        key={index}
        name={location.name}
        address={location.address[0]?.full_address}
        created_at={location.created_at}
        icon={location.icon}
        tags={location.tags}
        pickup={location.pickup}
        pricing={location.pricing}
        quality={location.quality}
        friendly={location.friendly}
        image={location.images.length == 0 ? null : location.images[0].url}
        distance={locationDistance?.distance}
      />
    );
  });
  return (
    <Cont colors={COLORS}>
      <div className="flex flex-end">
        <div
          className="black-btn flex-inline align-center"
          onClick={fetchLocation}
        >
          <h5 className="mar-right-8">FIND ME</h5>
          <FontAwesomeIcon icon={faLocationDot} className="icon-ssm white" />
        </div>
      </div>
      <div className="location-holder">{sidebarLocations}</div>
    </Cont>
  );
};

export default Sidebar;
