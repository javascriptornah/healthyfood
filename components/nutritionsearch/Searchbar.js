import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Select from "../google/Select";
const Cont = styled.div`
  .dropdown {
    border: none;
    &__menu {
      border: 1px solid ${(props) => props.colors.grey};
    }
    &__menu_search {
      border: 1px solid ${(props) => props.colors.darkBlue};
    }
  }
  .dropdown__selected {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    background: #fff;
    border: 1px solid ${(props) => props.colors.grey};
    border-radius: 8px;
    &:hover {
      border: 1px solid ${(props) => props.colors.black};
    }
  }
  .small-scrollbar {
    ::-webkit-scrollbar {
      background: ${(props) => props.colors.offWhite};
    }
    ::-webkit-scrollbar-thumb {
      background: ${(props) => props.colors.darkBlue};
      &:hover {
        background: ${(props) => props.colors.lightBlue};
      }
    }
  }
`;

const Searchbar = ({ text, updateText }) => {
  const [categories, setCategories] = useState([
    "All Food Categories",
    "Beef",
    "Dairy and Eggs",
    "Fish",
    "Poultry",
    "Lamb, Veal and Game",
    "Pork",
    "Fruits and Fruit Juices",
    "Grains and Starches",
  ]);
  const [categoriesCopy, setCategoriesCopy] = useState([
    "All Food Categories",
    "Beef",
    "Dairy and Eggs",
    "Fish",
    "Poultry",
    "Lamb, Veal and Game",
    "Pork",
    "Fruits and Fruit Juices",
    "Grains and Starches",
  ]);
  const [value, setValue] = useState("All Food Categories");
  const updateValue = (val) => {
    setValue(val);
  };
  return (
    <Cont colors={COLORS}>
      <div className="search-bar mar-bottom-8 box-shadow-2 flex align-center">
        <FontAwesomeIcon
          icon={faSearch}
          className="icon-ssm blue mar-right-16"
        />
        <form className="inline-block mar-right-8 flex flex-one">
          <input
            type="text"
            value={text}
            onChange={updateText}
            placeholder="steak... eggs"
            name="products"
          />
        </form>
        <Select
          regions={categories}
          name="category"
          value={value}
          updateValue={updateValue}
          options={categoriesCopy}
          setOptions={setCategoriesCopy}
        />
      </div>
    </Cont>
  );
};

export default Searchbar;