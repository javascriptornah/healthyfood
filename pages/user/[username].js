import { useState, useEffect } from "react";
import { fetchUserByName } from "../../utils/supabaseFunctions";
import { useRouter } from "next/router";
import supabase from "../../utils/supabaseClient";
import styled from "styled-components";
export async function getServerSideProps({ params }) {
  const userFetch = await fetchUserByName(params.username);
  return {
    props: {
      userFetch,
    },
  };
}

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
const User = ({ userFetch }) => {
  const router = useRouter();
  const username = router.query.username;
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const fetchUser = async () => {
    const { data: session } = await supabase.auth.getSession();
    if (session.session != null) {
      setUser(session.session.user);
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const meta = {
    title: "Account",
    description: `${username}'s account page. See ${username}'s posts, or send them a message!`,
    link: `https://healthyfoodmap.com/user/${username}`,
    type: "website",
    date: "2023-04-17 15:00:00.000",
    image: "/seo/account.PNG",
    keywords:
      "online farm finder, find farm, find farms near me, grassfed meat near me, healthyfoodmap, healthy farms, find farms, farm finder",
  };
  return <div>[username]</div>;
};

export default User;
