import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../data/colors";
import ReactMarkdown from "react-markdown";
import Upvotes from "./Upvotes";

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
`;

const Comment = ({ username, content, upvotes, downvotes, replies, user }) => {
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
          />
          <p className="bold contrast inline-block underline-hover cursor reply">
            reply
          </p>
        </div>
      </Cont>
    );
  }

  return (
    <Cont colors={COLORS}>
      <div className="flex flex-column align-center avatar mar-right-32 x">
        <Image
          className="mar-bottom-8"
          src={`${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_PATH}/${user.avatar_url}`}
          style={{ objectFit: "cover" }}
          quality="100"
          width={40}
          height={40}
        />
        <p className="green bold ">{user.username}</p>
      </div>
      <div>
        <ReactMarkdown className="markdown">{content}</ReactMarkdown>
      </div>
      <div className="flex">
        <Upvotes upvotes={upvotes} downvotes={downvotes} />
        <p className="bold contrast inline-block underline-hover cursor reply"></p>
      </div>
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
