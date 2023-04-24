import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faClose } from "@fortawesome/free-solid-svg-icons";
import {
  faReddit,
  faYoutube,
  faDiscord,
  faTwitter,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
const Cont = styled.div`
  padding: 8px 12px;
  background-color: ${(props) => props.colors.lightBeige};
  display: inline-block;
  border-radius: 16px;
  margin-right: 16px;
  margin-bottom: 16px;
  .delete {
    background-color: #fff;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 50%;
    &:hover {
      background-color: ${(props) => props.colors.offWhite};
    }
    &:active {
      box-shadow: none;
      box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
        rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
    }
  }
`;

const LinkBio = ({ icon, text, deleteLink }) => {
  const [linkObj, setLinkObj] = useState({
    reddit: faReddit,
    youtube: faYoutube,
    discord: faDiscord,
    twitter: faTwitter,
    instagram: faInstagram,
    link: faLink,
    facebook: faFacebook,
  });
  const colorMatch = {
    reddit: "#FF5700",
    youtube: "#FF0000",
    discord: "#6a0dad",
    twitter: "#1DA1F2",
    instagram: "#f09433",
    link: "#BAB2B5",
    facebook: "#4267B2",
  };
  return (
    <Cont colors={COLORS} className="box-shadow">
      <div className="flex align-center">
        <FontAwesomeIcon
          style={{ color: colorMatch[icon] }}
          icon={linkObj[icon]}
          className="icon-med mar-right-8"
        />
        <p className="bold mar-right-8">{text}</p>
        <div className="delete box-shadow-2" onClick={deleteLink}>
          <FontAwesomeIcon icon={faClose} className="icon-sm black" />
        </div>
      </div>
    </Cont>
  );
};

export default LinkBio;
