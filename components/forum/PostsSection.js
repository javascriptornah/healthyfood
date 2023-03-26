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
`;

const PostsSection = ({ title, posts }) => {
  /*
  const [postLines, setPostLines] = useState(
    posts.map((post, index) => {
      return (
        <PostLine
          key={index}
          title={post.title}
          username={post.poster}
          forum={post.forum}
          date={post.date}
        />
      );
    })
  ); */

  return (
    <Cont colors={COLORS}>
      <div className="title-spec">
        <h5 className="red text-shadow-red">{title}</h5>
      </div>
      <div>{/*postLines*/}</div>
    </Cont>
  );
};

export default PostsSection;
