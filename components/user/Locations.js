import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Location from "./Location";

const Cont = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  @media only screen and (max-width: 500px) {
    grid-template-columns: 1fr 1fr;
  }
  @media only screen and (max-width: 300px) {
    grid-template-columns: 1fr;
  }
  .location {
  }
`;

const Locations = ({ locations }) => {
  const [locationElems, setLocationElems] = useState(
    locations.map((location, index) => {
      return (
        <Location
          key={index}
          name={location.name}
          address={location.address[0].full_address}
          tags={location.tags}
          url={location.images?.length > 0 ? location.images[0].url : null}
          description={location.description}
          index={index}
          country={location.address[0].country_id.name}
          state={location.address[0].state_id.name}
        />
      );
    })
  );
  console.log(locations);
  return <Cont colors={COLORS}>{locationElems}</Cont>;
};

export default Locations;
