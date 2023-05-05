import { useState, useEffect } from "react";
import styled from "styled-components";
import COLORS from "../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import DeletePopup from "../components/popups/DeletePopup";
const Cont = styled.div`
  padding: 32px;
  @media only screen and (max-width: 800px) {
    padding: 16px;
  }
  p {
    margin-bottom: 8px;
  }
`;

const Deleteaccount = () => {
  const [deleting, setDeleting] = useState(false);

  const cancelDelete = () => {
    setDeleting(false);
  };
  const deleteAccount = () => {};
  return (
    <Cont colors={COLORS}>
      <h3>Delete Account</h3>
      <div className="grey-line mar-bottom-8"></div>
      <p>
        We are sad to see you go, but we would like to provide you the ability
        to delete your account details.
      </p>

      <p>Once you delete your account, it is irreversible.</p>
      <div className="mar-bottom-16"></div>
      <div
        onClick={() => setDeleting(true)}
        className="red-btn-one align-center flex-inline"
      >
        <h5 className="mar-right-8">Delete my account</h5>
        <FontAwesomeIcon icon={faTrash} className="icon-ssm white" />
      </div>
      {deleting && (
        <DeletePopup
          text="account"
          deleteFunction={deleteAccount}
          cancelFunction={cancelDelete}
        />
      )}
    </Cont>
  );
};

export default Deleteaccount;
