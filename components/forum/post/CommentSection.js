import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../data/colors";
import Comment from "./Comment";
const Cont = styled.div`
  padding: 0;
`;

const CommentSection = ({ comments }) => {
  const commentElems = comments.map((comment) => {
    console.log(comment);
    return (
      <Comment
        username={comment.username}
        content={comment.content}
        upvotes={comment.upvotes}
        downvotes={comment.downvotes}
        replies={comment.replies}
      />
    );
  });
  return (
    <Cont colors={COLORS} className="grey-border">
      {commentElems}
    </Cont>
  );
};

export default CommentSection;
