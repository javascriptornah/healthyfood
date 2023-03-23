import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
const Cont = styled.div`
  border: 1px solid ${(props) => props.colors.grey};
  background-color: #fff;
  border-radius: 8px;
  padding: 12px 8px;
  overflow: auto;
  margin-bottom: 16px;
  transition: box-shadow 0.25s ease;
  display: flex;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
  &:hover {
    box-shadow: none;
    border: 1px solid ${(props) => props.colors.darkBlue};
    h5 {
      text-decoration: underline;
    }
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
}) => {
  const tagElems = tags.map((tag, index) => {
    return (
      <div key={index} className="tag-five">
        <p>{tag}</p>
      </div>
    );
  });

  return (
    <Link
      href={{
        pathname: `/farm/${name}`,
      }}
    >
      <Cont colors={COLORS} className="box-shadow-2 cursor opacity-anim">
        <p className="green bold green-circle mar-right-16 mar-bottom-8">
          {index + 1}
        </p>
        <div>
          <div className="mar-bottom-8">
            <h5 className="black inline-block mar-right-16">{name}</h5>
            <p className="contrast inline-block">{address}</p>
          </div>

          <div className="grey-line mar-bottom-8"></div>
          <div className="">
            {url !== null && (
              <Image
                src={url}
                width={200}
                height={120}
                style={{
                  objectFit: "cover",
                  borderRadius: "0 0 0 8px",
                  flexShrink: "0",
                  float: "left",
                }}
                className="mar-right-8 image-100"
                alt={name}
              />
            )}
            <ReactMarkdown className="markdown mar-bottom-16">
              {description}
            </ReactMarkdown>
            <div className="right-content">
              <div className="flex-inline  tags align-start flex-wrap">
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
