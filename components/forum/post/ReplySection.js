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
`;

const ReplySection = ({ username }) => {
  const [text, setText] = useState("");
  return (
    <Cont colors={COLORS}>
      <p>
        Comment as <span className="light-blue-2">{username}</span>
      </p>

      <Editor section={text} updateSection={setText} />
      <div className="mar-bottom-16"></div>
      <div className="blue-btn-one flex-inline justify-center align-center">
        <h5 className="mar-right-8">Comment</h5>
        <FontAwesomeIcon icon={faPaperPlane} className="white" />
      </div>
    </Cont>
  );
};

export default ReplySection;
