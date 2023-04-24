import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";

const Cont = styled.div`
  background-color: ${(props) => props.colors.lightBeige};
  border: 1px solid ${(props) => props.colors.grey};
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 8px;
  transition: opacity 0.25s ease;
  max-width: 300px;
  word-wrap: break-word;
`;

const Tooltip = ({ text, shown }) => {
  const [textCopy, setTextCopy] = useState(text);
  return (
    <Cont
      style={{ opacity: shown ? "1" : "0" }}
      colors={COLORS}
      className="box-shadow-2"
    >
      <p>{textCopy}</p>
    </Cont>
  );
};

export default Tooltip;
