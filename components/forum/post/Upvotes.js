import { useState, useEffect } from "react";
import styled from "styled-components";
import COLORS from "../../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import {
  createCommentUpvote,
  createCommentDownVote,
  deleteCommentDownvote,
  deleteCommentUpvote,
} from "../../../utils/supabaseFunctions";
const Cont = styled.div`
  .vote-container {
    width: 28px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    cursor: pointer;
    &:hover {
      background-color: ${(props) => props.colors.lightGrey3};
    }
    &:active {
      background-color: ${(props) => props.colors.lightGrey3};
      .contrast {
        color: ${(props) => props.colors.black};
      }
    }
  }
`;

const Upvotes = ({ upvotes, downvotes, upvoteFunction, downvoteFunction }) => {
  const [upvoteCount, setUpvoteCount] = useState(
    upvotes.length - downvotes.count
  );

  const [upvoteState, setUpvoteState] = useState({
    upvote: false,
    downvote: false,
  });
  const increaseUpvoteFunctional = async () => {
    if (upvoteState.upvote == true) {
      setUpvoteState((prev) => {
        return {
          ...prev,
          upvote: false,
        };
      });
    } else if (upvoteState.upvote == false) {
      setUpvoteState((prev) => {
        return {
          upvote: false,
          downvote: false,
        };
      });
    }
  };
  console.log("///");
  console.log(upvotes);
  useEffect(() => {}, []);
  return (
    <Cont colors={COLORS} className="flex-inline align-center">
      <div className="vote-container mar-right-8">
        <FontAwesomeIcon icon={faArrowUp} className="icon-ssm contrast " />
      </div>

      <p className="black mar-right-8 bold">{upvotes - downvotes}</p>
      <div className="vote-container">
        <FontAwesomeIcon icon={faArrowDown} className="icon-ssm contrast" />
      </div>
    </Cont>
  );
};

export default Upvotes;
