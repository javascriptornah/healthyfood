import { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import COLORS from "../../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faC,
  faChevronDown,
  faCalendar,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
const Cont = styled.div`
  border: 1px solid ${(props) => props.colors.grey};
  padding: 4px 8px;
  cursor: pointer;
  position: relative;
  background-color: ${(props) => props.colors.midBeige};
  &:hover {
    border: 1px solid ${(props) => props.colors.black};
  }
  .popup {
    position: absolute;
    right: 0;
    top: 100%;
    width: 160px;
    padding: 0;
    .line {
      border-bottom: 1px solid ${(props) => props.colors.grey};
      padding: 4px 8px;
      &:hover {
        background-color: ${(props) => props.colors.midBeige};
      }
    }
  }
`;
const SortIcon = () => {
  const dropdownEl = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const handleClickOutside = useCallback(
    (e) => {
      if (
        showDropdown &&
        e.target.closest(".dropdown") !== dropdownEl.current
      ) {
        setShowDropdown(false);
      }
    },
    [showDropdown, setShowDropdown, dropdownEl]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  const [lines, setLines] = useState([
    { selected: true, text: "recent", icon: faCalendar },
    { selected: false, text: "oldest", icon: faCalendar },
    { selected: false, text: "views (highest)", icon: faEye },
    { selected: false, text: "views (lowest)", icon: faEye },
  ]);

  const [selectedLine, setSelectedLine] = useState("recent");

  const selectLine = (text) => {
    setShowDropdown(false);
    setLines((prev) => {
      return prev.map((line) => {
        if (line.text == text) {
          return {
            ...line,
            selected: true,
          };
        }
        return {
          ...line,
          selected: false,
        };
      });
    });
  };

  useEffect(() => {
    let newLine = lines.find((line) => line.selected);

    setSelectedLine((prev) => {
      return newLine.text;
    });
  }, [lines]);
  console.log(selectedLine);
  const lineElems = lines
    .filter((line) => line.selected == false)
    .map((line) => {
      return (
        <div
          className="line flex align-center"
          onClick={() => selectLine(line.text)}
        >
          <FontAwesomeIcon
            icon={line.icon}
            className="black icon-sssm mar-right-8"
          />
          <p>{line.text}</p>
        </div>
      );
    });

  return (
    <Cont colors={COLORS} ref={dropdownEl} className=" dropdown">
      <div
        className="flex-inline align-center"
        onClick={() => setShowDropdown(true)}
      >
        <p className="bold mar-right-4">{selectedLine}</p>
        <FontAwesomeIcon icon={faChevronDown} className="icon-sssm black" />
      </div>
      {showDropdown && <div className="popup">{lineElems}</div>}
    </Cont>
  );
};

export default SortIcon;
