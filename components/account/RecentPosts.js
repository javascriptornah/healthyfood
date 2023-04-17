import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Post from "./Post";
const Cont = styled.div`
  padding: 0;
`;

const RecentPosts = ({ posts }) => {
  const postElems = posts.map((post, index) => {
    return (
      <Post
        key={index}
        title={post.title}
        forum={post.forum}
        username={post.username}
        content={post.content}
        views={post.views}
        comments={post.comments}
      />
    );
  });
  return (
    <Cont colors={COLORS} className="grey-border-2">
      {postElems}
    </Cont>
  );
};

export default RecentPosts;
