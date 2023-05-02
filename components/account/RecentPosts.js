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
  .overscroll {
    max-height: 800px;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.5rem !important;
    }
  }
`;

const RecentPosts = ({ posts, username }) => {
  console.log("usernameeeee");
  console.log(username);
  const postElems = posts.map((post, index) => {
    return (
      <Post
        key={index}
        id={post.id}
        title={post.title}
        forum={`${
          post.state_id?.name
            ? post.country_id?.name + ", "
            : post.country_id?.name
        } ${
          post.state_id?.name
            ? post.city_id?.name
              ? post.state_id?.name + ", "
              : post.state_id?.name
            : ""
        } ${post.city_id?.name ? post.city_id?.name + ", " : ""}`}
        username={username}
        content={post.content}
        views={post.page_views[0]?.view_count}
        comments={post.comments[0].count}
        upvotes={post.upvotes[0].count - post.downvotes[0].count}
        created_at={post.created_at}
      />
    );
  });
  return (
    <Cont colors={COLORS} className="">
      <div className="red-title mar-bottom-16">
        <h4 className="mar-right-16">Forum Posts</h4>
        <p className="contrast bold">({posts.length})</p>
      </div>
      <div className="posts-holder box-shadow-2 grey-border-2 overscroll">
        {postElems}
      </div>
    </Cont>
  );
};

export default RecentPosts;
