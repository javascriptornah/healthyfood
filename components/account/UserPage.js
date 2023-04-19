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
const Cont = styled.div`
  .default-page {
    background: #fff;
    border: none !important;
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

const UserPage = ({ user, fetchUser }) => {
  const [locations, setLocations] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchLocationsWrapper = async () => {
      let locationsFetch = await fetchUserLocations(user.id);
      locationsFetch = locationsFetch.sort((a, b) => {
        return new Date(a.created_at) > new Date(b.created_at)
          ? -1
          : new Date(a.created_at) < new Date(b.created_at)
          ? 1
          : 0;
      });
      setLocations(locationsFetch);
    };
    fetchLocationsWrapper();
  }, []);

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
        "I’ve been  looking all over for grass fed/finished unfrozen beef fat and I cannot find it. \n Do you guys have any idea where I might be able to find some? \n I would really appreciate it and I would send you money in return for it...",
      views: 646,
      comments: 42,
    },
  ];
  console.log(user);
  return (
    <Cont colors={COLORS}>
      <div className="default-page">
        <div className="flex align-center space-between">
          <div className="flex align-center">
            <img
              className="mar-right-32"
              src={`${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_PATH}${user.user_metadata.avatar_url}`}
            />
            <div>
              <h5 className="blue">{user.user_metadata.username}</h5>
              <p className="contrast">{user.email}</p>
            </div>
          </div>
          <div className="red-btn-one" onClick={logout}>
            <h5>Sign Out</h5>
          </div>
        </div>
        <div className="mar-bottom-32"></div>
        <div className="blue-line mar-bottom-32"></div>
        <div className="grid">
          <div className=" recent-posts">
            <PostPreview title="Recent Posts" locations={locations} />
          </div>
          <div className=" post-activity">
            <RecentPosts posts={postsX} />
          </div>
          <div className="bio">
            <AccountPreview
              username="rawfatgod"
              bio="I enjoy eating steak and computer 
 programing. I am offering health
consultation for $50 hour. DM me 
formore info."
              upvotes="675"
              posts="65"
              comments="99"
              links={[
                "https://www.youtube.com/channel/UC9M82W-V9YlK5-00KQ4QeJA",
                "https://www.youtube.com/channel/UC9M82W-V9YlK5-00KQ4QeJA",
              ]}
            />
          </div>
        </div>
      </div>
    </Cont>
  );
};

export default UserPage;
