import Link from "next/link";
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
import COLORS from "../../data/colors";
import LinkBio from "./LinkBio";
import Tooltip from "../inputs/Tooltip";
import { nanoid } from "nanoid";
import {
  deleteFile,
  uploadFile,
  updateUserAvatar,
} from "../../utils/supabaseFunctions";
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
  }
`;

const AccountPreview = ({
  username,
  bio,
  upvotes,
  posts,
  comments,
  links,
  user,
}) => {
  const fileRef = useRef(null);
  const [avatarUrl, setAvatarUrl] = useState(user.user_metadata.avatar_url);
  const [uploading, setUploading] = useState(false);
  const [toolTips, setToolTips] = useState({
    edit: false,
    upload: false,
  });
  const [editing, setEditing] = useState(false);

  const [linkElems, setLinkElems] = useState(
    links.map((link, index) => {
      return (
        <LinkBio
          key={index}
          url={link.link}
          icon={link.icon}
          text={link.name}
        />
      );
    })
  );
  const uploadAvatar = async (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      throw new Error("You must select an image to upload.");
    }

    setUploading(true);
    const file = event.target.files[0];
    const fileExt = file.name.split(".").pop();
    const filePath = `${user?.email}.${nanoid()}`;
    const finishUpload = () => {
      setAvatarUrl(filePath);
      setUploading(false);
    };

    deleteFile(avatarUrl).then((res) =>
      uploadFile(filePath, file).then((res) =>
        updateUserAvatar(filePath).then((res) => finishUpload())
      )
    );
  };
  return (
    <Cont colors={COLORS} className="grey-border-2 box-shadow-2 relative">
      <div className="padding-x-12 padding-y-8 image-section">
        <div></div>
        <div className="flex flex-column align-center">
          <div className="image-cont">
            <Image
              src={`${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_PATH}${avatarUrl}`}
              width={140}
              height={140}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div
            className="relative"
            onMouseOut={() =>
              setToolTips((prev) => {
                return { ...prev, upload: false };
              })
            }
          >
            <Tooltip text="New profile pic" shown={toolTips.upload} />
            {!uploading ? (
              <p
                className="bold green cursor underline"
                onClick={() => fileRef.current.click()}
                onMouseOver={() =>
                  setToolTips((prev) => {
                    return { ...prev, upload: true };
                  })
                }
              >
                Upload
              </p>
            ) : (
              <div className="lds-ring-green">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            )}
          </div>
          <input
            type="file"
            onChange={uploadAvatar}
            ref={fileRef}
            hidden={true}
          />
        </div>
        <div
          className="relative justify-self-end"
          onMouseOut={() =>
            setToolTips((prev) => {
              return { ...prev, edit: false };
            })
          }
        >
          <Tooltip text="Edit account" shown={toolTips.edit} />
          <Link href={"/editAccount"}>
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
          </Link>
        </div>
      </div>
      <div className="flex justify-center">
        <Link href={`/user/${username}`}>
          <p className="light-blue underline">View your public account</p>
        </Link>
      </div>
      <div className="padding-x-12 padding-y-8">
        <h5 className="mar-bottom-8">{username}</h5>
        <p className="bio">{bio}</p>
      </div>

      <div className="flex space-between info flex-wrap mar-bottom-16">
        <div className="mar-bottom-8">
          <p className="bold">Upvotes</p>
          <div className="flex-inline align-center">
            <FontAwesomeIcon
              icon={faArrowUp}
              className="icon-ssm contrast mar-right-8"
            />
            <p className="contrast">{upvotes}</p>
          </div>
        </div>
        <div className="mar-bottom-8">
          <p className="bold">Posts</p>
          <div className="flex-inline align-center">
            <FontAwesomeIcon
              icon={faNewspaper}
              className="icon-ssm contrast mar-right-8"
            />
            <p className="contrast">{posts}</p>
          </div>
        </div>
        <div className="mar-bottom-8">
          <p className="bold">Comments</p>
          <div className="flex-inline align-center">
            <FontAwesomeIcon
              icon={faComment}
              className="icon-ssm contrast mar-right-8"
            />
            <p className="contrast">{comments}</p>
          </div>
        </div>
      </div>

      <div className="padding-x-12 padding-y-8 flex flex-wrap">{linkElems}</div>
      <div className="ssm-spacer-bot-res"></div>
      <div className="padding-x-12 padding-y-8">
        <Link href={"/createPost"}>
          <div className="blue-btn-two">
            <h5>New Post</h5>
          </div>
        </Link>
      </div>
      <div className="mar-bottom-32"></div>
    </Cont>
  );
};

export default AccountPreview;
