import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../data/colors";
import PostHolder from "../PostHolder";
const Cont = styled.div`
  border-radius: 8px;
  @media only screen and (max-width: 600px) {
    border-radius: 0px;
  }
  .title-spec {
    border-radius: 8px 8px 0 0;
    @media only screen and (max-width: 600px) {
      border-radius: 0;
    }
  }
`;
const CountryHolder = ({ province, posts }) => {
  return (
    <Cont colors={COLORS}>
      <PostHolder posts={posts} title={province} />
    </Cont>
  );
};

export default CountryHolder;
