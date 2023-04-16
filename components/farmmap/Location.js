import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Select from "../google/Select";
const Cont = styled.div`
  display: inline-block;
  margin-bottom: 32px;
  @media only screen and (max-width: 300px) {
    .dropdown__selected,
    .dropdown__menu {
      width: 100% !important;
      min-width: 0;
    }
  }
  input {
    min-width: 0px !important;
  }
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

    border-radius: 8px;
    &:hover {
      border: 1px solid ${(props) => props.colors.black};
    }
  }
  .select-line {
    margin-right: 32px;
    @media only screen and (max-width: 400px) {
      margin-right: 0;
    }
  }
`;

const Location = ({
  countries,
  country,
  updateRegion,
  options,
  setOptions,
  states,
  state,
  setStates,
  city,
  cities,
  setCities,
}) => {
  return (
    <Cont colors={COLORS}>
      <h5 className="mar-bottom-16">LOCATION</h5>
      <div className="tan-container flex flex-wrap justify-center box-shadow">
        <div className="select-line mar-bottom-16">
          <h5 className="light contrast mar-bottom-16">COUNTRY</h5>
          <Select
            regions={countries}
            value={country}
            updateValue={updateRegion}
            searchPlaceholder="Search"
            options={options}
            setOptions={setOptions}
            name="country"
          />
        </div>
        <div className="select-line mar-bottom-16">
          <h5 className="light contrast mar-bottom-16">STATE</h5>
          <Select
            regions={states}
            value={state}
            updateValue={updateRegion}
            options={states}
            setOptions={setStates}
            name="state"
          />
        </div>
        <div className="select-line mar-bottom-16">
          <h5 className="light contrast mar-bottom-16">CITY</h5>
          <Select
            regions={cities}
            value={city}
            updateValue={updateRegion}
            searchPlaceholder="Search"
            options={cities}
            setOptions={setCities}
            name="city"
          />
        </div>
      </div>
    </Cont>
  );
};

export default Location;
