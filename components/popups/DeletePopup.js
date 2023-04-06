import styled from "styled-components";
import COLORS from "../../data/colors";
const Cont = styled.div`
  background: #fff;
  border: 1px solid ${(props) => props.colors.grey};
  position: fixed;
  width: 50%;
  left: 25%;
  top: 25%;
  z-index: 4;
  border-radius: 8px;
  @media only screen and (max-width: 800px) {
    width: 75%;
    left: 12.5%;
  }
  @media only screen and (max-width: 440px) {
    width: 100%;
    left: 0;
  }
  @media only screen and (max-width: 250px) {
    .button-cont {
      flex-direction: column;
      .delete {
        margin-bottom: 16px;
      }
    }
  }
  h4 {
    text-align: center;
    border-radius: 8px 8px 0 0;
    border-bottom: 1px solid black;
    padding: 16px;

    background-color: ${(props) => props.colors.offWhite};
  }
  .button-cont {
    padding: 16px;
    display: flex;
    justify-content: space-between;
  }
  .btn-spec {
    padding: 8px 16px;
    cursor: pointer;
  }
  .delete {
    background-color: ${(props) => props.colors.darkPink} !important;
    border: 1px solid ${(props) => props.colors.black};
    &:hover {
      h5 {
        color: ${(props) => props.colors.darkPink} !important;
      }
      background-color: #fff !important;
    }
  }
  .cancel {
    border: 1px solid ${(props) => props.colors.darkPink};
    background-color: #fff;
    &:hover {
      h5 {
        color: ${(props) => props.colors.grey} !important;
      }
      background-color: ${(props) => props.colors.darkPink};
    }
  }
`;
const DeletePopup = ({ text, deleteFunction, cancelFunction }) => {
  return (
    <Cont colors={COLORS} className="rounded-shadow opacity-anim">
      <h4 className="red ssm-spacer text-shadow-red">
        Are you sure you want to delete this {text}?
        <p className="small">It can't be undone</p>
      </h4>

      <div className="button-cont">
        <button onClick={deleteFunction} className="delete btn-spec">
          <h5 className="white light">Delete</h5>
        </button>
        <button onClick={cancelFunction} className="btn-spec cancel">
          <h5 className="red light">Cancel</h5>
        </button>
      </div>
    </Cont>
  );
};

export default DeletePopup;
