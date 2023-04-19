import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faEye, faComment } from "@fortawesome/free-solid-svg-icons";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

const Cont = styled.div``;
const PostSection = ({
  content,
  title,
  username,
  country,
  state,
  city,
  date,
  views,
  comments,
  upvotes,
  downvotes,
}) => {
  let date2 = new Date(date);
  let hoursMin = date2.getUTCHours() + ":" + date2.getUTCMinutes();
  //let dateString = new Date(date).toLocaleDateString();
  const [dateString, setDateString] = useState(
    new Date(date).toLocaleDateString("en-US")
  );
  return (
    <Cont colors={COLORS} className="grey-border box-shadow-2">
      <div className="flex align-center space-between">
        <div>
          <p className="inline-block mar-right-8 bold">{title}</p>
          <p className="inline-block">
            Posted by{" "}
            <Link href={`/user/${username}`}>
              <span className="light-blue-2 bold underline-hover">
                {username}
              </span>
            </Link>
          </p>
        </div>
        <FontAwesomeIcon icon={faBookmark} className=" cursor grey" />
      </div>
      <p className="small mar-bottom-4">
        {hoursMin} - {dateString}
      </p>
      <div className="grey-line "></div>
      <ReactMarkdown className="padding-16 base-markdown">
        {content}
      </ReactMarkdown>
      <div className="flex-inline align-center">
        <FontAwesomeIcon icon={faEye} className="black mar-right-8 icon-ssm" />
        <p className="black bold">{views}</p>
        <div className="mar-right-16"></div>
        <FontAwesomeIcon
          icon={faComment}
          className="black mar-right-8 icon-ssm"
        />
        <p className="black bold">{comments}</p>
      </div>
    </Cont>
  );
};

export default PostSection;
