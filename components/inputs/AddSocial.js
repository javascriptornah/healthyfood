import { useState, useRef } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faArrowTurnDown } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faReddit,
  faInstagram,
  faTwitter,
  faDiscord,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import toast from "react-hot-toast";
const Cont = styled.div`
  .content-spec {
    max-width: 400px;
    width: 100%;
    background-color: #fff;
    border-radius: 8px;
  }
  .link {
    background-color: ${(props) => props.colors.lightBeige};
    padding: 4px 8px;
    border-radius: 16px;
    display: inline-flex;
    align-items: center;
    margin-right: 8px;
    margin-bottom: 8px;
    &:hover {
      background-color: ${(props) => props.colors.offWhite};
    }
    &:active {
      box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
        rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
    }
  }
  .link-set {
    &:hover {
      background-color: ${(props) => props.colors.lightBeige};
    }
  }
  .return {
    position: absolute;
    top: 16px;
    left: 16px;

    .contrast {
      &:hover {
        color: black !important;
      }
    }
  }
`;

const AddSocial = () => {
  const [adding, setAdding] = useState(true);
  const inputRef = useRef(null);
  const [socialState, setSocialState] = useState({
    icon: faInstagram,
    text: "Instagram",
    color: "#f09433",
  });
  const [linkVal, setLinkVal] = useState("");

  const createLink = () => {
    if (linkVal == "") {
      toast.error("Can't be empty");
      inputRef.current.focus();
    }
  };

  const startAdding = (icon, text, color) => {
    setAdding(true);
    setSocialState({ icon, text, color });
  };

  return (
    <Cont colors={COLORS} className="loading-screen">
      {!adding ? (
        <div className="content-spec box-shadow-2 ">
          <div className="center-inline padding-16">
            <h5>Add Social Link</h5>
          </div>
          <div className="grey-line"></div>
          <div className="padding-16">
            <div
              className="link box-shadow-2 cursor"
              onClick={() => startAdding(faInstagram, "Instagram", "#f09433")}
            >
              <FontAwesomeIcon
                icon={faInstagram}
                style={{ color: "#f09433" }}
                className="icon-ssm mar-right-8 "
              />
              <p className="bold black">Instagram</p>
            </div>
            <div
              className="link black box-shadow-2 cursor"
              onClick={() => startAdding(faReddit, "Reddit", "#f09433")}
            >
              <FontAwesomeIcon
                icon={faReddit}
                style={{ color: "#FF5700" }}
                className="icon-ssm mar-right-8"
              />
              <p className="bold black">Reddit</p>
            </div>
            <div
              className="link box-shadow-2 cursor"
              onClick={() => startAdding(faInstagram, "Instagram", "#f09433")}
            >
              <FontAwesomeIcon
                icon={faTwitter}
                style={{ color: "#1DA1F2" }}
                className="icon-ssm  mar-right-8"
              />
              <p className="bold black">Twitter</p>
            </div>
            <div
              className="link box-shadow-2 cursor"
              onClick={() => startAdding(faInstagram, "Instagram", "#f09433")}
            >
              <FontAwesomeIcon
                icon={faFacebook}
                style={{ color: "#4267B2" }}
                className="icon-ssm mar-right-8 "
              />
              <p className="bold black ">Facebook</p>
            </div>
            <div
              className=" black link box-shadow-2 cursor"
              onClick={() => startAdding(faInstagram, "Instagram", "#f09433")}
            >
              <FontAwesomeIcon
                icon={faDiscord}
                style={{ color: "#6a0dad" }}
                className="icon-ssm mar-right-8"
              />
              <p className=" black bold">Discord</p>
            </div>
            <div
              className=" black link box-shadow-2 cursor"
              onClick={() => startAdding(faInstagram, "Instagram", "#f09433")}
            >
              <FontAwesomeIcon
                icon={faTelegram}
                style={{ color: "#0088cc" }}
                className=" icon-ssm mar-right-8"
              />
              <p className=" black bold">Telegram</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="content-spec box-shadow-2 relative">
          <div className="center-inline padding-16">
            <h5>Add Social Link</h5>
          </div>
          <div className="return" onClick={() => setAdding(false)}>
            <FontAwesomeIcon
              icon={faArrowTurnDown}
              className="contrast cursor icon-sm"
              style={{ transform: "rotate(90deg)" }}
            />
          </div>
          <div className="grey-line"></div>
          <div className="padding-16">
            <div className=" black link link-set">
              <FontAwesomeIcon
                icon={socialState.icon}
                style={{ color: socialState.color }}
                className=" icon-ssm mar-right-8"
              />
              <p className=" black bold">{socialState.text}</p>
            </div>
            <form onSubmit={createLink}>
              <input
                ref={inputRef}
                value={linkVal}
                onChange={(e) => setLinkVal(e.target.value)}
                placeholder="@username"
                type="text"
              />
              <div className="mar-bottom-16"></div>
              <div className="flex flex-end">
                <button type="submit" className="blue-btn-one">
                  <h5>Create</h5>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Cont>
  );
};

export default AddSocial;
