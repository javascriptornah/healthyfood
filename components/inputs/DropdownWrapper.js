import { useState, useRef } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const Cont = styled.div`
  border: 1px solid ${(props) => props.colors.darkPink};
  border-radius: 8px;
  margin-bottom: 32px;
  .header-spec {
    border-bottom: 1px solid ${(props) => props.colors.darkPink};
    padding: 8px;
    background-color: #fff;
    cursor: pointer;
    border-radius: 8px;
    background: rgb(232, 214, 206);
    background: linear-gradient(
      90deg,
      rgba(232, 214, 206, 1) 0%,
      rgba(255, 255, 255, 1) 55%,
      rgba(232, 214, 206, 1) 100%
    );

    .spinner {
      transition: transform 0.5s ease, font-size 0.5s ease;
    }
    &:hover {
      background: #fff;
      .spinner {
        transform: rotate(180deg);
        font-size: 28px;
      }
    }
  }
  .accordion-content {
    transition: padding 0.5s ease;
  }
`;

const DropdownWrapper = ({ children, title }) => {
  const content = useRef(null);
  const [visible, setVisible] = useState(false);
  const [height, setHeight] = useState("0px");
  const toggleVisibility = () => {
    setHeight(visible ? "0px" : `${content.current.scrollHeight + 32}px`);
    setVisible((prev) => {
      return !prev;
    });
    circleRef.current.classList.toggle("opened");
    circleRef2.current.classList.toggle("opened");
  };

  const circleRef = useRef(null);
  const circleRef2 = useRef(null);

  return (
    <Cont colors={COLORS} className="box-shadow">
      <div
        className="header-spec flex align-center justify-center"
        onClick={toggleVisibility}
      >
        <div className="mar-right-16">
          <h5 className="mar-right-4 inline-block">{title}</h5>
          <h5 className="light contrast inline-block">(optional)</h5>
        </div>
        <div>
          <div class="circle-plus closed" ref={circleRef}>
            <div class="circle">
              <div class="horizontal"></div>
              <div class="vertical"></div>
            </div>
          </div>
          <div class="circle-plus-two closed" ref={circleRef2}>
            <div class="circle">
              <div class="horizontal"></div>
              <div class="vertical"></div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{ height: height, padding: visible ? "16px" : "0px" }}
        className="accordion-content "
        ref={content}
      >
        {children}
      </div>
    </Cont>
  );
};

export default DropdownWrapper;
