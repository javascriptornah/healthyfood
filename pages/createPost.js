import { useState } from "react";
import styled from "styled-components";
import COLORS from "../data/colors";
import Editor from "../components/Editor";

const Cont = styled.div`
  padding-top: 40px;
  width: 90%;
  margin: 0 auto;
  .mde__textarea {
    height: 30vh;
    background-color: ${(props) => props.colors.lightGrey2};
    &:focus {
      background-color: white;
    }
  }
`;

const CreatePost = () => {
  return (
    <Cont colors={COLORS}>
      <h5 className="light contrast mar-bottom-8">CREATE POST</h5>
      <div className="grey-line mar-bottom-32"></div>
      <input
        placeholder="Title"
        type="text"
        className="white-input mar-bottom-16"
      />
      <Editor />
    </Cont>
  );
};

export default CreatePost;
