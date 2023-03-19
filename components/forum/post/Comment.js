import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../data/colors";
import ReactMarkdown from "react-markdown";

const Cont = styled.div`
  padding: 8px 12px;
  border-bottom: 1px solid ${(props) => props.colors.ultraLightGrey};
  overflow: auto;
  &:nth .grey-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: grey;
  }
  .avatar {
  }
  .x {
    float: left;
  }
  &:nth-of-type(2n) {
    background: ${(props) => props.colors.offWhite};
  }
`;

const Comment = ({ username, content, upvotes, downvotes }) => {
  return (
    <Cont colors={COLORS}>
      <div className="flex flex-column align-center avatar mar-right-32 x">
        <p className="green bold mar-bottom-8">{username}</p>
        <div className="grey-circle"></div>
      </div>
      <div>
        <ReactMarkdown className="markdown">{content}</ReactMarkdown>
      </div>
      <div>hello</div>
    </Cont>
  );
};

export default Comment;
