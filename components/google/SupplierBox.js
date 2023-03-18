import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { useState } from "react";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import Aos from "aos";
import "aos/dist/aos.css";
const Cont = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  word-break: break-word;
  margin-bottom: 128px;

  max-width: 2000px;
  margin: 0 auto 128px;
  border-bottom: 1px solid ${(props) => props.colors.darkGrey};
  padding-bottom: 48px;
  @media only screen and (max-width: 900px) {
    flex-direction: column;
  }
  & > div {
    padding: 32px;

    @media only screen and (max-width: 900px) {
      padding: 16px;
    }
  }
  li,
  p {
    display: inline-block;
  }
  li::before {
    content: "";
  }
  .lines {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .lines {
    & > div {
      margin-bottom: 8px;
    }
  }
  li {
    margin-bottom: 8px;
    display: block;
  }
  .image-holder {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-height: 400px;
    img {
      padding: 32px;
      @media only screen and (max-width: 900px) {
        padding: 16px;
      }
    }
  }
`;

const SupplierBox = ({ links, pros, cons, name, country, image }) => {
  const [proElems, setProElems] = useState(
    pros.map((pro, index) => {
      return (
        <li key={index}>
          <p className="bold list-item">{pro}</p>
        </li>
      );
    })
  );

  const [conElems, setConElems] = useState(
    cons.map((con, index) => {
      return (
        <li key={index}>
          <p className="bold light-red list-item-red">{con}</p>
        </li>
      );
    })
  );

  return (
    <Cont colors={COLORS} className="supplier-box" data-aos="fade-up">
      <div className="text-box flex-one">
        <div className="center-inline">
          <h3 className="black mar-bottom-16">{name}</h3>
        </div>
        <div className="lines">
          <div className="flex align-center">
            <FontAwesomeIcon
              icon={faLink}
              className="light-blue icon-sm mar-right-8"
            />
            <a target="_blank" rel="noreferrer" href={links[0]}>
              <p className="bold light-blue underline-hover"> {links[0]} </p>
            </a>
          </div>
          {links[1] !== null && (
            <div className="flex align-center">
              <FontAwesomeIcon
                icon={faInstagram}
                className="mar-right-8 light-blue icon-sm"
              />
              <a target="_blank" rel="noreferrer" href={links[1]}>
                <p className="bold light-blue underline-hover"> {links[1]} </p>
              </a>
            </div>
          )}

          <ul className="flex align-center flex-column">{proElems}</ul>
          <ul className="flex-align-center flex-column">{conElems}</ul>
        </div>
      </div>
      <div className="image-holder flex-one">
        <Image
          quality="100"
          fill
          src={image}
          style={{ objectFit: "contain" }}
          alt={name}
          sizes={"100%"}
        />
      </div>
    </Cont>
  );
};

export default SupplierBox;
