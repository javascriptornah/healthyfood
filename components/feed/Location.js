import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { fetchDaysDiff } from "../../utils/functions";

const Cont = styled.div`
  background-color: #fff;
  border-top: 1px solid ${(props) => props.colors.grey};
  border-bottom: 1px solid ${(props) => props.colors.grey};
  padding: 16px;
  margin-bottom: 32px;
  .grey-circle {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${(props) => props.colors.redGrey};
  }
  .avatar-holder {
    width: 64px;
    height: 64px;
    overflow: hidden;
    border-radius: 50%;
  }
`;

const Location = ({
  name,
  country,
  state,
  created_at,
  description,
  images,
  username,
  avatar_url,
}) => {
  return (
    <Cont colors={COLORS}>
      <div className="flex space-between">
        <div>
          <div className="flex align-center">
            <h2 className="black mar-right-32">{name}</h2>
            <div className="flex align-center">
              <div className="grey-circle mar-right-8"></div>
              <p className="contrast">{fetchDaysDiff(created_at)}</p>
            </div>
          </div>
          <h5 className="black">
            {state}, {country}{" "}
          </h5>
        </div>

        <div className="flex align-center">
          <Link href={`/user/${username}`}>
            <p className="green bold underline-hover">{username}</p>
          </Link>
          <div className="avatar-holder relative mar-left-16">
            <Image
              src={`${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_PATH}/${avatar_url}`}
              alt="Avatar url"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>

      <div className="image-carousel">
        <div className="image-cont relative"></div>
      </div>
    </Cont>
  );
};

export default Location;
