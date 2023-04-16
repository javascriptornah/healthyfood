import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Farm from "./Farm";
const Cont = styled.div`
  .x {
    @media only screen and (max-width: 600px) {
      justify-content: center;
    }
  }
  @media only screen and (max-width: 600px) {
    .btn-holder {
      justify-content: baseline;
    }
    .blue-btn-one {
      display: flex;
      width: 100%;
      justify-content: center;
    }
  }
`;
const Results = ({ locations }) => {
  console.log(locations);
  const [renderCount, setRenderCount] = useState(25);
  const actualRenderCount =
    locations.length > 25 ? renderCount : locations.length;

  let locationElems = [];
  for (let i = 0; i < actualRenderCount; i++) {
    locationElems.push(
      <Farm
        key={i}
        name={locations[i].name}
        address={locations[i].address[0].full_address}
        created_at={locations[i].created_at}
        icon={locations[i].icon}
        tags={locations[i].tags}
        pickup={locations[i].pickup}
        pricing={locations[i].pricing}
        quality={locations[i].quality}
        image={locations[i].images[0]?.url}
      />
    );
  }

  return (
    <Cont colors={COLORS} className="tan-container box-shadow">
      <div className=" flex flex-wrap space-between align-start x">
        {locationElems}
      </div>
      <div className="flex justify-center btn-holder">
        <div className="blue-btn-one">
          <h5>Show More</h5>
        </div>
      </div>
    </Cont>
  );
};

export default Results;
