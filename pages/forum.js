import { useState } from "react";
import styled from "styled-components";
import COLORS from "../data/colors";
import Header from "../components/forum/Header";
import ForumContent from "../components/forum/ForumContent";
import { fetchPosts } from "../utils/supabaseFunctions";
import CreatePostIconTwo from "../components/forum/CreatePostIconTwo";
const Cont = styled.div`
  background-color: ${(props) => props.colors.tan};
  padding-top: 40px;
  min-height: 100vh;
  .content-holder {
    background: #fff;
    width: 90%;
    margin: auto;
    border-radius: 8px;
    padding: 16px;
    @media only screen and (max-width: 600px) {
      width: 100%;
      border-radius: 0px;
    }
  }
`;

export async function getServerSideProps() {
  const postsFetch = await fetchPosts();
  return {
    props: {
      postsFetch,
    },
  };
}

const Forum = ({ postsFetch }) => {
  console.log(postsFetch);
  return (
    <Cont colors={COLORS}>
      <div className="content-holder box-shadow-2">
        <Header />
        <div className="mar-bottom-16">
          <CreatePostIconTwo />
        </div>
        <div className="mar-bottom-16"></div>
        <ForumContent posts={postsFetch} />
      </div>
    </Cont>
  );
};

export default Forum;
