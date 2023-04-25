import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faEye } from "@fortawesome/free-solid-svg-icons";
import { Marker, Popup, Tooltip } from "react-leaflet";
import COLORS from "../../data/colors";
import L from "leaflet";
import Slideshow from "./Slideshow";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
const Cont = styled.div`
  max-width: 320px;
  .tags-holder {
    border-bottom: 1px solid ${(props) => props.colors.grey};

    display: flex;
    justify-content: center;
    //background-color: ${(props) => props.colors.grey};

    padding: 8px;
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
  description,
  email,
  number,
  website = null,
  pickup,
  address,
  hoursFrom,
  hoursTo,
  tags,
  products,
  icon,
  id,
  images,
}) => {
  const [open, setOpen] = useState(false);
  const getPixelPositionOffset = (offsetWidth, offsetHeight, labelAnchor) => {
    return {
      x: offsetWidth + labelAnchor.x,
      y: offsetHeight + labelAnchor.y,
    };
  };

  let iconItem = L.icon({
    iconUrl: icon,
    iconSize: [24, 24],

    popupAnchor: [-3, -76],
  });

  let point = L.point(0, -12);

  const [tagElems, setTagElems] = useState([]);

  useEffect(() => {
    let renderCount = tags.length > 4 ? 4 : tags.length;
    for (let i = 0; i < renderCount; i++) {
      tagElems.push(
        <div className="tag-six">
          <p>{tags[i]}</p>
        </div>
      );
    }
  }, []);

  return (
    <>
      <Marker icon={iconItem} position={latLong} onClick={() => setOpen(true)}>
        <Tooltip offset={point} direction={"top"}>
          {name}
        </Tooltip>
        <Popup className="icon-box">
          <Cont colors={COLORS} className="info-box">
            <div className="tags-holder">{tagElems}</div>
            <Link
              href={{
                pathname: `/farm/${id}`,
              }}
            >
              <div className="blue-btn-one flex justify-center align-center mar-bottom-16">
                <h5 className="mar-right-8">VIEW</h5>
                <FontAwesomeIcon icon={faEye} className="icon-sm white" />
              </div>
            </Link>
            <div className="field-line">
              <h5 className="bold black">{name}</h5>
            </div>
            {images.length > 0 && <Slideshow images={images} />}

            <div className="field-line">
              <p className="black bold">Address</p>
              <div className="grey-line mar-bottom-4"></div>
              <h5 className="bold black">{address}</h5>
            </div>
            {website != null && (
              <div className="field-line">
                <p className="black bold">Website</p>
                <div className="grey-line mar-bottom-4"></div>
                <a href={website}>
                  <p className="bold light-blue underline-hover">{website}</p>
                </a>
              </div>
            )}

            <div className="field-line">
              <p className="black bold">Description</p>
              <p className="info-box-description">
                <ReactMarkdown className="base-markdown">
                  {description}
                </ReactMarkdown>
              </p>
            </div>

            <div className="field-line">
              <p className="bold">Products</p>
              <div className="grey-line mar-bottom-4"></div>
              <ul className="products-holder">
                {products.map((product, index) => {
                  return (
                    <li key={index} className="product mar-bottom-4">
                      <h6 className="black">{product.name}</h6>
                      <div className="spacer-line"></div>
                      <div className="price">
                        <p>
                          ${product.price}/{product.measurement}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex field-line">
              {email != null && (
                <div
                  style={{ borderRight: "1px solid black" }}
                  className="mar-right-8 pad-right-8 flex-one"
                >
                  <p className="bold">Email:</p>
                  <div className="grey-line mar-bottom-4"></div>
                  <a href={`mailto:${email}`}>
                    <p className="bold light-blue underline-hover">{email}</p>{" "}
                  </a>
                </div>
              )}
              {number != null && (
                <div className="flex-one">
                  <p className="bold">Phone:</p>
                  <div className="grey-line mar-bottom-4"></div>
                  <a href={`tel:${number}`}>
                    <p className="bold light-blue underline-hover">{number}</p>
                  </a>
                </div>
              )}
            </div>
            <div className="field-line">
              <p className="bold">Pickup or delivery?</p>
              <div className="grey-line mar-bottom-4"></div>
              <h5 className="bold black">{pickup}</h5>
            </div>

            <p className="bold">Hours</p>
            <div className="grey-line mar-bottom-4"></div>
            <div className="flex">
              {hoursFrom !== "" && (
                <div
                  style={{ borderRight: "1px solid black" }}
                  className="mar-right-8 pad-right-8 flex-one"
                >
                  <p className="bold">Opens</p>
                  <p>
                    {new Date(
                      "1970-01-01T" + hoursFrom + "Z"
                    ).toLocaleTimeString("en-US", {
                      timeZone: "UTC",
                      hour12: true,
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </p>
                </div>
              )}
              {hoursTo !== "" && (
                <div className="flex-one">
                  <p className="bold">Closes</p>
                  <p>
                    {new Date("1970-01-01T" + hoursTo + "Z").toLocaleTimeString(
                      "en-US",
                      {
                        timeZone: "UTC",
                        hour12: true,
                        hour: "numeric",
                        minute: "numeric",
                      }
                    )}
                  </p>
                </div>
              )}
            </div>
            <div className="mar-bottom-16"></div>
            <Link
              href={{
                pathname: `/farm/${id}`,
              }}
            >
              <div className="blue-btn-one flex justify-center align-center mar-bottom-16">
                <h5 className="mar-right-8">VIEW</h5>
                <FontAwesomeIcon icon={faEye} className="icon-sm white" />
              </div>
            </Link>
          </Cont>
        </Popup>
      </Marker>
    </>
  );
};

export default MarkerComponent;
