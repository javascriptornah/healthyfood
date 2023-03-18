import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
const Cont = styled.div`
  border: 1px solid ${(props) => props.colors.grey};
  border-radius: 8px;
  max-width: 400px;
  margin: 0 auto;
  padding: 8px;
`;

const CaughtHere = ({ seaName, fish }) => {
  const fishElems = fish.map((innerFish, index) => {
    return (
      <Link key={index} href={`/fish/${innerFish.fish_id.name}`}>
        <div className="flex align-center">
          <div className="redirect-index">
            <p>{index + 1}</p>
          </div>
          <div className="redirect-box box-shadow-2">
            <p>{innerFish.fish_id.name} </p>
            <FontAwesomeIcon icon={faArrowRight} className="black icon-ssm" />
          </div>
        </div>
      </Link>
    );
  });
  return (
    <Cont colors={COLORS} className="box-shadow-2 gradient-light-blue">
      <div className="center-inline mar-bottom-16">
        <h4 className="blue underline">Fish Caught In The {seaName}</h4>
      </div>

      <div className="flex flex-wrap">{fishElems} </div>
    </Cont>
  );
};

export default CaughtHere;
