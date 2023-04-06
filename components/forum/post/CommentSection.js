import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../data/colors";
import Comment from "./Comment";
const Cont = styled.div`
  padding: 0;
`;

const CommentSection = ({ comments, post_id }) => {
  const commentElems = comments.map((comment, index) => {
    console.log(comment);
    return (
      <Comment
        comment_id={comment.id}
        key={index}
        username={comment.username}
        content={comment.content}
        upvotes={comment.upvotes}
        downvotes={comment.downvotes}
        replies={[]}
        comment_user={comment.users}
        post_id={post_id}
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
