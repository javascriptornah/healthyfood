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
      border: 1px solid transparent;
      background-color: ${(props) => props.colors.lightBeige};
      border-radius: 4px;
      padding: 4px;
      p {
        font-size: 16px;
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
  return (
    <Cont colors={COLORS} className="flex-inline flex-row">
      <div className="cont mar-right-8">
        <input type="text" className="input-small" placeholder="Create Post" />
      </div>

      <div ref={dropdownEl} className="cont cursor dropdown">
        <div className="flex align-center">
          <p className="contrast mar-right-8">{forum}</p>
          <FontAwesomeIcon icon={faChevronDown} className="icon-ssm contrast" />
        </div>
      </div>
    </Cont>
  );
};

export default CreatePostIcon;
