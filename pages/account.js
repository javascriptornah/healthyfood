import Head from "next/head";
import { useState, useEffect } from "react";
import supabase from "../utils/supabaseClient";
import styled from "styled-components";
import COLORS from "../data/colors";
import NotLogged from "../components/account/notlogged";
import UserPage from "../components/account/UserPage";
import { Toaster } from "react-hot-toast";
import {
  fetchUserById,
  fetchUserPostsPreviewById,
} from "../utils/supabaseFunctions";
import UserPageLoading from "../components/account/UserPageLoading";

const Cont = styled.div`
  .default-page {
    background: #fff;
    border: 1px solid ${(props) => props.colors.grey};
  }
  .title-spec {
    padding: 16px;
  }
  .text-content {
    background-color: ${(props) => props.colors.lightBeige};
    padding: 16px;
  }
`;

export async function getServerSideProps() {
  const { data: session } = await supabase.auth.getSession();

  return {
    props: {
      session,
    },
  };
}
const Account = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [posts, setPosts] = useState([]);
  const fetchUser = async () => {
    const { data: session } = await supabase.auth.getSession();
    if (session.session != null) {
      setUser(session.session.user);

      const userInfo = await fetchUserById(session.session.user.id);
      const postsFetch = await fetchUserPostsPreviewById(
        session.session.user.id
      );
      setPosts(postsFetch);
      setUserDetails(userInfo);
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);
  const meta = {
    title: "Account",
    description:
      "Healthyfoodmap account page. See your saved posts, created posts and account details.",
    link: "https://healthyfoodmap.com/account",
    type: "website",
    date: "2023-04-20 15:00:00.000",
    image: "/seo/account.PNG",
    keywords:
      "online farm finder, find farm, find farms near me, grassfed meat near me, healthyfoodmap, healthy farms, find farms, farm finder",
  };

  console.log(user);
  return (
    <Cont colors={COLORS}>
      <Head>
        <meta name="robots" content="follow, index" />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Healthyfoodmap" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta property="article:published_time" content={meta.date} />
        <link rel="canonical" href={meta.image} />
        <meta property="og:url" content={meta.link} />
        <meta name="keywords" content={meta.keywords} />

        <meta name="description" content={meta.description} />
      </Head>
      <Toaster />

      {loading ? (
        <UserPageLoading />
      ) : (
        <>
          {isLogged ? (
            <UserPage
              user={user}
              fetchUser={fetchUser}
              locationsFetch={userDetails.locations}
              userDetails={userDetails}
              postsFetch={posts}
            />
          ) : (
            <NotLogged />
          )}
        </>
      )}
    </Cont>
  );
};

export default Account;
