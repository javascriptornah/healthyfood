import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTurnUp,
  faComment,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
const Cont = styled.div`
  border-bottom: 1px solid ${(props) => props.colors.grey};
  background-color: ${(props) => props.colors.lightBeige};
  border-radius: 8px;
  transition: background-color 0.25s ease;
  &:active {
    box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
      rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  }
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.colors.lightGrey2};
    h5 {
      text-decoration: underline;
    }
  }
`;

const Post = ({ title, forum, username, content, views, comments }) => {
  return (
    <Cont colors={COLORS} className="box-shadow">
      <div>
        <div className="padding-x-12 padding-y-8">
          <div className="mar-bottom-16">
            <p className="bold inline-block mar-right-16 contrast">{forum}</p>
            <div className="inline-block">
              <p className="inline-block contrast mar-right-4">Posted by</p>
              <p className="inline-block green underline-hover">{username}</p>
            </div>
          </div>
          <h5 className="red mar-bottom-8">{title}</h5>
        </div>

        <div className="red-line mar-bottom-8"></div>
        <div className="padding-x-12 padding-y-8">
          <ReactMarkdown className="markdown mar-bottom-16">
            {content}
          </ReactMarkdown>
          <div className="flex space-between align-center">
            <div>
              <div className="flex-inline align-center mar-right-16">
                <FontAwesomeIcon
                  icon={faEye}
                  className="red icon-ssm mar-right-8"
                />
                <p className="bold red">{views} </p>
              </div>
              <div className="flex-inline align-center">
                <FontAwesomeIcon
                  icon={faComment}
                  className="red icon-ssm mar-right-8"
                />
                <p className="bold red">{comments} </p>
              </div>
            </div>
            <div>
              <FontAwesomeIcon
                style={{ transform: "rotate(90deg)" }}
                icon={faArrowTurnUp}
                className="icon-ssm red"
              />
              <p className="bold"></p>
            </div>
          </div>
        </div>
      </div>
    </Cont>
  );
};

export default Post;
