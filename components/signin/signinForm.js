import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import supabase from "../../utils/supabaseClient";
const Cont = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  .red-btn-one {
    width: 90%;
    margin: 32px auto 0;
  }
`;
const SigninForm = ({ passwordState, togglePasswordState, updateHeight }) => {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const fetchUser = async () => {
    const { data: session } = await supabase.auth.getSession();
    console.log(session);
    if (session.session != null) {
      setUser(session.session.user);
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const signInRef = useRef(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    updateHeight(signInRef?.current?.clientHeight + 20);
  }, [signInRef]);
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const signIn = handleSubmit(async (formData) => {
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.emailSignIn,
        password: formData.passwordSignIn,
      });
      if (error) throw error;
      setLoading(false);
      console.log(data);
      router.reload("/");
    } catch (error) {
      console.log(error);

      toast("Incorrect email or password or not authenticated", {
        duration: 6000,
        position: "top-center",

        // Styling
        style: { border: "1px solid #E52323" },
        className: "",

        // Custom Icon
        icon: "❌",

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
      setLoading(false);
    }
  });
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    toast.success("You are no longer singed in");
    fetchUser();
    router.reload();
  };
  return (
    <Cont>
      {isLogged ? (
        <div className="red-btn-one " onClick={logout}>
          <h5>Sign Out</h5>
        </div>
      ) : (
        <>
          <form onSubmit={signIn} ref={signInRef}>
            <div className="input-line">
              <h5>Email</h5>
              <input
                {...register("emailSignIn", {
                  required: true,
                })}
                type="email"
                placeholder="example@gmail.com"
                name="emailSignIn"
              />
              {errors.emailSignIn?.type === "required" && (
                <p className="error">*Email is required</p>
              )}
            </div>

            <div className="input-line">
              <h5>Password</h5>
              <div className="tags-input-box">
                <input
                  {...register("passwordSignIn", {
                    required: true,
                    pattern: {
                      value: /.{4,50}/,
                      message: "Minimum of 4 letters",
                    },
                  })}
                  type={passwordState}
                  placeholder="password"
                  name="passwordSignIn"
                />
                <FontAwesomeIcon
                  onClick={togglePasswordState}
                  icon={passwordState === "password" ? faEye : faEyeSlash}
                  className="blue icon-sm"
                />
              </div>

              {errors.passwordSignIn?.type === "required" && (
                <p className="error">*Password is required</p>
              )}
              {errors.passwordSignIn?.type === "pattern" && (
                <p className="error">*{errors?.passwordSignIn?.message}</p>
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
                onClick={signIn}
              />
            )}
          </div>
        </>
      )}
    </Cont>
  );
};

export default SigninForm;
