import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Signup from "./Signup";
import SignupPopup from "../popups/SignupPopup";
import supabase from "../../utils/supabaseClient";
import { logout } from "../../utils/supabaseFunctions";
import toast, { Toaster } from "react-hot-toast";

const Cont = styled.div`
  .title-spec {
    background-color: ${(props) => props.colors.darkPink};
    text-align: center;
    padding-top: 8px;
    padding-bottom: 8px;
    border-radius: 8px 8px 0 0;
    margin-bottom: 16px;
    h3 {
      color: #fff;
    }
  }
`;
const Header = () => {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const logoutFunctional = async () => {
    setLoading(true);
    let { state } = await logout();

    if (state == false) {
      toast.error("Error loging out :(");
    } else if (state == true) {
      router.reload();
    }
    setLoading(false);
  };
  return (
    <Cont colors={COLORS} className="mar-bottom-48">
      <Toaster />
      {showLogin && <SignupPopup hideFunction={hideLogin} />}
      <div className="title-spec">
        <h3 className="text-shadow">FOOD SOURCING FORUM</h3>
      </div>
      {user !== null ? (
        <>
          <p>
            You are currently signed in as{" "}
            <Link href="/account">
              <span className="light-blue-2 bold underline-hover">
                {user.user_metadata.username}{" "}
              </span>
            </Link>
          </p>
          {loading ? (
            <div class="lds-ring-green">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            <p>
              Want to{" "}
              <span
                onClick={logoutFunctional}
                className="light-red bold cursor underline-hover"
              >
                Logout?
              </span>
            </p>
          )}
        </>
      ) : (
        <Signup showFunction={displayLogin} />
      )}
    </Cont>
  );
};

export default Header;
