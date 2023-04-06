import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import PostLine from "./PostLine";
const Cont = styled.div`
  .title-spec {
    border: 1px solid ${(props) => props.colors.darkPink};
    padding: 4px 8px;
    background-color: ${(props) => props.colors.tan};
  }
  .posts {
    max-height: 600px;
    overflow: auto;
    @media only screen and (max-width: 600px) {
      max-height: 50vh;
    }
  }
`;

const PostsSection = ({ title, posts }) => {
  console.log("posts");
  console.log(posts);
  const [postLines, setPostLines] = useState(
    posts.map((post, index) => {
      return (
        <PostLine
          key={index}
          id={post.id}
          title={post.title}
          username={post.user_id.username}
          forum={`${post.country_id.name}, ${
            post.state_id?.name ? post.state_id?.name + "," : ""
          } ${post.city_id?.name || ""} `}
          date={post.created_at}
        />
      );
    })
  );

  return (
    <Cont colors={COLORS}>
      <div className="title-spec">
        <h5 className="red text-shadow-red">{title}</h5>
      </div>
      <div className="posts small-scrollbar">{postLines}</div>
    </Cont>
  );
};

export default PostsSection;
