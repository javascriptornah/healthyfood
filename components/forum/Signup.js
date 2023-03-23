import { useRouter } from "next/router";
import { useRef, useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import supabase from "../../utils/supabaseClient";
import { useForm } from "react-hook-form";
import { signInWithEmail } from "../../utils/supabaseFunctions";

const Cont = styled.div`
  position: relative;

  .black-btn,
  .white-btn {
    padding: 4px 12px;
  }
  .input {
    margin-right: 16px;
    @media only screen and (max-width: 280px) {
      margin-right: 4px;
    }
  }
  .errors {
    margin-bottom: 8px;
  }
  form {
    @media only screen and (max-width: 280px) {
      flex-direction: column;
    }
  }
`;
const Signup = ({ showFunction }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const signIn = handleSubmit(async (formData) => {
    setLoading(true);
    const res = await signInWithEmail(formData.email, formData.password);
    if (res.state == false) {
      errorMsg.current.innerText = "*" + res.error.message;
    } else if (res.state == true) {
      router.reload();
    }
    setLoading(false);
  });

  const errorMsg = useRef(null);

  return (
    <Cont colors={COLORS}>
      <form onSubmit={signIn} className="flex-inline align-start">
        <div className="input">
          <p>Do you need an account?</p>
          <p className="mar-bottom-8">Please login or register</p>
          <input
            {...register("email", { required: true })}
            type="email"
            className="mar-bottom-8 input-small mar-right-8"
            placeholder="email"
          />
          <input
            {...register("password", { required: true })}
            type="password"
            className="mar-bottom-8 input-small"
            placeholder="password"
          />
          <div className="errors">
            {errors.email?.type === "required" && (
              <p className="error">*Email required</p>
            )}
            {errors.password?.type === "required" && (
              <p className="error">*Password required</p>
            )}
            <p className="error" ref={errorMsg}></p>
          </div>
        </div>
        {loading ? (
          <div class="lds-ring-green">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <div className="flex flex-column ">
            <div
              onClick={showFunction}
              className="white-btn mar-bottom-8 justify-start"
            >
              <h5>Register</h5>
            </div>
            <button onClick={signIn} className="black-btn">
              <h5>Login</h5>
            </button>
          </div>
        )}
      </form>
    </Cont>
  );
};

export default Signup;
