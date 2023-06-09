import { useState } from "react";
import styled from "styled-components";
import COLORS from "../data/colors";
import Header from "../components/forum/Header";
import ForumContent from "../components/forum/ForumContent";
import {
  fetchPosts,
  fetchForumCountries,
  fetchRecentCountryPosts,
} from "../utils/supabaseFunctions";
import supabase from "../utils/supabaseClient";
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
  const { data, data2 } = await fetchForumCountries();
  const recentPosts = await fetchRecentCountryPosts();
  const { data: europePosts } = await supabase
    .from("get_europe_post_count")
    .select();
  return {
    props: {
      postsFetch,
      data,
      data2,
      recentPosts,
      europePosts: europePosts[0].count,
    },
  };
}

const Forum = ({ postsFetch, data, data2, recentPosts, europePosts }) => {
  const [posts, setPosts] = useState(
    postsFetch.sort((a, b) => {
      let aDate = new Date(a.created_at).getTime();
      let bDate = new Date(b.created_at).getTime();
      return aDate > bDate ? 1 : aDate < bDate ? 0 : -1;
    })
  );

  return (
    <Cont colors={COLORS}>
      <div className="content-holder box-shadow-2">
        <Header />
        <div className="mar-bottom-16">
          <CreatePostIconTwo />
        </div>
        <div className="mar-bottom-16"></div>
        <ForumContent
          posts={posts}
          countries={data}
          europe={data2}
          recentPosts={recentPosts}
          europePosts={europePosts}
        />
      </div>
    </Cont>
  );
};

export default Forum;
