import { useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
const Cont = styled.div`
  .cont {
    background-color: ${(props) => props.colors.tan};
    padding: 4px 8px;
    border-radius: 8px;
  }

  input.input-small {
    max-width: 200px;
    width: 100%;
  }
  .cursor {
    position: relative;

    &:hover,
    &:active {
      p,
      .contrast {
        color: ${(props) => props.colors.black};
      }
      & > div {
        border: 1px solid ${(props) => props.colors.grey};
      }
    }
    &:active {
      & > div {
        border: 1px solid ${(props) => props.colors.black};
      }
    }
    & > div {
      overflow: hidden;
      border: 1px solid transparent;
      background-color: ${(props) => props.colors.lightBeige};
      border-radius: 4px;
      padding: 4px;
      p {
        font-size: 16px;
        max-width: 130px;
        overflow: hidden;
        white-space: nowrap;
        white-space: nowrap;
      }
    }
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

const CreatePostIcon = ({ forum, options }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownEl = useRef(null);

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
    { selected: true, text: forum },
    ...options.map((option) => {
      return {
        selected: false,
        text: option,
      };
    }),
  ]);

  const [selectedLine, setSelectedLine] = useState(forum);

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

  const lineElems = lines
    .filter((line) => line.selected == false)
    .map((line, index) => {
      return (
        <div
          className="line flex align-center"
          onClick={() => selectLine(line.text)}
          key={index}
        >
          <p>{line.text}</p>
        </div>
      );
    });
  console.log("?");
  console.log(lineElems);
  return (
    <Cont colors={COLORS} className="flex-inline flex-row">
      <div className="cont mar-right-8">
        <input type="text" className="input-small" placeholder="Create Post" />
      </div>

      <div ref={dropdownEl} className="cont cursor dropdown">
        <div
          onClick={() => setShowDropdown(true)}
          className="flex align-center"
        >
          <p className="contrast mar-right-8">/{selectedLine}</p>
          <FontAwesomeIcon icon={faChevronDown} className="icon-ssm contrast" />
        </div>
        {showDropdown && <div className="popup">{lineElems}</div>}
      </div>
    </Cont>
  );
};

export default CreatePostIcon;
