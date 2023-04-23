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

const Cont = styled.div``;

const Header = ({
  username,
  upvotes,
  posts,
  comments,
  links,
  bio,
  avatar_url,
}) => {
  return (
    <Cont colors={COLORS}>
      <Image
        src={`${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_PATH}/${avatar_url}`}
        width={140}
        height={140}
        style={{ objectFit: "cover" }}
      />
      <div className="flex">
        <h4 className="black mar-right-32">{username}</h4>

        <div className="tan-icon mar-right-16">
          <FontAwesomeIcon
            icon={faComment}
            className="icon-sm red mar-right-8"
          />
          <h5>Message</h5>
        </div>
        <div className="tan-icon">
          <FontAwesomeIcon icon={faUser} className="icon-sm red mar-right-8" />
          <h5>Add Friend</h5>
        </div>
      </div>
      <div className="flex space-between info flex-wrap mar-bottom-16">
        <div className="mar-bottom-8">
          <p className="bold">Upvotes</p>
          <div className="flex-inline align-center">
            <FontAwesomeIcon
              icon={faArrowUp}
              className="icon-ssm contrast mar-right-8"
            />
            <p className="contrast">{upvotes}</p>
          </div>
        </div>
        <div className="mar-bottom-8">
          <p className="bold">Posts</p>
          <div className="flex-inline align-center">
            <FontAwesomeIcon
              icon={faNewspaper}
              className="icon-ssm contrast mar-right-8"
            />
            <p className="contrast">{posts.length}</p>
          </div>
        </div>
        <div className="mar-bottom-8">
          <p className="bold">Comments</p>
          <div className="flex-inline align-center">
            <FontAwesomeIcon
              icon={faComment}
              className="icon-ssm contrast mar-right-8"
            />
            <p className="contrast">{comments}</p>
          </div>
        </div>
      </div>
    </Cont>
  );
};

export default Header;
