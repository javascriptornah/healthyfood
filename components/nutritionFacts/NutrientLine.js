import React from "react";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";

const Cont = styled.div`
  background: #fff;
  position: relative;
  display: flex;
  position: relative;
  justify-content: space-between;
  padding: 4px 0px 4px 4px;
  overflow: hidden;
  border-bottom: 1px solid ${(props) => props.colors.grey};
  @keyframes opacity-anim {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.5;
    }
  }
  p {
    z-index: 1;
  }
  @media only screen and (max-width: 300px) {
    p {
      font-size: 12.73px;
    }
  }
  .units {
    margin-right: 16px;
    @media only screen and (max-width: 240px) {
      margin-right: 8px;
    }
  }
  .line-content {
    min-width: 128px;
    justify-content: space-between;
    @media only screen and (max-width: 260px) {
      min-width: 5px;
    }
  }
  .green-bg {
    position: absolute;
    height: 100%;
    //background-color: ${(props) => props.colors.lightGreen};
    top: 0;
    opacity: 0.5;
  }
  .background {
    position: absolute;
    background-color: ${(props) => props.color};
    width: 100%;
    height: 100%;
    opacity: 0.5;
    right: calc(100% - ${(props) => props.dv});
    animation: opacity-anim 1s;
    transition: right 0.25s ease;
  }
`;
const NutrientLine = ({ name, units, dv }) => {
  console.log(dv <= 100);

  return (
    <Cont
      colors={COLORS}
      color={dv <= 100 ? COLORS.lightGreen : COLORS.lightRed}
      dv={dv > 100 ? 100 + "%" : dv + "%"}
    >
      <div
        className="green-bg"
        style={{
          width: dv <= 100 ? `${dv}%` : "100%",
          /*backgroundColor: dv <= 100 ? COLORS.lightGreen : COLORS.lightRed,*/
        }}
      ></div>
      <div className="background opacity-anim-spec"></div>
      <p>{name}</p>
      <div className="flex line-content">
        <p className="units"> {units}</p>
        <div className="flex">
          <p className="bold">{dv} </p>
          <p className="mar-left-2 bold">%DV</p>
        </div>
      </div>
    </Cont>
  );
};

export default NutrientLine;
