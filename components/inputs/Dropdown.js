import { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";

const Cont = styled.div`
  .form__group {
    background-color: #fff;
  }
  .dropdown__selected {
    width: 172px;
  }
`;

const Dropdown = ({
  title,

  value,
  updateValue,
  defaultOptionLabel,
  DropdownComponent,
  name,
}) => {
  const [showDropdown, setShowDropdown] = useState(true);
  const dropdownEl = useRef();
  const handleClickOutside = useCallback((e) => {
    console.log(e.target.closest(".dropdown"));

    /* if (showDropdown && e.target.closest(".dropdown") !== dropdownEl.current) {
      setShowDropdown(false);
    } */
    if (
      !dropdownEl.current.contains(e.target) &&
      !e.target.classList.contains("dropdown__menu_item")
    ) {
      setShowDropdown(false);
    }
  });
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <Cont colors={COLORS}>
      <div className="form__group">
        <div className="dropdown relative" ref={dropdownEl}>
          <input
            name={title}
            type="hidden"
            value={value}
            onChange={(e) => updateValue(name, value)}
          />
          <div
            className="dropdown__selected"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <p>{value}</p>
          </div>
          {showDropdown && (
            <div className=" absolute dropdown-holder ">
              {DropdownComponent}
            </div>
          )}
        </div>
      </div>
    </Cont>
  );
};

export default Dropdown;
