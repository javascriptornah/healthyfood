import { useEffect, useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Image from "next/image";
import Tooltip from "./Tooltip";
const Cont = styled.div`
  .button {
    position: relative;
    justify-content: center;
    display: flex;
    cursor: pointer;
    align-items: center;
  }
`;

const IconSelector = ({ pushTag, deleteTag }) => {
  const [icons, setIcons] = useState({
    egg: { text: "egg", selected: false, hoverState: false },
    fish: { text: "fish", selected: false, hoverState: false },
    fruit: { text: "fruit", selected: false, hoverState: false },
    honey: { text: "honey", selected: false, hoverState: false },
    market: { text: "market", selected: false, hoverState: false },
    meat: { text: "meat", selected: false, hoverState: false },
    milk: { text: "milk", selected: false, hoverState: false },
    restaurant: { text: "restaurant", selected: false, hoverState: false },
  });
  const selectIcon = (icon, selected) => {
    if (!selected) {
      pushTag(icon);
    } else {
      deleteTag(icon);
    }
    setIcons((prevIcons) => {
      return {
        ...prevIcons,
        [icon]: { ...prevIcons[icon], selected: !prevIcons[icon].selected },
      };
    });
  };

  const showIcon = (icon) => {
    setIcons((prevIcons) => {
      return {
        ...prevIcons,
        [icon]: { ...prevIcons[icon], hoverState: true },
      };
    });
  };
  const hideIcon = (icon) => {
    setIcons((prevIcons) => {
      return {
        ...prevIcons,
        [icon]: { ...prevIcons[icon], hoverState: false },
      };
    });
  };
  const [iconElems, setIconElems] = useState(
    Object.entries(icons).map(([key, icon], index) => {
      return (
        <div
          className={icon.selected ? "button active" : "button"}
          onClick={() => selectIcon(key, icon.selected)}
          key={index}
        >
          <Image
            src={`/icons/${icon.text}.png`}
            width={32}
            height={32}
            style={{ objectFit: "contain" }}
          />
        </div>
      );
    })
  );

  useEffect(() => {
    setIconElems((prev) => {
      return Object.entries(icons).map(([key, icon], index) => {
        return (
          <div
            key={index}
            className={icon.selected ? "button active" : "button"}
            onClick={() => selectIcon(key, icon.selected)}
            onMouseOver={() => showIcon(key)}
            onMouseOut={() => hideIcon(key)}
          >
            <Tooltip text={icon.text} shown={icon.hoverState} />

            <Image
              src={`/icons/${icon.text}.png`}
              width={32}
              height={32}
              style={{ objectFit: "contain" }}
            />
          </div>
        );
      });
    });
  }, [icons]);

  return (
    <Cont>
      <div className="flex flex-wrap">{iconElems}</div>
    </Cont>
  );
};

export default IconSelector;
