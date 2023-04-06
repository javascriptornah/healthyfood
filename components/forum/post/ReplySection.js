import { useState } from "react";
import styled from "styled-components";
import Editor from "../../Editor";
import COLORS from "../../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Cont = styled.div`
  .blue-btn-one {
    @media only screen and (max-width: 400px) {
      width: 100%;
    }
  }
  .mde__textarea {
    background-color: ${(props) => props.colors.lightGrey3};
    &:focus {
      background-color: #fff;
    }
  }
`;

const ReplySection = ({ username, createPostCommentFunctional }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <Cont colors={COLORS}>
      <p>
        Comment as <span className="light-blue-2">{username}</span>
      </p>

      <Editor section={text} updateSection={setText} />
      <div className="mar-bottom-16"></div>
      {loading ? (
        <div class="lds-ring-green">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <div className="flex flex-end">
          <div
            onClick={() =>
              createPostCommentFunctional(text, setLoading, setText)
            }
            className="blue-btn-one flex-inline justify-center align-center"
          >
            <h5 className="mar-right-8">Comment</h5>
            <FontAwesomeIcon icon={faPaperPlane} className="white" />
          </div>
        </div>
      )}
    </Cont>
  );
};

export default ReplySection;
