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
`;

const ImageDropper = () => {
  return (
    <Cont colors={COLORS}>
      <div>
        <p className="light-blue-2 inline-block mar-right-16">
          Drag and drop image or{" "}
        </p>
        <div className="blue-btn-one inline-block">
          <p className="bold">Upload</p>
        </div>
      </div>
    </Cont>
  );
};

export default ImageDropper;
