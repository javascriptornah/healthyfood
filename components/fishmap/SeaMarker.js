import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import { Marker, Popup, Tooltip } from "react-leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faEye, faStar } from "@fortawesome/free-solid-svg-icons";
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
const MarkerComponent = ({ latLong, name, icon, description }) => {
  const [open, setOpen] = useState(false);

  let iconItem = L.icon({
    iconUrl: icon,
    iconSize: [24, 24],

    popupAnchor: [-3, -76],
  });

  return (
    <Marker
      label={name}
      icon={iconItem}
      position={latLong}
      onClick={() => setOpen(true)}
    >
      <Tooltip>{name}</Tooltip>
      <Popup>
        <Cont colors={COLORS} className="info-box">
          <p className="bold underline">{name}</p>

          <div className="mar-bottom-16"></div>
          <Link
            href={{
              pathname: `/sea/${name}`,
            }}
          >
            <div className="blue-btn-one flex justify-center align-center mar-bottom-16">
              <h5 className="mar-right-8">VIEW SEA</h5>
              <FontAwesomeIcon icon={faEye} className="icon-sm white" />
            </div>
          </Link>
          <ReactMarkdown className="markdown">{description}</ReactMarkdown>
        </Cont>
      </Popup>
    </Marker>
  );
};

export default MarkerComponent;
