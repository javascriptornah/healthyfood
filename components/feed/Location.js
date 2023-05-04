import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { fetchDaysDiff } from "../../utils/functions";
import Slideshow from "./Slideshow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";
const Cont = styled.div`
  background-color: #fff;
  border-top: 1px solid ${(props) => props.colors.grey};
  border-bottom: 1px solid ${(props) => props.colors.grey};
  padding: 16px;
  margin-bottom: 32px;
  cursor: pointer;
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
  .title-spec {
    &:hover {
      h3 {
        text-decoration: underline;
      }
    }
  }
  .icon-med {
    transition: top 0.5s ease;
    top: 0;
    &:hover {
      top: -2px;
    }
  }
`;

const Location = ({
  name,
  id,
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
      <div className="flex flex-wrap space-between ">
        <Link href={`/farm/${id}`}>
          <div className="mar-bottom-16 title-spec">
            <div className="flex align-center">
              <h3 className="black mar-right-16">{name}</h3>
              <div className="flex align-center">
                <div className="grey-circle mar-right-8"></div>
                <p className="contrast">{fetchDaysDiff(created_at)}</p>
              </div>
            </div>
            <h5 className="black">
              {state}, {country}{" "}
            </h5>
          </div>
        </Link>

        <div className="flex align-center mar-bottom-16">
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
      {images.length > 0 && <Slideshow images={images} />}
      <Link href={`/farm/${id}`}>
        <div className="flex justify-end relative">
          <FontAwesomeIcon
            icon={faArrowTurnUp}
            className="black icon-med relative"
            style={{ transform: "rotate(90deg)" }}
          />
        </div>
      </Link>
    </Cont>
  );
};

export default Location;
