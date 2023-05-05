import { useState, useEffect } from "react";
import { fetchUserByName } from "../../utils/supabaseFunctions";
import { useRouter } from "next/router";
import supabase from "../../utils/supabaseClient";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Header from "../../components/user/header";
import Locations from "../../components/user/Locations";
import Link from "next/link";
import Image from "next/image";
const Cont = styled.div`
  padding: 32px;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  @media only screen and (max-width: 600px) {
    padding: 16px;
  }
  @media only screen and (max-width: 400px) {
    padding: 8px;
  }
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
  .error-page {
    text-align: center;
  }
  .image-holder-2 {
    width: 360px;
    height: 360px;
  }
`;

export async function getServerSideProps({ params }) {
  const userFetch = await fetchUserByName(params.username);
  return {
    props: {
      userFetch,
    },
  };
}

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

  console.log("user fetch");
  console.log(userFetch);
  return (
    <Cont colors={COLORS}>
      {userFetch == null ? (
        <div className="error-page">
          <h3 className="black">This user does not exist</h3>
          <p>Would you like to return to the homepage?</p>
          <Link href="/">
            <p className="light-blue underline">Back to home</p>
          </Link>
          <div className="mar-bottom-32"></div>
          <div className="flex justify-center">
            <div className="relative image-holder-2">
              <Image
                src="/icons/question-mark.png"
                quality="100"
                fill
                priority
                alt="Question mark"
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <Header
            username={userFetch?.username}
            avatar_url={userFetch?.avatar_url}
            created_at={userFetch?.created_at}
            locations={userFetch?.locations.length}
            posts={userFetch?.posts || []}
            comments={userFetch?.comments[0].count}
            bio={userFetch?.about[0]?.bio || ""}
            links={userFetch?.about[0]?.links || []}
            upvotes={userFetch?.upvotes[0].count}
          />
          <div className="mar-bottom-32"></div>
          <div className="grey-line mar-bottom-16"></div>
          <Locations locations={userFetch?.locations || []} />
        </>
      )}
    </Cont>
  );
};

export default User;
