import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../inputs/Tooltip";
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
  &:hover {
    background-color: ${(props) => props.colors.lightGrey3};
  }
  &:active {
    box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
      rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  }
`;

const LinkBio = ({ url, icon, text }) => {
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
  const [showToolTip, setShowToolTip] = useState(false);
  return (
    <Cont colors={COLORS} className="box-shadow relative link-elem">
      <div>
        <Tooltip text={`🔗${url}`} shown={showToolTip} />
        <Link href={url} target="_blank">
          <div
            className="flex align-center"
            onMouseOver={() => setShowToolTip(true)}
            onMouseOut={() => setShowToolTip(false)}
          >
            <FontAwesomeIcon
              style={{ color: colorMatch[icon] }}
              icon={linkObj[icon]}
              className="icon-med mar-right-8"
            />
            <p className="bold">{text}</p>
          </div>
        </Link>
      </div>
    </Cont>
  );
};

export default LinkBio;
