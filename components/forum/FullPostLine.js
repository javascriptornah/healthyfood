import Link from "next/link";
import { useState, useEffect } from "react";
import COLORS from "../../data/colors";
import styled from "styled-components";
import { fetchDaysDiff } from "../../utils/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faEye } from "@fortawesome/free-solid-svg-icons";
import { fetchPostLastCommentById } from "../../utils/supabaseFunctions";
const Cont = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  background-color: ${(props) => props.colors.lightBeige};
  border-bottom: 1px solid ${(props) => props.colors.grey};
  border-right: 1px solid ${(props) => props.colors.grey};
  border-left: 1px solid ${(props) => props.colors.grey};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.colors.midBeige};
  }
  @media only screen and (max-width: 400px) {
    flex-direction: column;
  }
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
  .post-info {
    background-color: ${(props) => props.colors.midBeige};
    padding: 4px 8px;
    flex: one;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .recent {
    border: 1px solid ${(props) => props.colors.grey};
    padding: 2px 4px;
  }
`;

const FullPostLine = ({
  title,
  forum,
  username,
  date,
  replies,
  views,
  id,
  province,
  region,
}) => {
  const [lastComment, setLastComment] = useState({
    created_at: "",
    username: "",
  });
  useEffect(() => {
    const getLastComment = async () => {
      const res = await fetchPostLastCommentById(id);
      console.log(title);
      console.log("res");
      console.log(res);
      setLastComment((prev) => {
        return {
          created_at: res?.created_at || "",
          username: res?.users?.username,
        };
      });
    };
    getLastComment();
  }, []);

  console.log("last comment");
  console.log(lastComment);
  return (
    <Link
      href={{
        pathname: `/post/${id}`,
        query: { backLink: `/forum/${region}/${province}` },
      }}
    >
      <Cont colors={COLORS}>
        <div className="flex-one">
          <p className="bold blue mar-right-4 text-spec">{title}</p>
          <p className="">
            by <span className="green underline-hover">{username}</span>{" "}
          </p>
        </div>
        <div className="flex-one flex space-between ">
          <div className="flex  align-center mar-right-8">
            <div className="green small mar-right-8">{forum}</div>
            <div className="post-info">
              <div className="flex-inline align-center">
                <FontAwesomeIcon
                  icon={faComment}
                  className="icon-vsmall contrast mar-right-4"
                />
                <p className="small">{replies} replies</p>
              </div>
              <div className="flex-inline align-center">
                <FontAwesomeIcon
                  icon={faEye}
                  className="icon-vsmall contrast mar-right-4"
                />
                <p className="small">{views} views</p>
              </div>
            </div>
          </div>
          <div className="flex  hide-400">
            <div className=" recent mar-right-4 mar-right-8">
              <p className="bold small">Last activity</p>
              <p className="small">
                {lastComment.created_at !== "" &&
                  fetchDaysDiff(new Date(lastComment.created_at))}
              </p>
              <p className=" small">
                by <span className="green">{lastComment.username} </span>
              </p>
            </div>
          </div>
          <div className="flex align-center">
            <p className="small">{fetchDaysDiff(new Date(date))}</p>
          </div>
        </div>
      </Cont>
    </Link>
  );
};

export default FullPostLine;
