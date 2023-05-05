import { useState } from "react";
import styled from "styled-components";
import COLORS from "../data/colors";

const Cont = styled.div`
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;
  @media only screen and (max-width: 800px) {
    padding: 16px;
  }
  p {
    margin-bottom: 8px;
  }
`;

const Terms = () => {
  return (
    <Cont colors={COLORS}>
      <h3>Thank you for using Healthy Food Map!</h3>
      <div className="grey-line mar-bottom-16"></div>
      <p>
        At Healthyfoodmap, we strive to protect your data and keep you safe.
        That is why we have choosen Supabase as or other secure authentication
        providers to protect your precious user details.
      </p>

      <p>
        When you create an account with us we don't even have access to your
        password ourselves, we only recieve your email/username and an
        authentication token.
      </p>

      <p>
        We understand how important your data is so if you ever change your mind
        and would like to remove your account information, please email{" "}
        <a href="mailto:healthyfoodmap@hotmail.com">
          <span className="light-blue underline-hover mar-right-4">
            healthyfoodmap@hotmail.com
          </span>
        </a>
        stating you would like your account removed and we will be happy to
        help.
      </p>
    </Cont>
  );
};

export default Terms;
