import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faNewspaper,
  faComment,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import COLORS from "../../data/colors";
const Cont = styled.div`
  padding: 0;
  background-color: ${(props) => props.colors.tan};
  .title-specx {
    background-color: ${(props) => props.colors.offWhite};
    padding: 4px;
    border-bottom: 1px solid ${(props) => props.colors.darkBlue};
    border-radius: 8px 8px 0 0;
  }
  .bio {
    padding: 16px;
    padding-top: 0;
  }
  .info {
    border-top: 2px solid ${(props) => props.colors.darkPink};
    border-bottom: 2px solid ${(props) => props.colors.darkPink};
    padding: 8px 12px 0;
    background-color: ${(props) => props.colors.lightBeige};
  }
  .image-section {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .icon-med {
    justify-self: end;
  }
`;

const AccountPreview = ({
  username,
  bio,
  upvotes,
  posts,
  comments,
  links,
  user,
}) => {
  return (
    <Cont colors={COLORS} className="grey-border-2">
      <div className="padding-x-12 padding-y-8 image-section">
        <div></div>
        <div className="flex flex-column align-center">
          <div>
            <img
              src={`${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_PATH}${user.user_metadata.avatar_url}`}
            />
          </div>
          <p className="bold green cursor underline">Upload</p>
        </div>
        <FontAwesomeIcon icon={faGear} className="green icon-med cursor" />
      </div>
      <div className="padding-x-12 padding-y-8">
        <h5 className="mar-bottom-8">{username}</h5>
        <p className="bio">{bio}</p>
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
            <p className="contrast">{posts}</p>
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

      <div className="padding-16">
        <p className="bold mar-bottom-8">Links</p>
        {links.map((link, index) => {
          return (
            <p key={index} className="underline-hover">
              {" "}
              <Link href={link}>{link}</Link>
            </p>
          );
        })}
      </div>
    </Cont>
  );
};

export default AccountPreview;
