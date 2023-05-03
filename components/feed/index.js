import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";

const Cont = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  .header-spec {
  }
`;
const Index = () => {
  return (
    <Cont colors={COLORS}>
      <div className="header-spec">hello</div>
    </Cont>
  );
};

export default Index;
