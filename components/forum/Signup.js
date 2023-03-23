import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import supabase from "../../utils/supabaseClient";

const Cont = styled.div`
  .black-btn,
  .white-btn {
    padding: 4px 12px;
  }
`;
const Signup = ({ showFunction }) => {
  return (
    <Cont colors={COLORS} className="opacity-anim">
      <div className="flex-inline align-end">
        <div className="mar-right-16">
          <p>Do you need an account?</p>
          <p className="mar-bottom-8">Please login or register</p>
          <input
            type="text"
            className="input-small mar-right-8"
            placeholder="username"
          />
          <input type="text" className="input-small" placeholder="password" />
        </div>
        <div>
          <div
            onClick={showFunction}
            className="white-btn mar-bottom-8 justify-start"
          >
            <h5>Register</h5>
          </div>
          <div className="black-btn">
            <h5>Login</h5>
          </div>
        </div>
      </div>
    </Cont>
  );
};

export default Signup;
