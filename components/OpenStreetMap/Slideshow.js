import { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
const Cont = styled.div`
  position: relative;
  overflow: hidden;
  &:hover {
    .icon-box {
      opacity: 1;
    }
  }
  .image-cont {
    width: 301px;
    height: 240px;
    position: relative;
    float: left;
  }
  .icon-box {
    position: absolute;
    z-index: 1;
    background-color: ${(props) => props.colors.tan};
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${(props) => props.colors.grey};
    cursor: pointer;
    opacity: 0.5;
    &:hover {
      background-color: ${(props) => props.colors.lightBeige};
    }
    &:active {
      border: 1px solid ${(props) => props.colors.blue};
    }
    &:nth-of-type(1) {
      right: 0px;
      top: 50%;
      transform: translateY(-50%);
    }
    &:nth-of-type(2) {
      left: 0px;
      top: 50%;
      transform: translateY(-50%);
      .icon-sm {
        transform: rotate(180deg);
      }
    }
  }
  .images-holder {
    height: 240px;
    width: 1300px;
    overflow-x: hidden;
    position: relative;
    transition: right 0.25s ease;
  }
  .disabled-icon {
    display: none;
  }
`;

const Slideshow = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [index, setIndex] = useState(0);
  const increaseIndex = () => {
    if (index < images.length - 1) {
      setIndex(index + 1);
    }
  };
  const decreaseIndex = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };
  const right = String(index * 100) + "%";
  console.log(right);
  const imageElems = images.map((image, index) => {
    return (
      <div key={index} className="image-cont">
        <Image
          src={image.url}
          fill
          quality="100"
          style={{ objectFit: "cover" }}
          alt="Preview"
          size={"100%"}
          priority
        />
      </div>
    );
  });
  return (
    <Cont colors={COLORS} className="mar-bottom-32">
      <div
        className={
          index == images.length - 1
            ? "icon-box box-shadow disabled-icon"
            : "icon-box box-shadow"
        }
        onClick={increaseIndex}
      >
        <FontAwesomeIcon icon={faChevronRight} className="blue icon-sm" />
      </div>

      <div
        className={
          index == 0
            ? "icon-box box-shadow disabled-icon"
            : "icon-box box-shadow"
        }
        onClick={decreaseIndex}
      >
        <FontAwesomeIcon icon={faChevronRight} className="blue icon-sm" />
      </div>
      <div className="images-holder" style={{ right: right }}>
        {/* <div className="image-cont">
          <Image
            src={selectedImage.url}
            fill
            quality="100"
            style={{ objectFit: "cover" }}
            alt="Preview"
            size={"100%"}
          />
        </div> */}
        {imageElems}
      </div>
    </Cont>
  );
};

export default Slideshow;
