import styled from "styled-components";
import COLORS from "../../data/colors";
const Cont = styled.div`
  position: absolute;
  width: 100%;
  background: #fff;
  border: 1px solid ${(props) => props.colors.darkPink};
  border-bottom: 8px solid ${(props) => props.colors.darkPink};
  padding: 16px;
  z-index: 1;

  .tag-text {
    border: 1px solid ${(props) => props.colors.darkPink};
    background-color: ${(props) => props.colors.tan};
    padding: 8px 4px;
  }
`;

const TagNotification = ({ runFunction, hideNotification, tagText }) => {
  return (
    <Cont className="box-shadow" colors={COLORS}>
      <div className="mar-bottom-32 flex flex-wrap align-center justify-center">
        <p className="black inline-block mar-right-8">Did You Mean</p>
        <h3 className="tag-text inline-block mar-right-8">{tagText}</h3>
        <h3 className="inline-block black ">?</h3>
      </div>
      <div className="flex space-between">
        <div onClick={runFunction} className="blue-btn-one">
          <h3>YES</h3>
        </div>
        <div onClick={hideNotification} className="red-btn-one">
          <h3>NO</h3>
        </div>
      </div>
    </Cont>
  );
};

export default TagNotification;
