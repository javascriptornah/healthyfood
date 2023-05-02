import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { capitalize } from "../../utils/functions";
const Cont = styled.div`
  margin-bottom: 16px;
  @media only screen and (max-width: 300px) {
    .icon-med {
      font-size: 24px;
    }
  }
`;

const StarReview = ({ field, stars, updateStarsFunc }) => {
  const star1 = useRef(null);
  const star2 = useRef(null);
  const star3 = useRef(null);
  const star4 = useRef(null);
  const star5 = useRef(null);
  const [refs, setRefs] = useState([star1, star2, star3, star4, star5]);
  const updateStars = (index) => {
    updateStarsFunc(field, index);
    refs.forEach((ref) => {
      ref.current.classList.remove("yellow");
    });
    for (let i = 0; i < index; i++) {
      refs[i].current.classList.add("yellow");
    }
  };

  const selectStars = (index) => {
    for (let i = 0; i < index; i++) {
      refs[i].current.classList.add("red-anim");
      setTimeout(() => {
        refs[i].current.classList.remove("red-anim");
      }, 1000);
    }
  };

  useEffect(() => {
    updateStars(stars);
  }, []);
  return (
    <Cont colors={COLORS}>
      <p className="bold black mar-bottom-4">{capitalize(field)}</p>
      <div className="star-holder mar-bottom-4">
        <FontAwesomeIcon
          data-index={star1}
          icon={faStar}
          className="icon-med star-icon"
          onMouseOver={() => updateStars(1)}
          onClick={() => selectStars(1)}
          ref={star1}
        />
        <FontAwesomeIcon
          data-index={2}
          icon={faStar}
          className="icon-med star-icon"
          onMouseOver={() => updateStars(2)}
          onClick={() => selectStars(2)}
          ref={star2}
        />
        <FontAwesomeIcon
          data-index={3}
          icon={faStar}
          className="icon-med star-icon"
          onMouseOver={() => updateStars(3)}
          onClick={() => selectStars(3)}
          ref={star3}
        />
        <FontAwesomeIcon
          data-index={4}
          icon={faStar}
          className="icon-med star-icon"
          onMouseOver={() => updateStars(4)}
          onClick={() => selectStars(4)}
          ref={star4}
        />
        <FontAwesomeIcon
          data-index={5}
          icon={faStar}
          className="icon-med star-icon"
          onMouseOver={() => updateStars(5)}
          onClick={() => selectStars(5)}
          ref={star5}
        />
      </div>
    </Cont>
  );
};

export default StarReview;
