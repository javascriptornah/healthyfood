import { useEffect, useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Location from "./Location";

const Cont = styled.div`
  .content-holder {
    border: 1px solid ${(props) => props.colors.grey};
    background-color: ${(props) => props.colors.tan};
    border-radius: 8px;
    padding: 8px 12px;
  }
  .title {
    border: 1px solid ${(props) => props.colors.darkPink};
    border-radius: 8px;
    padding: 12px 8px;
    background: linear-gradient(#edc7b7, #eee2dc);
  }
  .overscroll {
    max-height: 800px;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.5rem !important;
    }
  }
`;
const PostPreview = ({ title, locations }) => {
  const iteration = 10;
  const [renderCount, setRenderCount] = useState(10);
  const [locationElems, setLocationElems] = useState(
    locations.map((location, index) => {
      return (
        <Location
          key={index}
          id={location.id}
          index={index}
          name={location.name}
          address={location.address[0].full_address}
          tags={location.tags}
          url={location.images.length > 0 ? location.images[0].url : null}
          description={location.description}
        />
      );
    })
  );
  useEffect(() => {
    setLocationElems((prev) => {
      return locations.map((location, index) => {
        return (
          <Location
            id={location.id}
            key={index}
            index={index}
            name={location.name}
            address={location.address[0].full_address}
            tags={location.tags}
            url={location.images.length > 0 ? location.images[0].url : null}
            description={location.description}
          />
        );
      });
    });
  }, [locations]);

  const [renderElems, setRenderElems] = useState([]);
  useEffect(() => {
    const elems = [];
    for (let i = 0; i < renderCount; i++) {
      elems.push(locationElems[i]);
    }
    setRenderElems(elems);
  }, [locationElems, renderCount]);
  const increaseIteration = () => {
    setRenderCount((prev) => {
      if (prev + iteration > locations.length) {
        return locations.length;
      } else {
        return prev + iteration;
      }
    });
  };
  return (
    <Cont colors={COLORS} className="mar-bottom-64 ">
      <div className="title mar-bottom-16 flex align-center">
        <h4 className="text-shadow-2 mar-right-16">{title}</h4>
        <p className="contrast bold">({locations.length})</p>
      </div>
      <div className="content-holder ">
        <div className="overscroll">
          {renderElems}
          {renderElems.length < locations.length && (
            <div className="center-inline mar-bottom-32">
              <div className="mar-bottom-4"></div>
              <div onClick={increaseIteration} className="blue-btn-one">
                <h5>Show More</h5>
              </div>
            </div>
          )}
        </div>
      </div>
    </Cont>
  );
};

export default PostPreview;
