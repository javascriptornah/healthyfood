import { useRouter } from "next/router";
import styled from "styled-components";
import COLORS from "../../data/colors";
import supabase from "../../utils/supabaseClient";
import Image from "next/image";
import { fetchUserLocations } from "../../utils/supabaseFunctions";
import { useEffect, useState } from "react";
import PostPreview from "./PostPreview";
import toast from "react-hot-toast";
import AccountPreview from "./AccountPreview";
import RecentPosts from "./RecentPosts";
import LinkBio from "./LinkBio";
const Cont = styled.div`
  .default-page {
    background: #fff;
    border: none !important;
    @media only screen and (max-width: 600px) {
      padding-right: 16px;
      padding-left: 8px;
    }
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: flex-start;
    max-width: 1600px;
    margin: 0 auto;
    justify-items: center;

    & > div {
      max-width: 480px;
      @media only screen and (max-width: 600px) {
        max-width: 100%;
        width: 100%;
      }
    }
    @media only screen and (max-width: 1200px) {
      grid-template-columns: 1fr 1fr;
    }
    @media only screen and (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }
  .recent-posts {
    margin-right: 16px;
    @media only screen and (max-width: 1200px) {
      grid-column-start: 2;
      grid-column-end: 3;
      margin: 0;
    }
    @media only screen and (max-width: 900px) {
      grid-column: 1/2;
    }
  }
  .post-activity {
    margin-right: 16px;
    @media only screen and (max-width: 1200px) {
      grid-row-start: 1;
      grid-row-end: 10;
      grid-column: 1/2;
    }
    @media only screen and (max-width: 900px) {
      grid-column: 1/2;
      grid-row: 2/3;
      margin-bottom: 32px;
      margin-right: 0;
    }
  }
  .bio {
    @media only screen and (max-width: 1200px) {
      grid-row-start: 1;
      margin-bottom: 32px;
    }
    @media only screen and (max-width: 900px) {
      grid-column: 1/2;
    }
  }
`;

const UserPage = ({
  user,
  fetchUser,
  locationsFetch,
  userDetails,
  postsFetch,
}) => {
  const [posts, setPosts] = useState(postsFetch);
  const [locations, setLocations] = useState(
    locationsFetch.sort((a, b) => {
      return new Date(a.created_at) > new Date(b.created_at)
        ? -1
        : new Date(a.created_at) < new Date(b.created_at)
        ? 1
        : 0;
    })
  );
  const router = useRouter();

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    toast.success("You are no longer singed in");
    fetchUser();
    router.reload();
  };

  const postsX = [
    {
      forum: "Ontario, Canada",
      username: "rawfatgod",
      title: "Where do I find raw beef fat in Ottawa?",
      content:
        "I’ve been looking all over for grass fed/finished unfrozen beef fat and I cannot find it. \n Do you guys have any idea where I might be able to find some? \n I would really appreciate it and I would send you money in return for it...",
      views: 646,
      comments: 42,
    },
  ];

  return (
    <Cont colors={COLORS}>
      <div className="default-page">
        <div className="flex flex-end">
          <div className="red-btn-one" onClick={logout}>
            <h5>Sign Out</h5>
          </div>
        </div>
        <div className="mar-bottom-32"></div>

        <div className="grid">
          <div className=" recent-posts">
            <PostPreview title="Recent Posts" locations={locations} />
          </div>
          <div className=" post-activity">
            <RecentPosts posts={posts} username={userDetails.username} />
          </div>
          <div className="bio">
            <AccountPreview
              user={user}
              username={userDetails.username}
              bio={userDetails.about[0]?.bio}
              upvotes={userDetails.upvotes[0].count}
              posts={userDetails.posts.length}
              comments={userDetails.comments[0].count}
              links={userDetails.about[0]?.links || []}
            />
          </div>
        </div>
      </div>
    </Cont>
  );
};

export default UserPage;
