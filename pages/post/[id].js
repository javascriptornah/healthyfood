import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnDown } from "@fortawesome/free-solid-svg-icons";
import COLORS from "../../data/colors";
import {
  fetchPostById,
  createPostComment,
  deleteComment,
} from "../../utils/supabaseFunctions";
import Header from "../../components/forum/Header";
import PostSection from "../../components/forum/post/PostSection";
import ReplySection from "../../components/forum/post/ReplySection";
import CommentSection from "../../components/forum/post/CommentSection";
import supabase from "../../utils/supabaseClient";
import toast, { Toaster } from "react-hot-toast";
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
      padding: 8px 12px;
    }
  }
`;

export async function getServerSideProps(params) {
  const postFetch = await fetchPostById(params.query.id);
  return {
    props: {
      postFetch,
    },
  };
}

const Post = ({ postFetch }) => {
  const [post, setPost] = useState(postFetch);
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();
  const backLink = router.query.backLink;
  const [comments, setComments] = useState([...postFetch.comments].reverse());
  console.log("comments");
  console.log([...postFetch.comments].reverse());

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

  const createPostCommentFunctional = async (content, setLoading, setText) => {
    setLoading(true);
    const comment = await createPostComment(content, user.id, post.id);
    console.log(comment);
    setLoading(false);
    toast.success("Comment posted!");
    setText("");
    setComments((comments) => {
      return [comment, ...comments];
    });
    return true;
  };

  const deleteCommentFunctional = async (id, setLoading, hidePopup) => {
    setLoading(true);
    const res = await deleteComment(id);
    if (res) {
      toast.success("Comment deleted");
      setComments((comments) => {
        return comments.filter((comment) => comment.id !== id);
      });
    } else {
      toast.error("Error deleting comment");
    }
    hidePopup();
    setLoading(false);
  };

  return (
    <Cont colors={COLORS}>
      <Toaster />
      <div className="content-holder box-shadow-2 forum-page">
        <Header />
        <div className="flex justify-end mar-bottom-16">
          <Link href={{ pathname: backLink, query: {} }}>
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
          username={post?.user_id?.username}
          country={post.country_id?.name}
          province={post.state_id?.name}
          city={post.city_id?.name}
          date={post.created_at}
          views={434}
          comments={post.comments.length}
          upvotes={post.upvotes}
          downvotes={post.downvotes}
        />
        <div className="ssm-spacer"></div>
        <ReplySection
          username={user?.user_metadata.username}
          createPostCommentFunctional={createPostCommentFunctional}
        />
        <div className="ssm-spacer"></div>
        <CommentSection
          comments={comments}
          post_id={post.id}
          deleteCommentFunctional={deleteCommentFunctional}
        />
      </div>
    </Cont>
  );
};

export default Post;
