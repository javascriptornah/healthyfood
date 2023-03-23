import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faEye } from "@fortawesome/free-solid-svg-icons";
const Cont = styled.div`
  padding: 8px 12px;
  border-bottom: 1px solid ${(props) => props.colors.grey};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.colors.lightGrey2};
    border-bottom: 1px solid ${(props) => props.colors.black};
  }
`;

const Post = ({ title, forum, username, content, views, comments }) => {
  return (
    <Cont colors={COLORS}>
      <div>
        <div className="mar-bottom-16">
          <p className="bold inline-block mar-right-16">{forum}</p>
          <div className="inline-block">
            <p className="inline-block contrast mar-right-4">Posted by</p>
            <p className="inline-block green underline-hover">{username}</p>
          </div>
        </div>
        <h5 className="contrast mar-bottom-16">{title}</h5>
        <ReactMarkdown className="markdown mar-bottom-16">
          {content}
        </ReactMarkdown>
        <div className="flex space-between">
          <div>
            <div className="flex-inline align-center mar-right-16">
              <FontAwesomeIcon
                icon={faEye}
                className="black icon-ssm mar-right-8"
              />
              <p className="bold">{views} </p>
            </div>
            <div className="flex-inline align-center">
              <FontAwesomeIcon
                icon={faComment}
                className="black icon-ssm mar-right-8"
              />
              <p className="bold">{comments} </p>
            </div>
          </div>
          <div>
            <FontAwesomeIcon icon = {faArrow}
          </div>
        </div>
      </div>
    </Cont>
  );
};

export default Post;
