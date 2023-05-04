import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Sortbar from "./Sortbar";
import Locations from "./Locations";
const Cont = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  background-color: ${(props) => props.colors.lightBeige};
  border-radius: 16px 16px 0 0;
  border: 1px solid ${(props) => props.colors.grey};

  .header-spec {
  }
  .red-title {
    display: block;
    border-radius: 16px 16px 0 0;
  }
  .sm-spacer {
    margin-bottom: 500px;
  }
  @media only screen and (max-width: 1400px) {
    border-radius: 0;
    .red-title {
      border-radius: 0;
      border-right: none;
      border-left: none;
    }
  }
`;
const Index = ({ locationsFetch }) => {
  const [locations, setLocation] = useState(locationsFetch);
  const [renderCount, setRenderCount] = useState(10);

  console.log("locations");
  console.log(locations);
  return (
    <Cont colors={COLORS} className="box-shadow-2">
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
