import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import {
  faReddit,
  faYoutube,
  faDiscord,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
const Cont = styled.div`
  padding: 8px 12px;
  background-color: ${(props) => props.colors.lightBeige};

  border-radius: 16px;
  &:active {
    box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
      rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  }
`;

const LinkBio = ({ url, icon, text, color }) => {
  const [linkObj, setLinkObj] = useState({
    reddit: faReddit,
    youtube: faYoutube,
    discord: faDiscord,
    twitter: faTwitter,
    instagram: faInstagram,
    link: faLink,
  });
  return (
    <Cont colors={COLORS} className="box-shadow">
      <Link href={url} target="_blank">
        <div className="flex align-center">
          <FontAwesomeIcon
            style={{ color: color }}
            icon={linkObj[icon]}
            className="icon-med mar-right-8"
          />
          <p className="bold">{text}</p>
        </div>
      </Link>
    </Cont>
  );
};

export default LinkBio;
