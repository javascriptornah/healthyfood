import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import { Marker, Popup, Tooltip } from "react-leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faEye, faStar } from "@fortawesome/free-solid-svg-icons";
import L from "leaflet";
import COLORS from "../../data/colors";
import colors from "../../data/colors";
import ReactMarkdown from "react-markdown";
const Cont = styled.div`
  max-width: 320px;
  .tags-holder {
    border-bottom: 1px solid ${(props) => props.colors.grey};

    display: flex;
    justify-content: center;
    //background-color: ${(props) => props.colors.grey};

    padding: 4px;
    border-radius: 8px 8px 0 0;
    margin-bottom: 8px;
  }
  .field-line {
    margin-bottom: 8px;
    word-break: break-word;
  }
`;
const MarkerComponent = ({
  latLong,
  name,
  icon,
  severity = 0,
  description,
  date,
}) => {
  const [open, setOpen] = useState(false);

  let iconItem = L.icon({
    iconUrl: icon,
    iconSize: [24, 24],

    popupAnchor: [-3, -76],
  });
  return (
    <Marker icon={iconItem} position={latLong} onClick={() => setOpen(true)}>
      <Tooltip>{name}</Tooltip>

      <Popup className="icon-box">
        <Cont colors={COLORS} className="info-box">
          <p className="bold underline">{name}</p>
          <p className="contrast"> {new Date(date).toDateString()}</p>
          <div className="mar-bottom-16"></div>
          <div className="star-holder mar-bottom-16">
            <h5 className="black mar-bottom-4">Severity</h5>
            <div className="star-holder">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index, realIndex) => {
                return (
                  <FontAwesomeIcon
                    key={realIndex}
                    icon={faStar}
                    className={
                      index <= severity
                        ? "icon-ssm light-red"
                        : "icon-ssm black"
                    }
                  />
                );
              })}
            </div>
          </div>
          <ReactMarkdown className="markdown">{description}</ReactMarkdown>
        </Cont>
      </Popup>
    </Marker>
  );
};

export default MarkerComponent;
