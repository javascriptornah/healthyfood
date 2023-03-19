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
  return (
    <Cont colors={COLORS}>
      <div className="default-page">
        <div className="flex align-center space-between">
          <div className="flex align-center">
            <img
              className="mar-right-32"
              src={`${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_PATH}${user.user_metadata.avatar_url}`}
            />
            <h5 className="blue">{user.user_metadata.username}</h5>
          </div>
          <div className="red-btn-one" onClick={logout}>
            <h5>Sign Out</h5>
          </div>
        </div>
        <div className="mar-bottom-32"></div>
        <div className="blue-line mar-bottom-32"></div>
        <div className="grid">
          <PostPreview title="Recent Posts" locations={locations} />
          <RecentPosts />
          <AccountPreview
            username="rawfatgod"
            bio="I enjoy eating raw meat and computer 
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
    </Cont>
  );
};

export default UserPage;
