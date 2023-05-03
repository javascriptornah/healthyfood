import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import supabase from "../../utils/supabaseClient";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEye,
  faEyeSlash,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
const Cont = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  form {
    max-width: 400px;
    margin: 0 auto;
  }
  .title {
    background-color: ${(props) => props.colors.darkPink};
    padding: 16px;
    border-radius: 32px;
    h3,
    h4,
    h5,
    p {
      color: ${(props) => props.colors.offWhite};
    }
  }
  .input-line {
    h5 {
      margin-bottom: 8px;
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
  .left-content {
    max-width: 600px;
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
  .grey-border-2 {
    padding: 32px;
  }
`;
const NotLogged = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const [passwordState, setPasswordState] = useState("password");
  const togglePasswordState = () => {
    setPasswordState((prev) => {
      if (prev === "password") {
        return "text";
      } else {
        return "password";
      }
    });
  };

  const submitForm = handleSubmit(async (formData) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) throw error;

      router.reload("/");
    } catch (error) {
      console.log(error);
      errorText.current.innerText =
        "Incorrect email or password or you need to authenticate";
    }
  });
  const errorText = useRef(null);
  return (
    <Cont colors={COLORS}>
      <div className="default-page">
        <div className="flex space-around sm-spacer content-holder">
          <div className="center-inline mar-bottom-32 left-content grey-border-2">
            <h3 className=" text-shadow-red mar-bottom-16">
              Thanks For Signing Up!
            </h3>
            <h5 className="contrast mar-bottom-32">
              Please check your email for an authetication link, then login
              below!
            </h5>
            <div className="">
              <form onSubmit={submitForm}>
                <div className="input-line">
                  <h5>EMAIL</h5>
                  <input
                    {...register("email", {
                      required: true,
                    })}
                    type="email"
                    placeholder="example@gmail.com"
                    name="email"
                  />
                  {errors.email?.type === "required" && (
                    <p className="error">*Email is required</p>
                  )}
                </div>

                <div className="input-line">
                  <h5>PASSWORD</h5>
                  <div className="tags-input-box">
                    <input
                      {...register("password", {
                        required: true,
                        pattern: {
                          value: /.{4,50}/,
                          message: "Minimum of 4 letters",
                        },
                      })}
                      type={passwordState}
                      placeholder="password"
                      name="password"
                    />
                    <FontAwesomeIcon
                      onClick={togglePasswordState}
                      icon={passwordState === "password" ? faEye : faEyeSlash}
                      className="blue icon-sm"
                    />
                  </div>

                  {errors.password?.type === "required" && (
                    <p className="error">*Password is required</p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="error">*{errors.password.message}</p>
                  )}
                </div>
                <p ref={errorText} className="error"></p>

                <button className="blue-btn-one width-100">
                  <h5>LOGIN</h5>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Cont>
  );
};

export default NotLogged;
