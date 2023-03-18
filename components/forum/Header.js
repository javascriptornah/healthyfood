import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Signup from "./Signup";

const Cont = styled.div``;
const Header = () => {
  return (
    <Cont colors={COLORS} className="mar-bottom-32">
      <h3 className="underline text-shadow-red mar-bottom-16">
        FOOD SOURCING FORUM
      </h3>
      <Signup />
    </Cont>
  );
};

export default Header;
