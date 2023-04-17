import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import COLORS from "../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faComment,
  faLocationDot,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Dropdown from "./navbar/Dropdown.js";
import supabase from "../utils/supabaseClient";

const Cont = styled.div`
  .nav-desktop {
    background-color: ${(props) => props.colors.tan};
    padding: 16px 32px 8px 32px;
    position: relative;
    overflow: hidden;
    @media only screen and (max-width: 780px) {
      display: none;
    }
  }

  .grid-cont {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .splitter {
    width: 24px;
    height: 500%;
    background: ${(props) => props.colors.darkPink};
    margin-right: 8px;
    position: relative;
    top: 40px;
    transform: rotate(30deg);
    @media only screen and (max-width: 985px) {
      display: none;
    }
  }
  .splitter-blue {
    width: 24px;
    height: 500%;
    background: ${(props) => props.colors.darkBlue};
    margin-right: 16px;
    position: relative;
    top: 40px;
    transform: rotate(30deg);
    @media only screen and (max-width: 985px) {
      display: none;
    }
  }
  .nav-section {
    display: flex;
    align-items: flex-end;
  }
  .food-section {
    padding-right: 40px;
  }
  .nav-mobile {
    @media only screen and (min-width: 780px) {
      display: none;
    }
    .nav-mobile-content {
      display: flex;
      background-color: ${(props) => props.colors.tan};
      align-items: center;
      justify-content: space-between;
      padding: 8px 16px;
    }
  }
  .menu-bars {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    border: 1px solid ${(props) => props.colors.darkPink};
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      border-color: ${(props) => props.colors.black};
      .red {
        color: ${(props) => props.colors.black};
      }
    }
  }
  .mobile-icon {
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-left: 16px;
    cursor: pointer;
    border: 1px solid ${(props) => props.colors.darkPink};
    &:hover {
      border: 2px solid ${(props) => props.colors.darkPink};
    }
    &:active {
      border: 2px solid ${(props) => props.colors.darkPink};
      box-shadow: none;
    }
  }
`;
const Navbar = () => {
  const [mobileActive, setMobileActive] = useState(false);

  const hideMobileActive = () => {
    setMobileActive(false);
  };

  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (session.session != null) {
        setUser(session.session.user);
      }
    };
    fetchUser();
  }, []);
  return (
    <Cont colors={COLORS} id="navbar">
      <div className="nav-desktop">
        <div className="flex mar-bottom-8">
          <Link href="/" className="no-color-link text-shadow-red mar-right-32">
            <Image
              src="/icons/logo_sm.png"
              width={68.333}
              height={43.666}
              quality="100"
            />
          </Link>
          {user !== null ? (
            <Link href="/account">
              <div className="inline-block black-btn mar-right-16">
                <h5>{user.user_metadata.username}</h5>
              </div>
            </Link>
          ) : (
            <Link href="/login">
              <div className="inline-block black-btn mar-right-16">
                <h5>Login</h5>
              </div>
            </Link>
          )}
          <Link href="/nutritionsearch">
            <div className="black-gradient-btn box-shadow flex-inline align-center">
              <FontAwesomeIcon
                icon={faSearch}
                className="icon-ssm blue mar-right-4"
              />
              <h5 className="blue">NUTRIENT SEARCH</h5>
            </div>
          </Link>
        </div>

        <div className="grid-cont">
          <div className="nav-section food-section">
            <Link href="/" className="no-color-link text-shadow-red">
              <h4 className=" mar-right-32 underline-hover">FOOD MAP</h4>
            </Link>
            <Link href="/" className="no-color-link text-shadow-red">
              <h5 className="mar-right-16 underline-hover">MAP</h5>
            </Link>
            <Link href="/forum" className="no-color-link text-shadow-red">
              <h5 className="mar-right-16 underline-hover">FORUM</h5>
            </Link>
            <Link href="/farmmap" className="no-color-link text-shadow-red">
              <h5 className="mar-right-16 underline-hover">2ND MAP</h5>
            </Link>
          </div>
          <div className="nav-section">
            <div className="splitter"></div>
            <div className="splitter-blue"></div>
            <Link href="/fishmap" className="text-shadow-blue">
              <h4 className="blue mar-right-32 underline-hover">
                {" "}
                FISH FINDER
              </h4>
            </Link>
            <Link href="/fishmap" className="text-shadow-blue">
              <h5 className="blue mar-right-16 underline-hover">MAP</h5>
            </Link>
            <Link href="/articles" className="text-shadow-blue">
              <h5 className="blue mar-right-16 underline-hover">ARTICLES</h5>
            </Link>
            <Link href="/datasearch" className="text-shadow-blue">
              <h5 className="blue mar-right-16 underline-hover">DATA SEARCH</h5>
            </Link>
          </div>
        </div>
      </div>

      <div className="nav-mobile">
        <div className="nav-mobile-content">
          <div className="flex align-center flex-wrap">
            <Link
              href="/"
              className="no-color-link text-shadow-red mar-right-16 mar-bottom-8"
            >
              <Image
                src="/icons/logo_sm.png"
                width={50}
                height={31.95}
                quality="100"
              />
            </Link>
            {user !== null ? (
              <Link href="/account">
                <h5 className="black text-shadow mar-bottom-8">
                  {user.user_metadata.username}
                </h5>
              </Link>
            ) : (
              <Link href="/login">
                <h5 className="black text-shadow mar-bottom-8">Sign Up</h5>
              </Link>
            )}
            <Link href="/nutritionsearch">
              <div className="mobile-icon box-shadow mar-bottom-8">
                <FontAwesomeIcon icon={faSearch} className="icon-ssm red" />
              </div>
            </Link>
            <Link href="/farmmap">
              <div className="mobile-icon box-shadow mar-bottom-8">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="icon-ssm red"
                />
              </div>
            </Link>
            <Link href="/forum">
              <div className="mobile-icon box-shadow mar-bottom-8">
                <FontAwesomeIcon icon={faComment} className="icon-ssm red" />
              </div>
            </Link>
          </div>
          <div
            onClick={() => setMobileActive(true)}
            className="menu-bars cursor mar-bottom-8"
          >
            <FontAwesomeIcon icon={faBars} className="icon-sm red" />
          </div>
        </div>
        <Dropdown
          mobileActive={mobileActive}
          hideMobileActive={hideMobileActive}
        />
      </div>
    </Cont>
  );
};

export default Navbar;
