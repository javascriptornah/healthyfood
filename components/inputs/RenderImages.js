import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
import COLORS from "../../data/colors";
import PhotoDisplay from "../popups/PhotoDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faExpand } from "@fortawesome/free-solid-svg-icons";
const Cont = styled.div`
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  @media only screen and (max-width: 400px) {
    grid-template-columns: 1fr;
  }

  .delete {
    z-index: 1;
    position: absolute;
    width: 32px;
    height: 32px;
    right: 0px;
    top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border: 1px solid;
    cursor: pointer;
    &:hover {
      background-color: ${(props) => props.colors.offWhite};
    }
    &:active {
      box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
        rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
    }
  }
  @keyframes opacity {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .image {
    border: 1px solid ${(props) => props.colors.darkPink};
  }

  .opacity-anima {
    animation-name: opacity;
    animation-duration: 1s;
  }
  .img {
    width: 100%;
    height: 100%;
  }
  .image-container {
    margin-right: 8px;
    margin-bottom: 8px;
    position: relative;
  }
  .img-cont {
    height: 200px;
    width: 100%;
    position: relative;
    overflow: hidden;
    @media only screen and (max-width: 250px) {
      height: 120px;
    }
  }
  .img-popup {
    background: #fff;
    position: absolute;
    transition: transform 0.25s ease;
    transform: translateY(0px);
    width: 100%;
    padding: 4px;
    cursor: pointer;
    border: 1px solid ${(props) => props.colors.black};
    &:hover {
      background-color: ${(props) => props.colors.lightBeige};
    }
  }
`;
const RenderImages = ({
  images,
  updateSelectedImage,
  setPhotoDisplayVisible,
  sliceImages,
}) => {
  const [showImage, setShowImage] = useState(false);
  const imageElems = images.map((image, index) => {
    return (
      <ImageComponent
        index={index}
        sliceImages={sliceImages}
        key={index}
        setPhotoDisplayVisible={setPhotoDisplayVisible}
        image={image}
        updateSelectedImage={updateSelectedImage}
      />
    );
  });
  return <Cont colors={COLORS}>{imageElems}</Cont>;
};

export default RenderImages;

const ImageComponent = ({
  image,
  updateSelectedImage,
  setPhotoDisplayVisible,
  index,
  sliceImages,
}) => {
  const [visible, setVisible] = useState(false);

  const renderImageFunctional = () => {
    updateSelectedImage(URL.createObjectURL(image));
    setPhotoDisplayVisible();
  };
  return (
    <div className=" box-shadow-2 image-container">
      <div className="delete box-shadow" onClick={() => sliceImages(index)}>
        <FontAwesomeIcon icon={faClose} className="icon-sm black" />
      </div>
      <div
        className="img-cont"
        onMouseOut={() => setVisible(false)}
        onMouseOver={() => setVisible(true)}
        onClick={renderImageFunctional}
      >
        <Image
          src={URL.createObjectURL(image)}
          fill
          style={{ objectFit: "cover" }}
          className="opacity-anim image cursor"
          alt={image.name}
          quality={100}
        />
        <div
          style={{
            transform: visible
              ? "translateY(calc(200px - 100%))"
              : "translateY(200px)",
          }}
          className=" img-popup flex space-between align-center"
        >
          <p className="bold blue mar-right-8">Expand</p>
          <FontAwesomeIcon icon={faExpand} className="icon-ssm blue" />
        </div>
      </div>
    </div>
  );
};
