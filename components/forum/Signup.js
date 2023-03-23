import { useState } from "react";
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
    position: absolute;
  }
`;
const Signup = ({ showFunction }) => {
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
  });

  return (
    <Cont colors={COLORS}>
      <form onSubmit={signIn} className="flex-inline align-end">
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
            type="text"
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
          </div>
        </div>
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
      </form>
    </Cont>
  );
};

export default Signup;
