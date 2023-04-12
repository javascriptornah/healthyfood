import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Mainline from "./Mainline";
const Cont = styled.div`
  border-radius: 8px 8px 0px 0px;
  .title-spec {
    border-radius: 8px 8px 0 0;
    border: 1px solid ${(props) => props.colors.darkPink};
    padding: 4px 8px;
    background-color: ${(props) => props.colors.tan};
    @media only screen and (max-width: 600px) {
      border-radius: 0px;
    }
  }
`;
const ForumContent = ({ countries, europe, recentPosts }) => {
  const [res, setRes] = useState(recentPosts);
  console.log("resss");
  console.log(res);
  console.log("resss");

  const [showStates, setShowStates] = useState(
    countries[1].forumStates.slice(0, 6)
  );
  const [showProvinces, setShowProvinces] = useState(
    countries[0].forumStates.slice(0, 6)
  );
  const [showEuroCountries, setShowEuroCountries] = useState(
    europe.forumCountries.slice(0, 6)
  );

  const [postObj, setPostObj] = useState({
    username: "admin1",
    category: "California",
    date: new Date(),
  });

  return (
    <Cont colors={COLORS}>
      <div className="title-spec">
        <h5 className="red text-shadow-red">Food Sourcing</h5>
      </div>

      <Mainline
        title="United States"
        subTitles={showStates}
        postsX={countries[1].posts[0].count}
        lastPostDetails={postObj}
        link="country"
      />
      <Mainline
        title="Canada"
        subTitles={showProvinces}
        postsX={countries[0].posts[0].count}
        lastPostDetails={recentPosts}
        link="country"
      />
      <Mainline
        title="Europe"
        subTitles={showEuroCountries}
        postsX={127}
        lastPostDetails={postObj}
        link="country"
      />
    </Cont>
  );
};

export default ForumContent;
