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
  justify-content: space-between;
  .underline-hover {
    text-decoration-color: ${(props) => props.colors.darkPink};
  }
  .contact {
    border-right: 1px solid ${(props) => props.colors.darkPink};
    border-left: 1px solid ${(props) => props.colors.darkPink};
    padding-left: 16px;
    padding-right: 16px;
  }
`;

const Footer = () => {
  return (
    <Cont colors={COLORS}>
      <div>
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
        <div className="flex">
          <div className="contact mar-right-32">
            <h5 className="mar-bottom-8">Contact</h5>
            <a
              href="https://www.instagram.com/healthyfoodmap_/"
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
              <div className="flex align-center underline-hover">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="icon-ssm red mar-right-8"
                />
                <p className="red ">healthyfoodmap@hotmail.com</p>
              </div>
            </a>
          </div>
          <Link href="/login">
            <p className="red underline">Create new account</p>
          </Link>
        </div>
      </div>
    </Cont>
  );
};

export default Footer;
