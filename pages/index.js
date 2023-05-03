import Head from "next/head";
import Google from "../components/google/index";
import styled from "styled-components";
import COLORS from "../data/colors";
import { Toaster } from "react-hot-toast";
import {
  fetchLocations,
  fetchLocation,
  fetchTags,
  createTag,
} from "../utils/supabaseFunctions";
import supabase from "../utils/supabaseClient";
import { useEffect, useState } from "react";
import Suppliers from "../components/google/Suppliers";
import Feed from "../components/feed/index";
const Cont = styled.div`
  min-height: 100vh;
`;

export const getServerSideProps = async () => {
  const locationsFetch = await fetchLocations();
  const tagsFetch = await fetchTags();

  return {
    props: {
      locationsFetch,
      tagsFetch,
    },
  };
};
export default function Home({ locationsFetch, tagsFetch }) {
  const [locations, setLocations] = useState(locationsFetch);
  const [tags, setTags] = useState(tagsFetch);

  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (session.session != null) {
        setUser(session.session.user);
      }
    };
    fetchUser();
  }, []);

  const pushLocation = (location) => {
    setLocations((prev) => {
      return [...prev, location];
    });
  };

  const fetchNewLocation = async (id) => {
    const location = fetchLocation(id);
    location.then((res) => pushLocation(res));
  };

  const addTag = async (name) => {
    const updateTags = async () => {
      setTags(await fetchTags());
    };
    createTag(name).then((res) => res && updateTags());
  };
  const meta = {
    title: "Farm Map",
    description:
      "Find farms in your local area. Soy free eggs, grass fed meats and raw milk finder. You can also share your favorite farms in your area for others to discover, create an account to save posts or interact with other peoples posts. Worldwide farm finder.",
    link: "https://healthyfoodmap.com/",
    type: "website",
    date: "2023-02-14 15:00:00.000",
    image: "/seo/index.PNG",
    keywords:
      "online farm finder, find farm, find farms near me, grassfed meat near me, healthyfoodmap, healthy farms, find farms, farm finder",
  };
  return (
    <>
      <Head>
        <title>{meta.title}</title>
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
      <Cont colors={COLORS}>
        <Google
          locations={locations}
          tagsFetch={tags}
          addTag={addTag}
          fetchNewLocation={fetchNewLocation}
          user={user}
        />
        <Feed />
        <Suppliers />
      </Cont>
    </>
  );
}
