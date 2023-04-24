import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
const Cont = styled.div`
  border: 1px solid ${(props) => props.colors.grey};
  background-color: ${(props) => props.colors.lightBeige};
  border-radius: 4px;

  overflow-y: auto;
  margin-bottom: 8px;
  transition: box-shadow 0.25s ease;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }

  @media only screen and (max-width: 1100px) {
    .image {
      height: 100px !important;
    }
  }
  @media only screen and (max-width: 700px) {
    .text {
      font-size: 13px;
      height: 60px !important;
    }
  }

  .black-bg {
    background-color: black;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    opacity: 0.15;
  }
  .circle-red {
    background-color: ${(props) => props.colors.darkPink};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 16px;
    p {
      color: ${(props) => props.colors.lightBeige};
    }
  }
  .image {
    position: relative;
    width: 100%;
    height: 160px;
  }
  .markdown {
    max-height: 320px;
    overflow: hidden;
  }
  .tag-five {
    background-color: ${(props) => props.colors.lightBeige};
  }
  .text {
    height: 100px;
  }
  .text-hide {
    overflow-y: hidden;
    height: 30px;
  }
`;
const Location = ({
  name,
  address,
  created_at,
  url,
  tags,
  description,
  index,
  id,
  country,
  state,
}) => {
  const tagElems = tags.map((tag, index) => {
    return (
      <div key={index} className="tag-five ">
        <p>{tag}</p>
      </div>
    );
  });
  const [showOverlay, setShowOverlay] = useState(false);
  return (
    <Cont
      colors={COLORS}
      className="location cursor opacity-anim relative"
      onMouseOver={() => setShowOverlay(true)}
      onMouseOut={() => setShowOverlay(false)}
    >
      <Link
        href={{
          pathname: `/farm/${id}`,
        }}
      >
        <div
          className="black-bg"
          style={{ display: showOverlay ? "block" : "none" }}
        ></div>

        <div className=" padding-x-12 padding-y-8">
          <div className="flex align-center">
            <h5 className=" inline-block text-hide text-shadow-2 mar-right-8">
              {name}
            </h5>
          </div>
          <div>
            <FontAwesomeIcon
              icon={faMapPin}
              className="icon-ssm red mar-right-8 inline-block"
            />
            <p className="red inline-block mar-right-4">{country}, </p>
            <p className="red inline-block">{state}</p>
          </div>
        </div>
        <div className="red-line"></div>

        <div>
          <div className="">
            <ReactMarkdown className="markdown padding-x-4 padding-y-8 text">
              {description}
            </ReactMarkdown>
            <div className="right-content"></div>
            {url !== null && (
              <div className="image">
                <Image
                  src={url}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                  className="mar-right-8 image-100"
                  alt={name}
                />
              </div>
            )}
          </div>
        </div>
      </Link>
    </Cont>
  );
};

export default Location;
