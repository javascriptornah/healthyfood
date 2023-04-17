import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styled from "styled-components";
import { AnalyticsWrapper } from "./analytics";
import Head from "next/head";
const Center = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
`;

const Layout = ({ children, value }) => {
  return (
    <>
      <Navbar />

      <Center>
        {children}
        <AnalyticsWrapper />
      </Center>
      <Footer />
    </>
  );
};

export default Layout;
