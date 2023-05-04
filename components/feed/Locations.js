import { useEffect, useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Location from "./Location";

const Cont = styled.div``;
const Locations = ({ locations, renderCount }) => {
  const [locationElems, setLocationElems] = useState([]);
  useEffect(() => {
    const locationArray = [];
    for (let i = 0; i < renderCount; i++) {
      locationArray.push(
        <Location
          name={locations[i].name}
          country={locations[i].address[0].country_id.name}
          state={locations[i].address[0].state_id.name}
          created_at={locations[i].created_at}
          description={locations[i].description}
          images={locations[i].images || []}
        />
      );
    }
  }, [locations, renderCount]);
  return <Cont colors={COLORS}></Cont>;
};

export default Locations;
