import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faUser,
  faArrowUp,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import LinkBio from "../account/LinkBio";

const Cont = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  .link-elem {
    margin-right: 0;
  }
`;

const Header = ({
  username,
  upvotes,
  posts,
  comments,
  links,
  bio,
  avatar_url,
}) => {
  const [linkElems, setLinkElems] = useState(
    links.map((link) => {
      return <LinkBio url={link.link} text={link.name} icon={link.icon} />;
    })
  );
  return (
    <Cont colors={COLORS}>
      <div>
        <Image
          src={`${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_PATH}/${avatar_url}`}
          width={140}
          height={140}
          style={{ objectFit: "cover", borderRadius: "50%" }}
          alt="Profile pic"
        />
      </div>

      <div>
        <div className="flex align-start mar-bottom-32">
          <h4 className="black mar-right-32">{username}</h4>

          <div className="tan-icon mar-right-16">
            <FontAwesomeIcon
              icon={faComment}
              className="icon-sm red mar-right-8"
            />
            <h5>Message</h5>
          </div>
          <div className="tan-icon">
            <FontAwesomeIcon
              icon={faUser}
              className="icon-sm red mar-right-8"
            />
            <h5>Add Friend</h5>
          </div>
        </div>
        <div className=" mar-bottom-16">
          <div className="flex space-between info flex-wrap mar-bottom-32">
            <div className="mar-bottom-8">
              <p className="bold mar-bottom-4">Upvotes</p>
              <div className="flex-inline align-center">
                <FontAwesomeIcon
                  icon={faArrowUp}
                  className="icon-ssm contrast mar-right-8"
                />
                <p className="contrast">{upvotes}</p>
              </div>
            </div>
            <div className="mar-bottom-8">
              <p className="bold mar-bottom-4">Posts</p>
              <div className="flex-inline align-center">
                <FontAwesomeIcon
                  icon={faNewspaper}
                  className="icon-ssm contrast mar-right-8"
                />
                <p className="contrast">{posts.length}</p>
              </div>
            </div>
            <div className="mar-bottom-8">
              <p className="bold mar-bottom-4">Comments</p>
              <div className="flex-inline align-center">
                <FontAwesomeIcon
                  icon={faComment}
                  className="icon-ssm contrast mar-right-8"
                />
                <p className="contrast">{comments}</p>
              </div>
            </div>
          </div>
          <p>{bio}</p>
        </div>
      </div>

      <div className=" flex  flex-column align-end ">{linkElems}</div>
    </Cont>
  );
};

export default Header;
