import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import COLORS from "../data/colors";
import supabase from "../utils/supabaseClient";
import NotLogged from "../components/account/notlogged";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faPlus,
  faTurnDown,
} from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";
import DeleteLinkBio from "../components/account/DeleteLinkBio";
const Cont = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px;
  .input-line {
    margin-bottom: 16px;
    h5 {
      margin-bottom: 4px;
    }
  }
  .plus-icon {
    background-color: ${(props) => props.colors.tan};
    width: 40px;
    height: 40px;
    position: absolute;
    z-index: 1;
    left: 50%;
    top: 50%;
    display: flex;
    justify-content: center;
    border-radius: 50%;
    align-items: center;
    transform: translate(-50%, -50%);
    opacity: 0.75;
  }
  .image-cont {
    &:hover {
      .plus-icon {
        opacity: 1;
      }
    }
    width: 128px;
    height: 128px;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    border: 2px solid ${(props) => props.colors.darkBlue};
    &:hover {
      opacity: 0.9;
    }
  }
  .tags-input-box {
    position: relative;
    padding: 0;
    input {
      width: 100%;
      padding: 8px;
    }
    .blue {
      position: absolute;
      top: calc(50% - 12px);
      right: 8px;
      cursor: pointer;
      &:hover {
        color: ${(props) => props.colors.redGrey};
      }
    }
  }
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
        setUsername(session.session.user.user_metadata.username);
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    };
    fetchUser();
  }, []);

  const [session, setSession] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [usernameDisplay, setUsernameDisplay] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);
  const inputRef = useRef(null);
  const [formErrors, setFormErrors] = useState({ email: "", username: "" });
  const [emailLoading, setEmailLoading] = useState(false);
  const [bioLoading, setBioLoading] = useState(false);
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [reportActive, setReportActive] = useState(false);
  const emailRef = useRef();
  const [usernameBtn, setUsernameBtn] = useState(false);
  const [emailBtn, setEmailBtn] = useState(false);
  const [bioBtn, setBioBtn] = useState(false);
  useEffect(() => {
    const updateSession = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (session) {
        setSession(session.session);
        setAvatarUrl(session.session.user.user_metadata.avatar_url);
        setUsername(session?.session?.user.user_metadata.username);
        setEmail(session?.session?.user.email);
        setUsernameDisplay(session.session.user.user_metadata.username);
      }
    };
    updateSession();
  }, []);
  useEffect(() => {
    setUsernameDisplay(session?.user?.user_metadata.username);
  }, [session]);
  const submitUsername = () => {
    const finalSubmit = () => {
      setUsernameLoading(true);
      const validateUsername = (res) => {
        if (res) {
          toast.success("Username updated!");
          setUsernameDisplay(username);
        }
        setUsernameLoading(false);
      };
      updateUserUsername(username).then((res) => validateUsername(res));
      setFormErrors((prev) => {
        return {
          ...prev,
          username: "",
        };
      });
    };
    if (!/^[a-zA-Z0-9_.]{6,20}$/.test(username)) {
      setFormErrors((prev) => {
        return {
          ...prev,
          username: "6-20 letters. Only letters, numbers or _.",
        };
      });
    } else {
      checkUsernameUnique(username).then((res) =>
        res
          ? finalSubmit()
          : setFormErrors((prev) => {
              return {
                ...prev,
                username: "Username is already taken",
              };
            })
      );
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
    if (!usernameBtn) {
      setUsernameBtn(true);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
    if (!emailBtn) {
      setEmailBtn(true);
    }
  };

  const updateBio = (e) => {
    setBio(e.target.value);
    if (!bioBtn) {
      setBioBtn(true);
    }
  };

  const uploadAvatar = async (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      throw new Error("You must select an image to upload.");
    }

    setUploading(true);
    const file = event.target.files[0];
    const fileExt = file.name.split(".").pop();
    const filePath = `${session?.user?.email}.${nanoid()}`;
    const finishUpload = () => {
      setAvatarUrl(filePath);
      setUploading(false);
    };

    deleteFile(avatarUrl).then((res) =>
      uploadFile(filePath, file).then((res) =>
        updateUserAvatar(filePath).then((res) => finishUpload())
      )
    );

    const hideReport = () => {
      setReportActive(false);
    };
  };

  const submitBio = () => {};
  const submitEmail = () => {
    const notUniqueEmail = () => {
      setEmailLoading(false);
      toast.error("Email is already in use.");
      setTimeout(() => {
        toast("Send an error report if you believe this to be a mistake.", {
          duration: 4000,
          position: "top-center",

          // Styling
          style: {},
          className: "",

          // Custom Icon
          icon: "❗",

          // Change colors of success/error/loading icon
          iconTheme: {
            primary: "#000",
            secondary: "#fff",
          },

          // Aria
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
      }, 2000);
    };
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      emailRef.current.focus();
      setFormErrors((prev) => {
        return {
          ...prev,
          email: "Invalid Email",
        };
      });
    } else {
      const validateEmail = (res) => {
        if (res) {
          toast(
            "Email updated! Please check your new email for verification.",
            {
              duration: 4000,
              position: "top-center",

              // Styling
              style: {},
              className: "",

              // Custom Icon
              icon: "👏",

              // Change colors of success/error/loading icon
              iconTheme: {
                primary: "#000",
                secondary: "#fff",
              },

              // Aria
              ariaProps: {
                role: "status",
                "aria-live": "polite",
              },
            }
          );
        }
        setEmailLoading(false);
      };

      setEmailLoading(true);
      checkEmailUnique(email).then((res) =>
        res // run is email is unique
          ? updateUserEmail(email).then((res) => validateEmail(res))
          : // run if email is not unique
            notUniqueEmail()
      );

      setFormErrors((prev) => {
        return {
          ...prev,
          email: "",
        };
      });
    }
  };

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
    <Cont colors={COLORS} className="container">
      <Toaster />

      <div className="center-inline  ssm-spacer">
        <h1 className="black">Edit Profile</h1>
      </div>
      {user ? (
        <div className="fake-form" onSubmit={onSubmit}>
          <div
            style={{ height: "80px" }}
            className="flex align-center ssm-spacer"
          >
            <div>
              <div
                onClick={() => fileRef.current.click()}
                className="image-cont mar-right-32"
              >
                <div className="plus-icon">
                  <FontAwesomeIcon icon={faPlus} className="red icon-med" />
                </div>
                {avatarUrl &&
                  (avatarUrl === "anon" ? (
                    <Image
                      src={"/images/anon.png"}
                      style={{ objectFit: "cover" }}
                      fill
                      size="100%"
                      alt="profile"
                    />
                  ) : (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_PATH}/${avatarUrl}`}
                      style={{ objectFit: "cover" }}
                      fill
                      size="100%"
                      alt="profile"
                    />
                  ))}
              </div>
            </div>
            <div>
              <h5
                onClick={() => fileRef.current.click()}
                className="green cursor"
              >
                Change profile picture
              </h5>
            </div>
            {uploading && (
              <div className="lds-ripple">
                <div></div>
                <div></div>
              </div>
            )}
          </div>
          <input
            type="file"
            onChange={uploadAvatar}
            ref={fileRef}
            hidden={true}
          />
          <label>
            <h5 className=" mar-bottom-8 red">Username</h5>
            <input
              value={username}
              onChange={updateUsername}
              type="text"
              placeholder="Username"
              ref={inputRef}
              className={formErrors.username !== "" ? "border-red" : ""}
            />
            <p className="red">{formErrors.username}</p>
          </label>
          <div className="mar-bottom-16"></div>
          {usernameBtn &&
            (usernameLoading ? (
              <div className="lds-ripple">
                <div></div>
                <div></div>
              </div>
            ) : (
              <button
                onClick={submitUsername}
                className="black-btn inline-block"
              >
                <h5>Update</h5>
              </button>
            ))}
          <div className="mar-bottom-32"></div>
          <label>
            <h5 className="red mar-bottom-8">Email</h5>
            <p className="mar-bottom-16 contrast">
              To make sure you have access to this email address, we will send
              an email to this account with the confirmation link
            </p>
            <input
              value={email}
              onChange={updateEmail}
              type="text"
              placeholder="Email"
              ref={emailRef}
              className={formErrors.email !== "" ? "border-red" : ""}
            />
            <p className="red">{formErrors.email}</p>
          </label>
          <div className="mar-bottom-16"></div>
          {emailBtn &&
            (emailLoading ? (
              <div className="lds-ripple">
                <div></div>
                <div></div>
              </div>
            ) : (
              <div onClick={submitEmail} className="black-btn inline-block">
                <h5>{emailLoading ? "Loading..." : "Update"}</h5>
              </div>
            ))}
          <div className="mar-bottom-32"></div>
          <label>
            <h5 className="red mar-bottom-8">Bio</h5>

            <textarea
              value={bio}
              onChange={updateBio}
              type="text"
              placeholder="Tell us about yourself!"
              ref={emailRef}
              className={formErrors.bio !== "" ? "border-red" : ""}
            />
            <p className="red">{formErrors.bio}</p>
          </label>
          <div className="mar-bottom-16"></div>
          {bioBtn &&
            (bioLoading ? (
              <div className="lds-ripple">
                <div></div>
                <div></div>
              </div>
            ) : (
              <div onClick={submitBio} className="black-btn inline-block">
                <h5>{bioLoading ? "Loading..." : "Update"}</h5>
              </div>
            ))}
          <div className="mar-bottom-32"></div>
          <h5 className="red mar-bottom-8">Social Links</h5>

          <DeleteLinkBio
            url="/"
            icon="youtube"
            text="Raw Meat Youtube"
            color="red"
          />
          <div className="add-social">
            <FontAwesomeIcon
              icon={faPlus}
              className="black icon-med mar-right-8"
            />
            <p className="bold">Add social link</p>
          </div>
        </div>
      ) : (
        <NotLogged />
      )}
    </Cont>
  );
};

export default EditAccount;
