import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { fetchDaysDiff } from "../../utils/functions";
const Cont = styled.div``;
const Location = ({
  name,
  country,
  state,
  created_at,
  description,
  images,
}) => {
  return <Cont colors={COLORS}></Cont>;
};

export default Location;
