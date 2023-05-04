import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Sortbar from "./Sortbar";
import Locations from "./Locations";
const Cont = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  background-color: ${(props) => props.colors.lightBeige};
  .header-spec {
  }
  .red-title {
    display: block;
    border-radius: 16px 16px 0 0;
  }
  .sm-spacer {
    margin-bottom: 500px;
  }
`;
const Index = ({ locationsFetch }) => {
  const [locations, setLocation] = useState(locationsFetch);
  const [renderCount, setRenderCount] = useState(10);

  console.log("locations");
  console.log(locations);
  return (
    <Cont colors={COLORS}>
      <div className="header-spec red-title center-inline mar-bottom-32">
        <h1>Feed</h1>
      </div>

      <Sortbar locationsFetch={locationsFetch} />
      <Locations locations={locations} renderCount={renderCount} />
      <div className="sm-spacer"></div>
    </Cont>
  );
};

export default Index;
