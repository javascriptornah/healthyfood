import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Location from "./Location";
import { useEffect } from "react";

const Cont = styled.div`
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    @media only screen and (max-width: 500px) {
      grid-template-columns: 1fr 1fr;
    }
    @media only screen and (max-width: 300px) {
      grid-template-columns: 1fr;
    }
  }
`;

const Locations = ({ locations }) => {
  const iteration = 30;
  const [renderCount, setRenderCount] = useState(
    locations.length < iteration ? locations.length : iteration
  );

  const increaseRenderCount = () => {
    if (renderCount + iteration > locations.length) {
      setRenderCount(locations.length);
      return;
    }
    setRenderCount(renderCount + iteration);
  };

  const [locationElems, setLocationElems] = useState([]);

  useEffect(() => {
    const locationArray = [];

    for (let i = 0; i < renderCount; i++) {
      locationArray.push(
        <Location
          key={i}
          name={locations[i].name}
          id={locations[i].id}
          address={locations[i].address[0].full_address}
          tags={locations[i].tags}
          url={
            locations[i].images?.length > 0 ? locations[i].images[0].url : null
          }
          description={locations[i].description}
          index={i}
          country={locations[i].address[0].country_id.name}
          state={locations[i].address[0].state_id.name}
        />
      );
    }
    setLocationElems((prev) => {
      return locationArray;
    });
  }, [locations, renderCount]);
  return (
    <Cont colors={COLORS}>
      <div className="grid mar-bottom-32">{locationElems}</div>
      <div className="flex justify-center">
        <div onClick={increaseRenderCount} className="blue-btn-one">
          <h5>Show more</h5>
        </div>
      </div>
    </Cont>
  );
};

export default Locations;
