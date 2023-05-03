import { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import supabase from "../../utils/supabaseClient";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
const Cont = styled.div`
  width: 100%;
`;
const SignupForm = ({ passwordState, togglePasswordState }) => {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const password = watch("password", "");
  const signUp = handleSubmit(async (formData) => {
    setLoading(true);

    const createUser = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              username: formData.username,
              avatar_url: "anon.png",
              role: "anon",
            },
          },
        });
        if (error) throw error;
        setValue("username", "");
        setValue("email", "");
        setValue("password", "");
        setValue("confirmPassword", "");
        toast(
          "Please check your email for an authentication link. Thanks for signing up!",
          {
            duration: 4000,
            position: "top-center",

            // Styling
            style: {},
            className: "",

            // Custom Icon
            icon: "✉️",

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
        router.push("/welcome");
        setLoading(false);
      } catch (error) {
        toast.error(`Error creating your account :( ${error.message}`);
        console.log(error);
      }
    };
    createUser();
    /*
        checkUsernameUnique(formData.username).then((res) =>
        res // is unique then check email unique
          ? checkEmailUnique(formData.email).then((res) =>
              // is unique then create user, not send error message
              res ? createUser() : toast.error('Email taken')
            ) // username isn't unique
          : toast.error("Username taken")
      );  */
  });

  return (
    <Cont className="flex flex-column">
      <form onSubmit={signUp}>
        <div className="input-line">
          <h5>Username</h5>
          <input
            {...register("username", {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9_$]{1,20}$/,
                message:
                  "*Username must be 1-20 letters and can only contain letters, numbers, and _. Ex. james3.",
              },
            })}
            type="text"
            placeholder="username"
            name="username"
          />
          {errors.username?.type === "required" && (
            <p className="error">*Username is required</p>
          )}
          {errors.username?.type === "pattern" && (
            <p className="error">*{errors.username.message}</p>
          )}
        </div>

        <div className="input-line">
          <h5>Email</h5>
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
          <h5>Password</h5>
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

        <div className="input-line">
          <h5>Confirm Password </h5>
          <input
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value === password || "The passwords do not match",
            })}
            type={passwordState}
            placeholder="confirm password"
            name="confirmPassword"
          />

          {errors.confirmPassword?.type === "required" && (
            <p className="error">*Confirm Password</p>
          )}
          {errors.confirmPassword?.type === "validate" && (
            <p className="error">*Passwords must match</p>
          )}
        </div>
        <button type="submit" hidden></button>
      </form>
      <div className="signup-footer justify-center flex">
        {loading ? (
          <div class="lds-ring-green">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <FontAwesomeIcon
            icon={faCircleChevronRight}
            className="white icon-xl cursor"
            onClick={signUp}
          />
        )}
      </div>
    </Cont>
  );
};

export default SignupForm;
