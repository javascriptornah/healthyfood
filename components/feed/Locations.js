import { useEffect, useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Location from "./Location";

const Cont = styled.div``;
const Locations = ({ locations, renderCount }) => {
  console.log(locations);
  const [locationElems, setLocationElems] = useState([]);
  useEffect(() => {
    const locationArray = [];
    const counter =
      renderCount > locations.length ? locations.length : renderCount;
    for (let i = 0; i < counter; i++) {
      locationArray.push(
        <Location
          key={i}
          id={locations[i].id}
          name={locations[i].name}
          country={locations[i].address[0].country_id.name}
          state={locations[i].address[0].state_id.name}
          created_at={locations[i].created_at}
          description={locations[i].description}
          images={locations[i].images || []}
          username={locations[i].user_id?.username || "anon"}
          avatar_url={locations[i].user_id?.avatar_url || "anon.png"}
        />
      );
    }
    setLocationElems(locationArray);
  }, [locations, renderCount]);
  return <Cont colors={COLORS}>{locationElems}</Cont>;
};

export default Locations;
