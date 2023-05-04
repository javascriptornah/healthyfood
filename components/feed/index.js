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
  .blue-btn-one {
    @media only screen and (max-width: 600px) {
      width: 100%;
      text-align: center;
    }
  }
`;
const Index = ({ locationsFetch }) => {
  const [locationsStale, setLocationsStale] = useState(locationsFetch);
  const [locations, setLocations] = useState(locationsFetch);
  const [renderCount, setRenderCount] = useState(10);
  console.log(locations);
  const filterByDate = (from, to) => {
    setLocations((prev) => {
      return locationsStale
        .filter(
          (location) => from < location.created_at && to > location.created_at
        )
        .sort((a, b) =>
          a.created_at > b.created_at ? -1 : b.created_at > a.created_at ? 1 : 0
        );
    });
  };

  const filterByRegion = (region, regionType) => {
    setLocations((prev) => {
      return locationsStale
        .filter((location) =>
          location.address[0][regionType + "_id"].name.includes(region)
        )
        .sort((a, b) =>
          a.created_at > b.created_at ? -1 : b.created_at > a.created_at ? 1 : 0
        );
    });
  };
  const showMore = () => {
    if (renderCount + 10 > locations.length) {
      setRenderCount(locations.length);
    } else {
      setRenderCount(renderCount + 10);
    }
  };
  return (
    <Cont colors={COLORS} className="box-shadow-2">
      <div className="header-spec red-title center-inline mar-bottom-32">
        <h1>Feed</h1>
      </div>

      <Sortbar
        locationsFetch={locationsFetch}
        filterByDate={filterByDate}
        filterByRegion={filterByRegion}
      />
      <Locations locations={locations} renderCount={renderCount} />
      <div className="mar-bottom-32">
        {renderCount < locations.length && (
          <div className="flex justify-center p-x-16">
            <div className="blue-btn-one" onClick={showMore}>
              <h5>Show more</h5>
            </div>
          </div>
        )}
      </div>
    </Cont>
  );
};

export default Index;
