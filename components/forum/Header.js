import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Signup from "./Signup";
import SignupPopup from "../popups/SignupPopup";
const Cont = styled.div``;
const Header = () => {
  const [showLogin, setShowLogin] = useState(false);

  const displayLogin = () => {
    setShowLogin(true);
  };
  const hideLogin = () => {
    setShowLogin(false);
  };
  return (
    <Cont colors={COLORS} className="mar-bottom-32">
      {showLogin && <SignupPopup hideFunction={hideLogin} />}

      <h3 className="underline text-shadow-red mar-bottom-16">
        FOOD SOURCING FORUM
      </h3>
      <Signup showFunction={displayLogin} />
    </Cont>
  );
};

export default Header;
