import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTurnUp } from "@fortawesome/free-solid-svg-icons";
import { fetchStateLastPostByName } from "../../utils/supabaseFunctions";
import { fetchDaysDiff } from "../../utils/functions";
const Cont = styled.div`
  border-bottom: 1px solid ${(props) => props.colors.grey};
  border-right: 1px solid ${(props) => props.colors.grey};
  border-left: 1px solid ${(props) => props.colors.grey};
  padding: 4px 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.colors.lightBeige};
  &:last-of-type {
    border-radius: 0px;
  }
  &:hover {
    background-color: ${(props) => props.colors.midBeige};
  }
  .subtitles {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .recent-post-status {
    background-color: ${(props) => props.colors.midBeige};
    padding: 4px 8px;
    flex: one;
  }
  .x {
    width: 33%;
  }
`;

const MainLine = ({
  title,
  subTitles,
  postsX,
  link,
  fetchLastPostFunction,
  region_id,
}) => {
  const router = useRouter();
  const path = router.asPath;

  const [lastPost, setLastPost] = useState({
    title: "",
    created_at: "",
    username: "",
    region: "",
  });

  useEffect(() => {
    /*
    const getLastPost = async () => {
      const res = await fetchStateLastPostByName(5);
      setLastPost((prev) => {
        return {
          title: res[0]?.title,
          created_at: res[0]?.created_at,
          username: res[0]?.users.username,
          city: res[0]?.city_id.name,
        };
      });
    }; */

    const getLastPost = async () => {
      const res = await fetchLastPostFunction(region_id);

      setLastPost(res);
    };
    getLastPost();
  }, []);

  console.log("last post");
  console.log(lastPost);
  return (
    <Link
      href={{
        pathname: `/forum/${link}/${title}`,
        query: { backLink: path },
      }}
    >
      <Cont colors={COLORS}>
        <div className="flex-one x">
          <p className="blue bold">{title}</p>
          {subTitles !== null && (
            <div className="subtitles">
              {subTitles.map((subTitle, index) => {
                return (
                  <p key={index} className="inline-block mar-right-4">
                    {subTitle.name},{" "}
                  </p>
                );
              })}
            </div>
          )}
        </div>
        <div className="flex flex-one align-center">
          <p style={{ width: "80px" }}>{postsX} posts</p>
          <div className="recent-post-status">
            <p className="inline-block bold mar-right-4 small">Last post</p>
            <p className="inline-block small">
              by{" "}
              <span className="green underline-hover">{lastPost.username}</span>
            </p>
            <p className="small">{lastPost.region}</p>
            <p className="small">
              {lastPost.created_at !== undefined &&
                fetchDaysDiff(lastPost.created_at)}
            </p>
          </div>
        </div>
        <FontAwesomeIcon
          icon={faTurnUp}
          style={{ transform: "rotate(90deg)" }}
          className="icon-ssm blue mar-right-16 mar-left-16 hide-400"
        />
      </Cont>
    </Link>
  );
};

export default MainLine;
