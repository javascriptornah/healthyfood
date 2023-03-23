import { useState, useEffect } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Signup from "./Signup";
import SignupPopup from "../popups/SignupPopup";
import supabase from "../../utils/supabaseClient";

const Cont = styled.div``;
const Header = () => {
  const [showLogin, setShowLogin] = useState(false);

  const displayLogin = () => {
    setShowLogin(true);
  };
  const hideLogin = () => {
    setShowLogin(false);
  };
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (session.session != null) {
        setUser(session.session.user);
      }
    };
    fetchUser();
  }, []);
  console.log(user);
  return (
    <Cont colors={COLORS} className="mar-bottom-48">
      {showLogin && <SignupPopup hideFunction={hideLogin} />}

      <h3 className="underline text-shadow-red mar-bottom-16">
        FOOD SOURCING FORUM
      </h3>
      {user !== null ? (
        <p>
          You are currently signed in as{" "}
          <span className="light-blue-2">{user.username} </span>
        </p>
      ) : (
        <Signup showFunction={displayLogin} />
      )}
    </Cont>
  );
};

export default Header;
