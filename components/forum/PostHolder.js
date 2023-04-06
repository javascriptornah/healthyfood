import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import FullPostLine from "./FullPostLine";
import SortIcon from "./icons/SortIcon";
const Cont = styled.div`
  .title-spec {
    border: 1px solid ${(props) => props.colors.darkPink};
    padding: 4px 8px;
    background-color: ${(props) => props.colors.tan};
  }
`;

const PostsSection = ({ title, posts }) => {
  console.log(posts);

  const [postLines, setPostLines] = useState(
    posts.map((post, index) => {
      return (
        <FullPostLine
          id={post.id}
          key={index}
          title={post.title}
          username={post.user_id.username}
          forum={post.city_id?.name}
          date={post.created_at}
          replies={post.comments[0].count}
          views={200}
          lastComment={post.lastComment}
          region="province"
          province={title}
        />
      );
    })
  );
  return (
    <Cont colors={COLORS}>
      <div className="title-spec flex space-between align-center">
        <h5 className="red text-shadow-red">{title}</h5>
        <SortIcon />
      </div>
      <div>{postLines}</div>
    </Cont>
  );
};

export default PostsSection;
