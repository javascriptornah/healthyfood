import { useState, useEffect } from "react";
import styled from "styled-components";
import COLORS from "../data/colors";
import supabase from "../utils/supabaseClient";
const Cont = styled.div`
  .content-holder {
    background: #fff;
    width: 90%;
    margin: auto;
    border-radius: 8px;
    padding: 16px;
    @media only screen and (max-width: 600px) {
      width: 100%;
      border-radius: 0px;
    }
  }
`;

const EditAccount = () => {
  const [user, setUser] = useState(null);

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (session.session != null) {
        setUser(session.session.user);
        console.log("kap");
        console.log(session.session);
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    };
    fetchUser();
  }, []);
  const meta = {
    title: "Edit Account",
    description:
      "Healthyfoodmap edit account page. Change your bio, username or account email.",
    link: "https://healthyfoodmap.com/editAccount",
    type: "website",
    date: "2023-04-20 15:00:00.000",
    image: "/seo/account.PNG",
    keywords: "healthy food map, edit account, healthy food map edit account",
  };
  return (
    <Cont colors={COLORS}>
      <div className="content-holder"></div>
    </Cont>
  );
};

export default EditAccount;
