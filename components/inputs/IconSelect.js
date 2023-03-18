import Image from "next/image";
import { useRef, useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
const Cont = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  position: relative;
  .main-img-cont {
    background-color: white;
    margin-right: 32px;
    padding: 8px;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
      rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
      rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset,
      rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
      rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
      rgba(0, 0, 0, 0.09) 0px 32px 16px;
    @media only screen and (max-width: 400px) {
      margin-right: 8px;
    }
  }

  .icon {
    background: white;
    margin-bottom: 8px;
    padding: 8px;
    border-radius: 8px;
    border: 4px solid ${(props) => props.colors.green};
    cursor: pointer;
    z-index: 5;
    image-rendering: optimizeQuality;
    &:hover {
      background: rgb(59, 172, 70);
      background: linear-gradient(
        90deg,
        rgba(59, 172, 70, 1) 0%,
        rgba(255, 255, 255, 1) 49%,
        rgba(59, 172, 70, 1) 100%
      );
    }
  }
  .icons-holder {
    display: flex;
    padding: 16px;
    flex-wrap: wrap;
    justify-content: center;
    background-color: ${(props) => props.colors.offWhite};
    border-radius: 16px;
    box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
      rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
      rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset,
      rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
      rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
      rgba(0, 0, 0, 0.09) 0px 32px 16px;
    position: relative;
  }
`;
const IconSelect = ({ selectedIcon, setSelectedIcon }) => {
  const [icons, setIcons] = useState([
    "/icons/milk.png",
    "/icons/egg.png",
    "/icons/fish.png",
    "/icons/fruit.png",
    "/icons/market.png",
    "/icons/honey.png",
  ]);
  const setIcon = (icon) => {
    setIcons((icons) => {
      icons = icons.filter((prev) => prev !== icon);
      return [...icons, selectedIcon];
    });

    setSelectedIcon(icon);

    selectedImg.current.classList.add("opacity-anim");
    setTimeout(() => {
      selectedImg.current.classList.remove("opacity-anim");
    }, 1000);
  };

  const iconElems = icons.map((icon, index) => {
    return (
      <div
        key={index}
        className="icon mar-right-8 box-shadow-2"
        id={icon}
        onClick={() => setIcon(icon)}
      >
        <Image
          style={{ display: "block" }}
          src={icon}
          width="32"
          height="32"
          quality="100"
          className="icon-img"
        />
      </div>
    );
  });

  const selectedImg = useRef(null);
  return (
    <Cont colors={COLORS}>
      <div className="main-img-cont box-shadow-2 cursor " ref={selectedImg}>
        <Image
          style={{ display: "block" }}
          src={selectedIcon}
          width="32"
          height="32"
          quality="100"
        />
      </div>
      <div className="icons-holder">{iconElems}</div>
    </Cont>
  );
};

export default IconSelect;
