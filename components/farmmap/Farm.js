import Link from "next/link";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Image from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { getRandomColor } from "../../utils/functions";

const Cont = styled.div`
  background: #fff;
  border: 1px solid ${(props) => props.colors.grey};
  padding: 8px;
  margin-bottom: 16px;
  transition: box-shadow 0.25s ease;
  max-width: 240px;
  @media only screen and (max-width: 550px) {
    max-width: 100%;
    width: 100%;
  }
  &:hover {
    border: 1px solid ${(props) => props.colors.black};
  }
  cursor: pointer;

  &:hover {
    box-shadow: none;
  }
  .image-holder {
    width: 100%;
    height: 200px;
    position: relative;
  }
  .tags-holder {
    display: flex;
    justify-content: flex-start;
    padding: 4px;
    border-radius: 8px 8px 0 0;
    margin-bottom: 8px;
    flex-wrap: wrap;
  }
  .tag-four {
    margin-bottom: 8px;
  }
`;
const Listing = ({
  name,
  address,
  created_at,
  icon,
  tags,
  pickup,
  pricing,
  quality,
  image = null,
  distance,
}) => {
  console.log(image);
  const [tagElems, setTagsElems] = useState(
    tags.map((tag, index) => {
      return (
        <div
          key={index}
          style={{ backgroundColor: getRandomColor() }}
          className="tag-four"
        >
          <p className="black">{tag}</p>
        </div>
      );
    })
  );
  const [starFields, setStarFields] = useState(
    [
      { name: "Pricing", value: pricing },
      { name: "Quality", value: quality },
    ].map((field, index) => {
      return (
        <div key={index} className="star-holder mar-bottom-8">
          <p className="black mar-bottom-4">{field.name}</p>
          <div className="star-holder">
            {[1, 2, 3, 4, 5].map((index, realIndex) => {
              return (
                <FontAwesomeIcon
                  key={realIndex}
                  icon={faStar}
                  className={
                    index <= field.value ? "icon-ssm yellow" : "icon-ssm black"
                  }
                />
              );
            })}
          </div>
        </div>
      );
    })
  );
  return (
    <Cont colors={COLORS} className="box-shadow-2">
      <Link
        href={{
          pathname: `/farm/${name}`,
          query: {
            title: name,
          },
        }}
        className="underline-hover"
      >
        {image !== null && (
          <div className="image-holder mar-bottom-8">
            <Image
              src={image}
              style={{ objectFit: "cover" }}
              quality="100"
              alt={name}
              sizes={"100%"}
              fill
            />
          </div>
        )}
        <div className="flex flex-end align-center">
          <p className="bold mar-right-8">{distance} km</p>
          <FontAwesomeIcon icon={faLocationDot} className="icon-ssm black" />
        </div>
        <div className="flex align-center space-between">
          <div>
            <h5 className="black">{name}</h5>
          </div>
          <Image src={icon} width={32} height={32} quality="100" alt={icon} />
        </div>
        <div className="black-line-2 mar-bottom-8"></div>
        <p className="light black">{address}</p>

        <div className="grey-line mar-bottom-8"></div>
        <p className="black mar-bottom-8">{pickup}</p>
        <div className="grey-line mar-bottom-8"></div>
        <div className="tags-holder">{tagElems}</div>
        {starFields}
        <div className="grey-line mar-top-8"></div>
      </Link>
    </Cont>
  );
};

export default Listing;
