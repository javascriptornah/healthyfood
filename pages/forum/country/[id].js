import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import COLORS from "../../../data/colors";
import {
  fetchForumCountryByName,
  fetchPostsByCountryName,
} from "../../../utils/supabaseFunctions";
import CountryHolder from "../../../components/forum/country/CountryHolder";
import Header from "../../../components/forum/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnDown } from "@fortawesome/free-solid-svg-icons";
import CreatePostIcon from "../../../components/forum/CreatePostIcon";
const Cont = styled.div`
  background-color: ${(props) => props.colors.tan};
  padding-top: 40px;
  padding-bottom: 80px;

  .content-holder {
    background: #fff;
    width: 90%;
    margin: auto;
    border-radius: 8px;
    padding: 16px;
    border: 1px solid ${(props) => props.colors.grey};
    @media only screen and (max-width: 600px) {
      width: 100%;
      border-radius: 0px;
      padding: 0 16px 0 0;
    }
  }
`;

export async function getServerSideProps(params) {
  const fetchCountry = await fetchForumCountryByName(params.query.id);
  const fetchCountryPosts = await fetchPostsByCountryName(params.query.id);
  return {
    props: {
      fetchCountry,
      fetchCountryPosts,
    },
  };
}

const Country = ({ fetchCountry, fetchCountryPosts }) => {
  console.log("fetch posts");
  console.log(fetchCountryPosts);
  useEffect(() => {}, []);
  return (
    <Cont colors={COLORS}>
      <div className="content-holder box-shadow-2">
        <Header />
        <div className="flex space-between  align-center flex-wrap">
          <div className="mar-bottom-16">
            <CreatePostIcon
              forum={fetchCountry.name}
              options={fetchCountry.forumStates.map((country) => country.name)}
            />
          </div>
          <div className="mar-bottom-16">
            <Link href={{ pathname: "/forum" }}>
              <div className="black-gradient-btn flex-inline box-shadow align-center">
                <p className="blue bold mar-right-8">Back</p>
                <FontAwesomeIcon
                  icon={faArrowTurnDown}
                  style={{ transform: "rotate(90deg)" }}
                  className="blue icon-ssm"
                />
              </div>
            </Link>
          </div>
        </div>

        <CountryHolder
          country={fetchCountry.name}
          provinces={fetchCountry.forumStates}
          posts={fetchCountryPosts.posts}
        />
      </div>
    </Cont>
  );
};

export default Country;
