import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

const Cont = styled.div`
  background-color: ${(props) => props.colors.tan};
  padding: 16px 32px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  @media only screen and (max-width: 360px) {
    padding: 16px 8px;
  }
  .underline-hover {
    text-decoration-color: ${(props) => props.colors.darkPink};
  }
  .contact {
    border-right: 1px solid ${(props) => props.colors.darkPink};
    border-left: 1px solid ${(props) => props.colors.darkPink};
    padding-left: 16px;
    padding-right: 16px;
    @media only screen and (max-width: 407px) {
      border: none;
      border-top: 1px solid ${(props) => props.colors.darkPink};
      border-bottom: 1px solid ${(props) => props.colors.darkPink};
      padding: 16px 0 16px 0;
    }
  }
  .text-wrap {
    word-break: break-all;
  }
`;

const Footer = () => {
  return (
    <Cont colors={COLORS}>
      <div className="flex flex-column align-center mar-bottom-16">
        <Link href="/">
          <h5 className=" underline-hover mar-bottom-8">Food Finder</h5>
        </Link>
        <Link href="/articles">
          <h5 className=" underline-hover mar-bottom-8">Articles</h5>
        </Link>
        <Link href="/nutritionsearch">
          <h5 className=" underline-hover mar-bottom-8">Nutrition</h5>
        </Link>
      </div>

      <div>
        <div className="contact flex flex-column align-center mar-bottom-16">
          <h5 className="mar-bottom-8">Contact</h5>
          <a
            href="https://www.instagram.com/healthyfoodmap_/"
            rel="noreferrer"
            target="_blank"
          >
            <div className="flex align-center underline-hover">
              <FontAwesomeIcon
                icon={faInstagram}
                className="icon-ssm red mar-right-8"
              />
              <p className="red ">@healthyfoodmap_</p>
            </div>
          </a>
          <div className="mar-bottom-4"></div>
          <a href="mailto:healthyfoodmap@hotmail.com">
            <div className="flex align-center underline-hover text-wrap">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="icon-ssm red mar-right-8"
              />
              <p className="red ">healthyfoodmap@hotmail.com</p>
            </div>
          </a>
        </div>
      </div>
      <Link href="/login">
        <p className="red underline ">Create new account</p>
      </Link>
    </Cont>
  );
};

export default Footer;
