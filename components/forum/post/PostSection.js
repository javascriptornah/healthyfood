import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";

const Cont = styled.div``;
const PostSection = ({
  content,
  title,
  username,
  country,
  state,
  city,
  date,
}) => {
  return (
    <Cont colors={COLORS} className="grey-border">
      <div className="flex align-center space-between">
        <div>
          <p className="inline-block mar-right-8 bold">{title}</p>
          <p className="inline-block">
            Posted by <span className="light-blue-2 bold">{username}</span>
          </p>
        </div>
        <FontAwesomeIcon icon={faBookmark} className=" cursor grey" />
      </div>
      <div className="padding-16"></div>
    </Cont>
  );
};

export default PostSection;
