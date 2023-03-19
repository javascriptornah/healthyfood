import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faNewspaper,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import COLORS from "../../data/colors";
const Cont = styled.div`
  padding: 0;
  .title-specx {
    background-color: ${(props) => props.colors.offWhite};
    padding: 4px;
    border-bottom: 1px solid ${(props) => props.colors.darkBlue};
  }
  .bio {
    padding: 16px;
    padding-top: 0;
  }
  .info {
    border-top: 1px solid ${(props) => props.colors.darkBlue};
    border-bottom: 1px solid ${(props) => props.colors.darkBlue};
    padding: 8px 12px 0;
    background-color: ${(props) => props.colors.offWhite};
  }
`;

const AccountPreview = ({ username, bio, upvotes, posts, comments, links }) => {
  return (
    <Cont colors={COLORS} className="grey-border">
      <div className="center-inline title-specx mar-bottom-32">
        <h5 className="blue">{username}</h5>
      </div>
      <p className="bio">{bio}</p>
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
        {links.map((link) => {
          return (
            <p className="underline-hover">
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
