import { useEffect, useState } from "react";
import styled from "styled-components";
import COLORS from "../../../data/colors";
import Comment from "./Comment";
const Cont = styled.div`
  padding: 0;
`;

const CommentSection = ({ comments }) => {
  const [renderCount, setRenderCount] = useState(0);
  const [commentElems, setCommentElems] = useState([]);

  useEffect(() => {
    let commentElemsTemp = [];
    for (let i = renderCount; i < renderCount + 20; i++) {
      commentElemsTemp.push(
        <Comment
          key={i}
          username={comments[i].username}
          content={comments[i].content}
          upvotes={comments[i].upvotes}
          downvotes={comments[i].downvotes}
          replies={comments[i].replies}
        />
      );
    }
    setCommentElems(commentElemsTemp);
  }, [renderCount]);

  return (
    <Cont colors={COLORS} className="grey-border">
      <div>{commentElems}</div>
    </Cont>
  );
};

export default CommentSection;
