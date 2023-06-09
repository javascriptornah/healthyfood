import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import COLORS from "../../data/colors";
import styled from "styled-components";
import { fetchDaysDiff } from "../../utils/functions";
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
  .title {
    width: 33%;
  }
`;

const PostLine = ({ title, forum, username, date, id }) => {
  const router = useRouter();
  const path = router.asPath;

  let date2 = new Date(date);
  let hoursMin = date2.getUTCHours() + ":" + date2.getUTCMinutes();

  const [dateString, setDateString] = useState(
    new Date(date).toLocaleDateString("en-US")
  );
  return (
    <Link
      href={{
        pathname: `/post/${id}`,
        query: { backLink: path.replace("%3", "?") },
      }}
    >
      <Cont colors={COLORS}>
        <div className="title">
          <p className="bold blue inline-block mar-right-4 text-spec">
            {title}
          </p>
          <p className="inline-block">
            by <span className="green underline-hover">{username}</span>{" "}
          </p>
        </div>
        <p className="mar-right-8">{forum}</p>
        <p className="small">{fetchDaysDiff(date2)}</p>
      </Cont>
    </Link>
  );
};

export default PostLine;
