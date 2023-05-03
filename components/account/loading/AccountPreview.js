import Image from "next/image";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faNewspaper,
  faComment,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import COLORS from "../../../data/colors";

const Cont = styled.div`
  padding: 0;
  background-color: ${(props) => props.colors.tan};
  .title-specx {
    background-color: ${(props) => props.colors.offWhite};
    padding: 4px;
    border-bottom: 1px solid ${(props) => props.colors.darkBlue};
    border-radius: 8px 8px 0 0;
  }
  .bio {
    padding: 16px;
    padding-top: 0;
  }
  .info {
    border-top: 2px solid ${(props) => props.colors.darkPink};
    border-bottom: 2px solid ${(props) => props.colors.darkPink};
    padding: 8px 12px 0;
    background-color: ${(props) => props.colors.lightBeige};
  }
  .image-section {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .image-cont {
    border-radius: 50%;
    overflow: hidden;
    width: 140px;
    height: 140px;
    background: ${(props) => props.colors.tan};
  }
`;

const AccountPreview = ({}) => {
  return (
    <Cont
      colors={COLORS}
      className="grey-border-2 box-shadow-2 relative gradient"
    >
      <div className="padding-x-12 padding-y-8 image-section">
        <div></div>
        <div className="flex flex-column align-center">
          <div className="image-cont"></div>
        </div>
        <div className="relative justify-self-end">
          <FontAwesomeIcon
            onClick={() => setEditing(true)}
            icon={faGear}
            className="icon-green icon-med cursor"
            onMouseOver={() =>
              setToolTips((prev) => {
                return { ...prev, edit: true };
              })
            }
          />
        </div>
      </div>

      <div className="padding-x-12 padding-y-8">
        <h5 className="mar-bottom-8">.......</h5>
        <p className="bio">......</p>
      </div>

      <div className="flex space-between info flex-wrap mar-bottom-16">
        <div className="mar-bottom-8">
          <p className="bold">Upvotes</p>
          <div className="flex-inline align-center">
            <FontAwesomeIcon
              icon={faArrowUp}
              className="icon-ssm contrast mar-right-8"
            />
            <p className="contrast">?</p>
          </div>
        </div>
        <div className="mar-bottom-8">
          <p className="bold">Posts</p>
          <div className="flex-inline align-center">
            <FontAwesomeIcon
              icon={faNewspaper}
              className="icon-ssm contrast mar-right-8"
            />
            <p className="contrast">?</p>
          </div>
        </div>
        <div className="mar-bottom-8">
          <p className="bold">Comments</p>
          <div className="flex-inline align-center">
            <FontAwesomeIcon
              icon={faComment}
              className="icon-ssm contrast mar-right-8"
            />
            <p className="contrast">?</p>
          </div>
        </div>
      </div>

      <div className="ssm-spacer-bot-res"></div>
      <div className="padding-x-12 padding-y-8">
        <div className="blue-btn-two gradient">
          <h5>New Post</h5>
        </div>
      </div>
      <div className="mar-bottom-32"></div>
    </Cont>
  );
};

export default AccountPreview;
