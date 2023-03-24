import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";

const Cont = styled.div`
  border: 1px dotted rgba(0, 0, 0, 0.1);
  height: 120px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  @property --x {
    syntax: "<percentage>";
    inherits: false;
    initial-value: 0%;
  }
  @keyframes colorChange {
    0% {
      --x: 0%;
    }
    50% {
      --x: 50%;
    }
    100% {
      --x: 100%;
    }
  }

  & * {
    pointer-events: none;
  }
  .upload-state {
    background: rgb(39, 143, 253);
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle,
      rgba(39, 143, 253, 1) 2%,
      rgba(124, 187, 254, 1) 23%,
      rgba(255, 255, 255, 1) 44%,
      rgba(124, 187, 254, 1) 74%,
      rgba(39, 143, 253, 1) 100%
    );
    background: radial-gradient(
      ellipse farthest-corner at var(--x) 0%,
      rgba(39, 143, 253, 1) 0%,
      rgba(124, 187, 254, 1) 8%,
      rgba(255, 255, 255, 1) 25%,
      rgba(124, 187, 254, 1) 62.5%,
      rgba(39, 143, 253, 1) 100%
    );
    animation: colorChange 5s infinite alternate;
  }
  .center {
    flex-direction: row;
    text-align: center;
  }
`;

const ImageDropper = () => {
  const [hoverState, setHoverState] = useState(false);
  const dropFile = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <Cont
      colors={COLORS}
      onDragOver={() => {}}
      onDragEnter={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setHoverState(true);
      }}
      onDragLeave={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setHoverState(false);
      }}
      onDrop={dropFile}
    >
      {hoverState ? (
        <div className="upload-state"></div>
      ) : (
        <div className="flex-inline center flex-wrap align-center justify-center">
          <p className="light-blue-2  mar-right-16 mar-bottom-8">
            Drag and drop image or{" "}
          </p>
          <div className="blue-btn-one mar-bottom-8 ">
            <p className="bold">Upload</p>
          </div>
        </div>
      )}
    </Cont>
  );
};

export default ImageDropper;
