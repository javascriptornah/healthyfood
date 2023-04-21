import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
const Cont = styled.div``;

const Link = ({ url, icon, text, color }) => {
  return (
    <Link href={url}>
      <Cont colors={COLORS}></Cont>
    </Link>
  );
};

export default Link;
