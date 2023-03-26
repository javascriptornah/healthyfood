import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import MainSection from "./MainSection";
import statesFetch from "../../data/locations/States.json";
import provincesFetch from "../../data/locations/Provinces.json";
import euroCountriesFetch from "../../data/locations/EuroCountries.json";
import PostsSection from "./PostsSection";
const Cont = styled.div`
  border-radius: 8px;
  @media only screen and (max-width: 600px) {
    border-radius: 0px;
  }
`;
const ForumContent = ({ postsFetch }) => {
  const [states, setStates] = useState(statesFetch.map((state) => state.name));
  const [provinces, setProvinces] = useState(
    Object.entries(provincesFetch).map(([key, val]) => val)
  );
  const [euroCountries, setEuroCountries] = useState(
    euroCountriesFetch.map((country) => country.name)
  );

  const posts = [
    {
      title: "Where to find meat in germany",
      forum: "Germany",
      poster: "rawfatgod",
      date: new Date(),
    },
    {
      title: "Where to find meat in canada",
      forum: "Canada",
      poster: "rawfatgod",
      date: new Date(),
    },
    {
      title: "Where to find meat in canada",
      forum: "Canada",
      poster: "rawfatgod",
      date: new Date(),
    },
    {
      title: "Where to find meat in germany",
      forum: "Germany",
      poster: "rawfatgod",
      date: new Date(),
    },
    {
      title: "Where to find meat in germany",
      forum: "Germany",
      poster: "rawfatgod",
      date: new Date(),
    },
    {
      title: "Where to find meat in germany",
      forum: "Germany",
      poster: "rawfatgod",
      date: new Date(),
    },
  ];

  return (
    <Cont colors={COLORS}>
      <MainSection
        states={states}
        provinces={provinces}
        euroCountries={euroCountries}
      />
      <PostsSection title="Recent Posts" posts={postsFetch} />
    </Cont>
  );
};

export default ForumContent;
