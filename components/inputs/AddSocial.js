import { useState, useRef } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faArrowTurnDown,
  faClose,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faReddit,
  faInstagram,
  faTwitter,
  faDiscord,
  faTelegram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import toast from "react-hot-toast";
import { createUserLink } from "../../utils/supabaseFunctions";
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
  .delete {
    position: absolute;
    right: 16px;
    top: 16px;
    .contrast {
      &:hover {
        color: black !important;
      }
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

const AddSocial = ({ hideSocial, user_id, pushLink }) => {
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);
  const [socialState, setSocialState] = useState({
    icon: faInstagram,
    text: "Instagram",
    color: "#f09433",
  });
  const [linkVal, setLinkVal] = useState("");
  const [textVal, setTextVal] = useState("");

  const createLink = async () => {
    if (textVal == "") {
      toast.error("Can't be empty");
      inputRef2.current.focus();
      return;
    } else if (linkVal == "") {
      toast.error("Can't be empty");
      inputRef.current.focus();
      return;
    }
    setLoading(true);
    if (
      !/(https|http)?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
        linkVal
      )
    ) {
      toast.error("Must be valid link starting with http/https");
      setLoading(false);
      return;
    }
    let { state, data } = await createUserLink(
      user_id,
      textVal,
      linkVal,
      socialState.text.toLowerCase()
    );
    if (state) {
      toast.success("Link added!");
      setLinkVal("");
      hideSocial();
      console.log(data);
      pushLink(data.id, data.icon, data.link, data.name);
    } else {
      toast.error("Error creating link");
    }
    setLoading(false);
  };

  const startAdding = (icon, text, color) => {
    setAdding(true);
    setSocialState({ icon, text, color });
  };

  const updateLink = (e) => {
    let val = e.target.value;
    if (!/^https?:\/\//g.test(val)) {
      let reg = new RegExp("^" + val, "g");

      let match = "https://".match(reg);

      if (match == null) {
        setLinkVal("https://" + val);
      } else {
        setLinkVal(match + "https://".replace(match, ""));
      }
    } else {
      setLinkVal(val);
    }
  };

  return (
    <Cont colors={COLORS} className="loading-screen opacity-anim">
      {!adding ? (
        <div className="content-spec box-shadow-2 relative">
          <div className="delete cursor" onClick={hideSocial}>
            <FontAwesomeIcon icon={faClose} className="contrast icon-sm" />
          </div>
          <div className="center-inline padding-16">
            <h5>Add Social Link</h5>
          </div>
          <div className="grey-line"></div>
          <div className="padding-16">
            <div
              className="link box-shadow-2 cursor"
              onClick={() => startAdding(faLink, "Custom Url", "#BAB2B5")}
            >
              <FontAwesomeIcon
                icon={faLink}
                style={{ color: "#BAB2B5" }}
                className="icon-ssm mar-right-8 "
              />
              <p className="bold black">Custom Url</p>
            </div>
            <div
              className="link box-shadow-2 cursor"
              onClick={() => startAdding(faYoutube, "Youtube", "#FF0000")}
            >
              <FontAwesomeIcon
                icon={faYoutube}
                style={{ color: "#FF0000" }}
                className="icon-ssm mar-right-8 "
              />
              <p className="bold black">Youtube</p>
            </div>
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
              onClick={() => startAdding(faTwitter, "Twitter", "#1DA1F2")}
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
              onClick={() => startAdding(faFacebook, "Facebook", "#4267B2")}
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
              onClick={() => startAdding(faDiscord, "Discord", "#6a0dad")}
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
              onClick={() => startAdding(faTelegram, "Telegram", "#0088cc")}
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
                ref={inputRef2}
                value={textVal}
                onChange={(e) => setTextVal(e.target.value)}
                placeholder="Display text"
                type="text"
                className="mar-bottom-8 text-field-2"
              />
              <input
                ref={inputRef}
                value={linkVal}
                onChange={updateLink}
                placeholder="https://"
                type="text"
                className=" text-field-2"
              />
              <div className="mar-bottom-16"></div>
              <div className="flex flex-end">
                {!loading ? (
                  <button
                    type="submit"
                    className="blue-btn-one flex align-center"
                  >
                    <h5 className="mar-right-8">Create</h5>
                    <FontAwesomeIcon icon={faPlus} className="white icon-sm" />
                  </button>
                ) : (
                  <div className="lds-ring-green">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </Cont>
  );
};

export default AddSocial;
