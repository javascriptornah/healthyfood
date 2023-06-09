import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import COLORS from "../../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import supabase from "../../../utils/supabaseClient";
import {
  createCommentUpvote,
  createCommentDownvote,
  deleteCommentDownvote,
  deleteCommentUpvote,
} from "../../../utils/supabaseFunctions";
import toast from "react-hot-toast";

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
  .vote-active {
    background-color: ${(props) => props.colors.grey2};
    &:hover {
      border: 1px solid ${(props) => props.colors.grey};
      background-color: ${(props) => props.colors.grey2};
    }
  }
`;

const Upvotes = ({
  upvotes,
  downvotes,
  upvoteFunction,
  downvoteFunction,
  comment_id,
}) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(false);
  const [upvoteState, setUpvoteState] = useState({
    upvote: false,
    downvote: false,
  });

  useEffect(() => {
    let upvotedState = upvotes.some((upvote) => upvote.users.id == user.id);
    if (upvotedState) {
      setUpvoteState((prev) => {
        return {
          ...prev,
          upvote: true,
        };
      });
    } else {
      let downvotedState = downvotes.some(
        (upvote) => upvote.users.id == user.id
      );
      if (downvotedState) {
        setUpvoteState((prev) => {
          return {
            ...prev,
            downvote: true,
          };
        });
      }
    }
  }, [user]);
  const upvoteRef = useRef(null);
  const downvoteRef = useRef(null);
  useEffect(() => {
    const fetchUser = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (session.session != null) {
        setUser(session.session.user);
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    };
    fetchUser();
  }, []);

  const [upvoteCount, setUpvoteCount] = useState(
    upvotes.length - downvotes.length
  );

  const increaseUpvoteFunctional = async () => {
    if (isLogged == false) {
      toast.error("Please login to upvote");
      return;
    }

    if (upvoteState.upvote == true) {
      setUpvoteState((prev) => {
        return {
          ...prev,
          upvote: false,
        };
      });
      setUpvoteCount((prev) => prev - 1);
      let res = await deleteCommentUpvote(comment_id, user.id);
    } else if (upvoteState.downvote == true) {
      setUpvoteCount((prev) => prev + 2);
      setUpvoteState((prev) => {
        return {
          upvote: true,
          downvote: false,
        };
      });
      let res = await deleteCommentDownvote(comment_id, user.id);
      let res2 = await createCommentUpvote(comment_id, user.id);
    } else if (upvoteState.upvote == false) {
      setUpvoteCount((prev) => prev + 1);
      setUpvoteState((prev) => {
        return {
          upvote: true,
          downvote: false,
        };
      });
      let res = await createCommentUpvote(comment_id, user.id);
    }
  };

  const decreaseUpvoteFunctional = async () => {
    if (isLogged == false) {
      toast.error("Please login to upvote");
      return;
    }

    if (upvoteState.downvote == true) {
      setUpvoteState((prev) => {
        return {
          ...prev,
          downvote: false,
        };
      });
      setUpvoteCount((prev) => prev + 1);
      let res = await deleteCommentDownvote(comment_id, user.id);
    } else if (upvoteState.upvote == true) {
      setUpvoteState((prev) => {
        return {
          upvote: false,
          downvote: true,
        };
      });
      setUpvoteCount((prev) => prev - 2);
      let res = await deleteCommentUpvote(comment_id, user.id);
      let res2 = await createCommentDownvote(comment_id, user.id);
    } else if (upvoteState.downvote == false) {
      setUpvoteState((prev) => {
        return {
          upvote: false,
          downvote: true,
        };
      });
      setUpvoteCount((prev) => prev - 1);
      let res = await createCommentDownvote(comment_id, user.id);
    }
  };

  return (
    <Cont colors={COLORS} className="flex-inline align-center">
      <div
        onClick={increaseUpvoteFunctional}
        ref={upvoteRef}
        className={
          upvoteState.upvote
            ? "vote-container mar-right-8 vote-active"
            : "vote-container mar-right-8"
        }
      >
        <FontAwesomeIcon icon={faArrowUp} className="icon-ssm contrast " />
      </div>

      <p className="black mar-right-8 bold">{upvoteCount}</p>
      <div
        onClick={decreaseUpvoteFunctional}
        ref={downvoteRef}
        className={
          upvoteState.downvote
            ? "vote-container mar-right-8 vote-active"
            : "vote-container mar-right-8"
        }
      >
        <FontAwesomeIcon icon={faArrowDown} className="icon-ssm contrast" />
      </div>
    </Cont>
  );
};

export default Upvotes;
