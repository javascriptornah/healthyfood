import { useRouter } from "next/router";
import styled from "styled-components";
import COLORS from "../../data/colors";
import supabase from "../../utils/supabaseClient";
import Image from "next/image";
import { fetchUserLocations } from "../../utils/supabaseFunctions";
import { useEffect, useState } from "react";
import PostPreview from "./PostPreview";
import toast from "react-hot-toast";
import RecentPosts from "./RecentPosts";
import LinkBio from "./LinkBio";
import AccountPreview from "./loading/AccountPreview";
const Cont = styled.div`
  .default-page {
    background: #fff;
    border: none !important;
    @media only screen and (max-width: 600px) {
      padding-right: 16px;
      padding-left: 8px;
    }
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: flex-start;
    max-width: 1600px;
    margin: 0 auto;
    justify-items: center;

    & > div {
      max-width: 480px;
      @media only screen and (max-width: 600px) {
        max-width: 100%;
        width: 100%;
      }
    }
    @media only screen and (max-width: 1200px) {
      grid-template-columns: 1fr 1fr;
    }
    @media only screen and (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }
  .recent-posts {
    margin-right: 16px;
    @media only screen and (max-width: 1200px) {
      grid-column-start: 2;
      grid-column-end: 3;
      margin: 0;
    }
    @media only screen and (max-width: 900px) {
      grid-column: 1/2;
    }
  }
  .post-activity {
    margin-right: 16px;
    @media only screen and (max-width: 1200px) {
      grid-row-start: 1;
      grid-row-end: 10;
      grid-column: 1/2;
    }
    @media only screen and (max-width: 900px) {
      grid-column: 1/2;
      grid-row: 2/3;
      margin-bottom: 32px;
      margin-right: 0;
    }
  }
  .bio {
    @media only screen and (max-width: 1200px) {
      grid-row-start: 1;
      margin-bottom: 32px;
    }
    @media only screen and (max-width: 900px) {
      grid-column: 1/2;
    }
  }

  .placeholder {
    width: 100%;
    height: 800px;
  }
`;

const UserPage = ({}) => {
  return (
    <Cont colors={COLORS}>
      <div className="default-page">
        <div className="flex flex-end">
          <div className="red-btn-one">
            <h5>Sign Out</h5>
          </div>
        </div>
        <div className="mar-bottom-32"></div>

        <div className="grid">
          <div className=" recent-posts placeholder">
            <div className="red-title gradient mar-bottom-16">
              <h4 className="mar-right-16">Recent Posts</h4>
            </div>
            <div className="placeholder grey-border-2 gradient gradient"></div>
          </div>
          <div className=" post-activity placeholder">
            <div className="red-title mar-bottom-16">
              <h4 className="mar-right-16 ">Forum Posts</h4>
            </div>
            <div className="placeholder grey-border-2 gradient"></div>
          </div>
          <div className="bio placeholder">
            <AccountPreview />
          </div>
        </div>
      </div>
    </Cont>
  );
};

export default UserPage;
