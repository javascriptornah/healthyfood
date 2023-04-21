import Head from "next/head";
import dynamic from "next/dynamic";
const Fishmap = dynamic(() => import("../components/fishmap/index"), {
  ssr: false,
});

import styled from "styled-components";
import COLORS from "../data/colors";
import { Toaster } from "react-hot-toast";
import {
  fetchOceans,
  fetchSeas,
  fetchPollution,
  fetchOceanFish,
} from "../utils/supabaseFunctions";
import supabase from "../utils/supabaseClient";
import { useEffect, useState } from "react";
const Cont = styled.div`
  min-height: 100vh;
`;

export const getServerSideProps = async () => {
  const oceansFetch = await fetchOceans();
  const seasFetch = await fetchSeas();
  const pollutionFetch = await fetchPollution();
  const fishFetch = await fetchOceanFish();
  return {
    props: {
      oceansFetch,
      seasFetch,
      pollutionFetch,
      fishFetch,
    },
  };
};
export default function Home({
  oceansFetch,
  seasFetch,
  pollutionFetch,
  fishFetch,
}) {
  const [oceans, setOceans] = useState(oceansFetch);
  const [seas, setSeas] = useState(seasFetch);
  const [pollution, setPollution] = useState(pollutionFetch);
  const [fish, setFish] = useState(fishFetch);
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

  const meta = {
    title: "Fish Map",
    description:
      "Find pollution across all the oceans, find out which oceans are more polluted in certain areas, and what the causes of the pollution is. For example, the exact details about oils spills in certain regions or environmental disasters that impact the fish quantity and sustainability. This can help you make healthy choices when deciding what fish to eat for you and your family.",
    link: "https://healthyfoodmap.com/fishmap",
    type: "website",
    date: "2023-02-21 15:00:00.000",
    image: "/seo/index.PNG",
    keywords:
      "what fish are healthiest to eat, healthy fish to eat, most polluted fish, ",
  };
  console.log(fish);
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
      <Fishmap
        oceansFetch={oceans}
        seasFetch={seas}
        pollutionFetch={pollution}
        fishFetch={fish}
      />
    </Cont>
  );
}
