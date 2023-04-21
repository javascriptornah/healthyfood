import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
const Cont = styled.div`
  border: 1px solid ${(props) => props.colors.grey};
  background-color: ${(props) => props.colors.lightBeige};
  border-radius: 8px;

  overflow: auto;
  margin-bottom: 16px;
  transition: box-shadow 0.25s ease;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
  &:hover {
    box-shadow: none;
    border: 1px solid ${(props) => props.colors.darkPink};
    h5 {
      text-decoration: underline;
    }
  }
  .circle-red {
    background-color: ${(props) => props.colors.darkPink};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 16px;
    p {
      color: ${(props) => props.colors.lightBeige};
    }
  }
  .image {
    position: relative;
    width: 100%;
    height: 200px;
  }
  .markdown {
    max-height: 320px;
    overflow: hidden;
  }
  .tag-five {
    background-color: ${(props) => props.colors.lightBeige};
  }
`;
const Location = ({
  name,
  address,
  created_at,
  url,
  tags,
  description,
  index,
  id,
}) => {
  const tagElems = tags.map((tag, index) => {
    return (
      <div key={index} className="tag-five ">
        <p>{tag}</p>
      </div>
    );
  });

  return (
    <Link
      href={{
        pathname: `/farm/${id}`,
      }}
    >
      <Cont colors={COLORS} className="box-shadow cursor opacity-anim">
        <div className="flex align-center  padding-x-12 padding-y-8">
          <div className="circle-red box-shadow-2">
            <p className="bold">{index + 1}</p>
          </div>
          <h5 className=" inline-bloc text-shadow-2">{name}</h5>
        </div>
        <div className="red-line mar-bottom-8"></div>
        <div className="mar-bottom-8">
          <p className="contrast inline-block padding-x-12">{address}</p>
        </div>

        <div>
          <div className="">
            {url !== null && (
              <div className="image">
                <Image
                  src={url}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                  className="mar-right-8 image-100"
                  alt={name}
                />
              </div>
            )}
            <ReactMarkdown className="markdown padding-x-12 padding-y-16">
              {description}
            </ReactMarkdown>
            <div className="right-content">
              <div className="flex-inline  tags align-start flex-wrap padding-x-12 padding-y-8">
                {tagElems}
              </div>
            </div>
          </div>
        </div>
      </Cont>
    </Link>
  );
};

export default Location;
