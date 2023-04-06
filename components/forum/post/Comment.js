import Image from "next/image";
import { useState, useEffect } from "react";
import styled from "styled-components";
import COLORS from "../../../data/colors";
import ReactMarkdown from "react-markdown";
import Upvotes from "./Upvotes";
import supabase from "../../../utils/supabaseClient";
import Editor from "../../Editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faArrowTurnDown,
} from "@fortawesome/free-solid-svg-icons";
import { createPostCommentReply } from "../../../utils/supabaseFunctions";
const Cont = styled.div`
  padding: 8px 12px;
  border-bottom: 1px solid ${(props) => props.colors.ultraLightGrey};
  overflow: auto;
  .grey-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: grey;
  }
  .avatar {
  }
  .x {
    float: left;
  }
  &:nth-of-type(2n) {
    background: ${(props) => props.colors.lightGrey2};
  }
  .reply {
    &:active {
      color: ${(props) => props.colors.black};
    }
  }
  .mde__textarea {
    background-color: ${(props) => props.colors.lightGrey3};
    &:focus {
      background-color: #fff;
    }
  }
  .reply-section {
    border-top: 1px solid ${(props) => props.colors.black};
    border-right: 1px solid ${(props) => props.colors.black};
    border-left: 1px solid ${(props) => props.colors.black};
    padding: 16px;
    border-radius: 8px 8px 0 0;
    height: 50%;
    overflow: hidden;
  }
`;

const Comment = ({
  content,
  upvotes,
  downvotes,
  replies,
  comment_user,
  comment_id,
  post_id,
}) => {
  const [user, setUser] = useState(null);
  const [isUser, setIsUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);
  const [replying, setReplying] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (session.session != null) {
        setUser(session.session.user);
        setIsLogged(true);

        if (session.session.user.id == comment_user.id) {
          setIsUser(true);
        }
      } else {
        setIsLogged(false);
      }
    };
    fetchUser();
  }, []);

  let replyElems = [];
  let [repliesRender, setRepliesRender] = useState(
    replies.length > 3 ? 3 : replies.length
  );
  for (let i = 0; i < repliesRender; i++) {
    replyElems.push(
      <Cont colors={COLORS} className="comment-reply">
        <div className="flex flex-column align-center avatar mar-right-32 x">
          <p className="green bold mar-bottom-8">{replies[i].username}</p>
          <div className="grey-circle"></div>
        </div>
        <div>
          <p className="bold inline-block mar-right-4">Replying to: </p>
          <p className="green underline-hover inline-block bold cursor">
            {username}{" "}
          </p>
          <ReactMarkdown className="markdown">
            {replies[i].content}
          </ReactMarkdown>
        </div>
        <div className="flex">
          <Upvotes
            upvotes={replies[i].upvotes}
            downvotes={replies[i].downvotes}
            user={user}
            comment_id={comment_id}
          />
          <p className="bold contrast inline-block underline-hover cursor reply">
            reply
          </p>
        </div>
      </Cont>
    );
  }

  const createPostCommentReplyFunctional = async () => {
    if (replyText == "") {
      toast.error("Comment can't be empty");
      return false;
    }
    setReplyLoading(true);
    const { state, data } = await createPostCommentReply(
      replyText,
      user.id,
      post_id,
      comment_id
    );
    if (state) {
      setReplyLoading(false);
    }
  };

  return (
    <Cont colors={COLORS}>
      <div className="flex flex-column align-center avatar mar-right-32 x">
        <Image
          className="mar-bottom-8"
          src={`${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_PATH}/${comment_user.avatar_url}`}
          style={{
            objectFit: "cover",
            border: "2px solid #88c1ff",
            borderRadius: "50%",
          }}
          quality="100"
          width={40}
          height={40}
        />
        <p className={isUser ? "light-blue-2 bold" : "green bold"}>
          {comment_user.username}
        </p>
      </div>
      <div>
        <ReactMarkdown className="markdown">{content}</ReactMarkdown>
      </div>
      <div className="flex">
        <Upvotes upvotes={upvotes} downvotes={downvotes} />
        {replying ? (
          <p
            onClick={() => setReplying(false)}
            className="bold  inline-block underline-hover cursor reply"
          >
            cancel reply
          </p>
        ) : (
          <p
            onClick={() => setReplying(true)}
            className="bold contrast inline-block underline-hover cursor reply"
          >
            reply
          </p>
        )}
      </div>
      {replying && (
        <div className="reply-section mar-top-16 box-shadow opacity-anim">
          <p className="bold mar-bottom-8">
            Replying to: <span className="green">{comment_user.username}</span>
          </p>
          <Editor section={replyText} updateSection={setReplyText} />
          <div className="flex flex-end">
            {replyLoading ? (
              <div class="lds-ring-green">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              <div
                onClick={createPostCommentReplyFunctional}
                className="blue-btn-one mar-top-16 flex-inline align-center"
              >
                <h5 className="mar-right-8">Reply</h5>
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  className="white icon-ssm"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {replies.length > 0 && (
        <>
          <div className="mar-bottom-32"></div>
          <div className="mar-left-32">
            <div className="replies-holder">{replyElems}</div>
            {replies.length - repliesRender > 0 && (
              <>
                <div className="mar-bottom-4"></div>
                <p className="light-blue-2 bold underline-hover cursor">
                  {replies.length - repliesRender} more replies
                </p>
              </>
            )}
          </div>
        </>
      )}
    </Cont>
  );
};

export default Comment;
