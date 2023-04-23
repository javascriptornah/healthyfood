import Link from "next/link";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowTurnUp,
  faUser,
  faSearch,
  faLocationDot,
  faNewspaper,
  faComment,
  faMapPin,
} from "@fortawesome/free-solid-svg-icons";
const Cont = styled.div`
  background: rgb(18, 60, 105);
  background: ${(props) => props.colors.tan};
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  transform: translateY(-100%);
  transition: transform 0.5s ease, visibility 0.5s ease;
  z-index: 6;
  padding: 8px 16px;
  .line {
    padding: 4px;
    border-bottom: 2px solid ${(props) => props.colors.grey};
    &:hover {
      background-color: ${(props) => props.colors.offWhite};
      .white {
        color: ${(props) => props.colors.darkBlue} !important;
        text-shadow: 3px 8px 7px rgba(0, 0, 0, 0.61);
      }
    }
  }
  h4 {
    text-decoration: none !important;
  }
  .grey-line {
    width: 100%;
    height: 12px;
    background-color: ${(props) => props.colors.grey};
    margin-top: 32px;
    margin-bottom: 32px;
  }

  .icon-holder {
    width: 48px;
    height: 48px;
    border: 2px solid ${(props) => props.colors.darkPink};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    background-color: transparent;
    transition: background-color 0.25s ease;
    margin-left: auto;
    &:hover {
      background-color: ${(props) => props.colors.darkPink};
      .red {
        color: ${(props) => props.colors.tan};
      }
    }
  }
`;

const Dropdown = ({ hideMobileActive, mobileActive }) => {
  return (
    <Cont
      colors={COLORS}
      style={{
        transform: mobileActive ? "translateY(0)" : "translateY(-100%)",
        visibility: mobileActive ? "visible" : "hidden",
      }}
    >
      <div
        onClick={hideMobileActive}
        className="icon-holder box-shadow-white cursor"
      >
        <FontAwesomeIcon icon={faArrowTurnUp} className="icon-sm red" />
      </div>
      <Link onClick={hideMobileActive} href="/account">
        <div className="flex line align-center ">
          <h4 className=" text-shadow-white light mar-right-8">account</h4>
          <FontAwesomeIcon icon={faUser} className="red icon-sm" />
        </div>
      </Link>

      <section>
        <Link onClick={hideMobileActive} href="/">
          <div className="line flex space-between align-center">
            <div className="flex-inline align-center">
              <h4 className=" text-shadow-white light mar-right-8">
                food finder
              </h4>
              <FontAwesomeIcon icon={faMapPin} className="red icon-ssm" />
            </div>
            <FontAwesomeIcon icon={faArrowRight} className="red icon-ssm" />
          </div>
        </Link>
        <Link onClick={hideMobileActive} href="/forum">
          <div className="line flex space-between align-center">
            <div className="flex-inline align-center line-cont">
              <h4 className=" text-shadow-white light mar-right-8">forum</h4>
              <FontAwesomeIcon icon={faComment} className="red icon-ssm" />
            </div>
            <FontAwesomeIcon icon={faArrowRight} className="red icon-ssm" />
          </div>
        </Link>

        <Link onClick={hideMobileActive} href="/articles">
          <div className="line flex space-between align-center">
            <div className="flex-inline align-center">
              <h4 className=" text-shadow-white light mar-right-8">articles</h4>
              <FontAwesomeIcon icon={faNewspaper} className="red icon-sm" />
            </div>
            <FontAwesomeIcon icon={faArrowRight} className="red icon-ssm" />
          </div>
        </Link>
        <Link onClick={hideMobileActive} href="/nutrition">
          <div className="line flex space-between align-center">
            <div className="flex-inline align-center">
              <h4 className=" text-shadow-white light mar-right-8">
                nutrition
              </h4>
              <FontAwesomeIcon icon={faSearch} className="red icon-sm" />
            </div>
            <FontAwesomeIcon icon={faArrowRight} className="red icon-ssm" />
          </div>
        </Link>
      </section>

      <div className="grey-line"></div>
    </Cont>
  );
};

export default Dropdown;
