import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../data/colors";
import supabase from "../../../utils/supabaseClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const Cont = styled.div`
  position: relative;
  background-color: ${(props) => props.colors.lightBlue};
  border-radius: 16px;
  width: 100%;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.colors.lightBlue2};
  }
`;

const Google = () => {
  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };
  return (
    <Cont
      colors={COLORS}
      className="flex align-center"
      onClick={signInWithGoogle}
    >
      <FontAwesomeIcon icon={faGoogle} className="white  icon-sm" />
      <p className="bold white flex-one">Continue with Google</p>
    </Cont>
  );
};

export default Google;
