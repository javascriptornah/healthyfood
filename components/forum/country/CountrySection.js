import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../data/colors";
import Mainline from "../Mainline";

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
  .province-holder {
    max-height: 600px;
    overflow: auto;
    @media only screen and (max-width: 600px) {
      max-height: 50vh;
    }
  }
`;
const ForumContent = ({ country, provinces }) => {
  const [postObj, setPostObj] = useState({
    username: "admin1",
    category: "California",
    date: new Date(),
  });
  console.log("provinces");
  console.log(provinces);

  const provinceLines = provinces.map((province, index) => {
    return (
      <Mainline
        key={index}
        state_id={province.id}
        title={province.name}
        link="province"
        postsX={province.posts[0].count}
        lastPostDetails={postObj}
        subTitles={null}
        backLink={country}
      />
    );
  });
  return (
    <Cont colors={COLORS}>
      <div className="title-spec">
        <h5 className="red text-shadow-red">{country}</h5>
      </div>
      <div className="province-holder small-scrollbar">{provinceLines}</div>
    </Cont>
  );
};

export default ForumContent;
