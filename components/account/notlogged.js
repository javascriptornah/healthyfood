import Link from "next/link";
import { useState, useEffect } from "react";
import supabase from "../../utils/supabaseClient";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const Cont = styled.div`
  .default-page {
    background: #fff;
    border: none !important;
    width: 100%;
    margin: 80px 0;
  }
  .title-spec {
    padding: 16px;
  }
  .text-content {
    background-color: ${(props) => props.colors.lightBeige};
    padding: 16px;
  }
  .features {
    border-radius: 16px;
    padding: 16px;
  }
  .content-holder {
    align-items: center;
    @media only screen and (max-width: 1000px) {
      flex-direction: column;
    }
  }
`;
const NotLogged = () => {
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
  return (
    <Cont colors={COLORS}>
      <div className="default-page">
        <div className="flex space-around sm-spacer content-holder">
          <div className="center-inline ssm-spacer">
            <h3 className=" text-shadow-red mar-bottom-16">
              You Are Not Signed In!
            </h3>
            <h4 className="light contrast mar-bottom-8">
              Create an account or login
            </h4>
            <Link href="/login">
              <div className="blue-btn-one">
                <h5>Login</h5>
              </div>
            </Link>
          </div>
          <div className="features box-shadow ssm-spacer">
            <div className="flex align-center mar-bottom-16">
              <FontAwesomeIcon
                icon={faPlus}
                className="icon-ssm green mar-right-16"
              />
              <p className="bold">
                location posts can be edited later (can’t be with guest account)
              </p>
            </div>

            <div className="flex align-center mar-bottom-16">
              <FontAwesomeIcon
                icon={faPlus}
                className="icon-ssm green mar-right-16"
              />
              <p className="bold">Save location posts for later</p>
            </div>

            <div className="flex align-center mar-bottom-16">
              <FontAwesomeIcon
                icon={faPlus}
                className="icon-ssm green mar-right-16"
              />
              <p className="bold">
                Share your account page with all your location posts
              </p>
            </div>

            <div className="flex align-center mar-bottom-16">
              <FontAwesomeIcon
                icon={faPlus}
                className="icon-ssm green mar-right-16"
              />
              <p className="bold">Forum post notifications (future feature)</p>
            </div>
          </div>
        </div>
        <div className="blue-line"></div>
      </div>
    </Cont>
  );
};

export default NotLogged;
