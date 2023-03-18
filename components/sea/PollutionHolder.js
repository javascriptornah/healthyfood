import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Pollution from "./Pollution";
const Cont = styled.div``;

const PollutionHolder = ({ pollutionEvents }) => {
  const pollutionElems = pollutionEvents.map((pollution, index) => {
    return <Pollution key={index} pollution={pollution} />;
  });
  return (
    <Cont colors={COLORS}>
      <div className="flex justify-center">
        <div className="header-2 box-shadow-2 mar-bottom-48 center-inline">
          <h3 className="white">How Polluted Is It?</h3>
        </div>
      </div>
      <div>{pollutionElems}</div>
    </Cont>
  );
};

export default PollutionHolder;
