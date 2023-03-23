import { useEffect, useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Location from "./Location";

const Cont = styled.div`
  border: 1px solid ${(props) => props.colors.grey};
  background-color: ${(props) => props.colors.lightWhite};
  border-radius: 8px;
  padding: 8px 12px;
  .overscroll {
    max-height: 800px;
    overflow: auto;
    ::-webkit-scrollbar {
      width: 1rem;
      background: ${(props) => props.colors.offWhite};
    }
    .small-scrollbar {
      &::-webkit-scrollbar {
        width: 0.5rem;
      }
    }
    ::-webkit-scrollbar-thumb {
      background: ${(props) => props.colors.darkBlue};
      border-radius: 1rem;

      &:hover {
        background: ${(props) => props.colors.lightBlue};
      }
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
    <Cont colors={COLORS} className="mar-bottom-64">
      <h4 className="blue mar-bottom-16">{title}</h4>
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
    </Cont>
  );
};

export default PostPreview;
