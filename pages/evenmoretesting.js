import { useEffect, useState } from "react";
import styled from "styled-components";
const Cont = styled.div`
  p {
    border: 1px solid black;
  }
`;

const Evenmoretesting = () => {
  const fetchFunc = async () => {
    let res = await fetch("/api/location/getAddress", {
      method: "POST",
      body: "159 Country Meadow Drive",
    });
    let resX = await res.json();
    console.log("k");
    console.log(resX);
  };
  return (
    <Cont>
      <p onClick={fetchFunc}>hello sir</p>
    </Cont>
  );
};

export default Evenmoretesting;
