import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnDown } from "@fortawesome/free-solid-svg-icons";
import COLORS from "../../data/colors";
import { fetchPostById } from "../../utils/supabaseFunctions";
import Header from "../../components/forum/Header";
import PostSection from "../../components/forum/post/PostSection";
import ReplySection from "../../components/forum/post/ReplySection";
import CommentSection from "../../components/forum/post/CommentSection";
import comments from "../../data/comments.json";
const Cont = styled.div`
  background-color: ${(props) => props.colors.tan};
  padding-top: 40px;
  padding-bottom: 80px;

  .content-holder {
    background: #fff;
    width: 90%;
    margin: auto;
    border-radius: 8px;
    padding: 16px;
    border: 1px solid ${(props) => props.colors.grey};
    @media only screen and (max-width: 600px) {
      width: 100%;
      border-radius: 0px;
      padding: 0;
    }
  }
`;

export async function getServerSideProps(params) {
  const post = await fetchPostById(params.query.id);
  return {
    props: {
      post,
    },
  };
}

const Post = ({ post }) => {
  console.log(comments);
  return (
    <Cont colors={COLORS}>
      <div className="content-holder box-shadow-2">
        <Header />
        <div className="flex justify-end mar-bottom-16">
          <Link href={{ pathname: `/forum` }}>
            <div className="black-gradient-btn flex-inline box-shadow align-center">
              <p className="blue bold mar-right-8">Back</p>
              <FontAwesomeIcon
                icon={faArrowTurnDown}
                style={{ transform: "rotate(90deg)" }}
                className="blue icon-ssm"
              />
            </div>
          </Link>
        </div>
        <PostSection
          content={post.content}
          title={post.title}
          username={post.user_id.username}
          country={post.country_id.name}
          province={post.state_id.name}
          city={post.city_id?.name}
          date={post.created_at}
        />
        <div className="ssm-spacer"></div>
        <ReplySection username={post.user_id.username} />
        <div className="ssm-spacer"></div>
        <CommentSection comments={comments} />
      </div>
    </Cont>
  );
};

export default Post;
