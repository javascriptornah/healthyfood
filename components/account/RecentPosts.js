import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Post from "./Post";
const Cont = styled.div`
  padding: 0;
  .posts-holder {
    background-color: ${(props) => props.colors.tan};
    border-radius: 8px;
    padding: 8px 12px;
  }
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
    <Cont colors={COLORS} className="">
      <div className="red-title mar-bottom-16">
        <h4 className="mar-right-16">Forum Posts</h4>
        <p className="contrast bold">({posts.length})</p>
      </div>
      <div className="posts-holder box-shadow-2 grey-border-2">{postElems}</div>
    </Cont>
  );
};

export default RecentPosts;
