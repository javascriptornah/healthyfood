import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import COLORS from "../../data/colors";
import PhotoDisplay from "../popups/PhotoDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { createImageFetch, deleteImage } from "../../utils/supabaseFunctions";
const Cont = styled.div`
  .hero-image-section {
    display: grid;
    border-bottom: 1px solid ${(props) => props.colors.darkPink};
    grid-template-columns: 3fr 1fr;
    img {
      width: 100%;
      display: block;
    }
    @media only screen and (max-width: 460px) {
      grid-template-columns: 1fr;
    }
  }
  .template {
    width: 100%;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .image-upload-btn {
    border-radius: 32px;
    border: 1px solid ${(props) => props.colors.grey};
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.25s ease;
    box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
      rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
      rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset,
      rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
      rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
      rgba(0, 0, 0, 0.09) 0px 32px 16px;
    &:hover {
      background-color: white;
    }
    &:active {
      background-color: white;
      border: 1px solid ${(props) => props.colors.blue};
    }
    @media only screen and (max-width: 400px) {
      padding: 8px;
      .icon-lg {
        font-size: 24px;
      }
      h4 {
        display: none;
      }
    }
  }
  .padding-8 {
    padding: 8px;
  }
  .small-template {
    display: flex;
    height: 100%;
    border-bottom: 1px solid ${(props) => props.colors.darkGrey};
    align-items: center;
    justify-content: center;
  }
  .image-holder {
    position: relative;
    max-height: 600px;
    border-right: 1px solid ${(props) => props.colors.darkPink};
    cursor: pointer;
    border: 2px solid transparent;
    &:hover {
      border: 2px solid ${(props) => props.colors.darkPink};
    }
    img {
      height: 100%;
      object-fit: contain;
    }
  }
  .image-selectors {
    display: grid;
    max-height: 600px;
    @media only screen and (max-width: 460px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  .image-select {
    position: relative;
    overflow: hidden;
    opacity: 0.6;
    cursor: pointer;
    transition: opacity 0.25s ease;
    &:hover {
      opacity: 1;
    }
    img {
      object-fit: cover;
      height: 100%;
    }
  }
  .empty-image {
    position: relative;
    cursor: pointer;
    padding: 16px;
  }
  .selected-image {
    opacity: 1;
    cursor: default;
    border: 2px solid ${(props) => props.colors.darkPink};
  }
  .header-image {
    opacity: 0.5;
  }
`;

const ImageSection = ({ images, location_id, user_id, post_user_id }) => {
  const [imagesCopy, setImagesCopy] = useState(images);
  const [previewUrl, setPreviewUrl] = useState(
    { url: imagesCopy[0]?.url, id: 0 } || null
  );
  const [loading, setLoading] = useState({ state: false, msg: "" });
  const selectImage = (url, id) => {
    if (previewUrl.url === url) return;
    setPreviewUrl({ url, id });
    imageRef.current.classList.add("opacity-anim-fast");
    setTimeout(() => {
      imageRef.current.classList.remove("opacity-anim-fast");
    }, 250);
  };

  const imageElements = images.map((image, index) => {
    return (
      <div
        key={index}
        className={
          image.url === previewUrl.url
            ? "selected-image image-select"
            : "image-select"
        }
      >
        <img src={image.url} />
      </div>
    );
  });

  const [imageElems, setImageElems] = useState([]);
  useEffect(() => {
    const imageArr = [];
    //loop of four because only 4 images limit
    for (let i = 0; i < 4; i++) {
      // if image exists
      if (imagesCopy[i] !== undefined) {
        imageArr.push(
          <div
            key={i}
            onClick={() => selectImage(imagesCopy[i].url, i)}
            className={
              imagesCopy[i].url === previewUrl.url
                ? "selected-image image-select"
                : "image-select"
            }
          >
            <div className="absolute-center">
              <div
                onClick={() => {
                  imageInputRef.current.id = i;
                  imageInputRef?.current?.click();
                }}
                className="image-upload-btn padding-8"
              >
                <FontAwesomeIcon icon={faUpload} className="icon-ssm blue" />
              </div>
            </div>
            <img src={imagesCopy[i].url} className="header-image" />
          </div>
        );
      } else {
        //if image doesn't exist
        if (user_id === post_user_id) {
          imageArr.push(
            <div
              key={i}
              onClick={() => {
                imageInputRef.current.id = i + 1;
                imageInputRef?.current?.click();
                imageInputRef.current.id = imagesCopy.length + 1;
              }}
              className="empty-image gradient-bg-2 small-template"
            >
              <div>
                <div className="image-upload-btn">
                  <h5 className="blue">UPLOAD</h5>
                  <FontAwesomeIcon icon={faUpload} className="icon-med blue" />
                </div>
              </div>
            </div>
          );
        }
      }
    }
    setImageElems(imageArr);
  }, [imagesCopy, previewUrl]);

  const [showPhotoDisplay, setShowPhotoDisplay] = useState(false);

  const setPhotoDisplayVisible = () => {
    setShowPhotoDisplay(true);
  };

  const hidePhoto = () => {
    setShowPhotoDisplay(false);
  };

  const deleteImgurImage = async (image) => {
    try {
      const response = await fetch(
        `https://api.imgur.com/3/image/${image.deleteHash}`,
        {
          method: "POST",
          headers: {
            Authorization: `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_ID}`,
          },
        }
      );
      const res = await response.json();
      if (res.status == 200) {
        const deleteRes = await deleteImage(image.id);
        if (deleteRes) {
          toast.success("image deleted");
          return true;
        } else {
          toast.error("Error deleting image");
        }
      } else {
        toast("Error deleting image", {
          duration: 4000,
          position: "top-center",

          // Styling
          style: { border: "1px solid #E52323" },
          className: "",

          // Custom Icon
          icon: "⚠️",

          // Change colors of success/error/loading icon
          iconTheme: {
            primary: "#000",
            secondary: "#fff",
          },

          // Aria
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
      }
    } catch (err) {
      console.log(err.message);
      return false;
    }
    return false;
  };
  const imageRef = useRef(null);

  const imageInputRef = useRef(null);
  useEffect(() => {}, []);

  const uploadImage = async (event, id) => {
    if (!event.target.files || event.target.files.length === 0) {
      alert("You must select an image to upload.");
      return;
    }
    const image = imagesCopy[id];

    const deleteStatus = await deleteImgurImage(image);

    if (typeof image == "undefined" ? true : deleteStatus) {
      setLoading({ state: true, msg: "Uploading image..." });
      const file = event.target.files[0];
      let formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch("https://api.imgur.com/3/upload", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_ID}`,
          },
        });

        const res = await response.json();
        if (res.status == 200) {
          const uploadedImage = await createImageFetch(
            res.data.link,
            res.data.deletehash,
            location_id
          );

          setImagesCopy((prev) => {
            let prevCopy = prev;
            prevCopy.splice(id, 1);
            return [...prevCopy, uploadedImage[0]];
          });

          setPreviewUrl((prev) => {
            return {
              ...prev,
              url: uploadedImage[0].url,
            };
          });
          setLoading({ state: false, msg: "" });
        } else {
          setLoading({ state: false, msg: "" });
          toast("Error uploading image", {
            duration: 4000,
            position: "top-center",

            // Styling
            style: { border: "1px solid #E52323" },
            className: "",

            // Custom Icon
            icon: "⚠️",

            // Change colors of success/error/loading icon
            iconTheme: {
              primary: "#000",
              secondary: "#fff",
            },

            // Aria
            ariaProps: {
              role: "status",
              "aria-live": "polite",
            },
          });
        }
      } catch (err) {
        setLoading({ state: false, msg: "" });
      }
    }
  };

  return (
    <Cont colors={COLORS}>
      {loading.state && (
        <div className="loading-screen">
          <div className="loading-items">
            <div class="lds-ring-green">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <p className="bold green">{loading.msg}</p>
          </div>
        </div>
      )}
      {showPhotoDisplay && (
        <PhotoDisplay selectedImage={previewUrl?.url} hidePhoto={hidePhoto} />
      )}
      <input
        id={imagesCopy.length - 1}
        ref={imageInputRef}
        type="file"
        onChange={(e) => uploadImage(e, e.target.id)}
        hidden
      />
      <div className="hero-image-section dark-blue-bg">
        {previewUrl?.url !== null ? (
          <div className="image-holder ">
            <div className="absolute-center">
              <div
                className="image-upload-btn"
                onClick={() => {
                  if (imagesCopy.length < 4) {
                    imageInputRef.current.id = imageInputRef.current.id + 1;
                  } else {
                    imageInputRef.current.id = previewUrl.id;
                  }
                  imageInputRef.current.click();
                }}
              >
                <h4 className="blue">UPLOAD</h4>
                <FontAwesomeIcon icon={faUpload} className="icon-lg blue" />
              </div>
            </div>
            <img
              className="header-image"
              ref={imageRef}
              src={previewUrl?.url}
            />
          </div>
        ) : (
          <div className="template gradient-bg-2">
            <div
              className="image-upload-btn"
              onClick={() => imageInputRef?.current?.click()}
            >
              <h4 className="blue">UPLOAD</h4>
              <FontAwesomeIcon icon={faUpload} className="icon-lg blue" />
            </div>
          </div>
        )}

        <div className="image-selectors">{imageElems}</div>
      </div>
    </Cont>
  );
};

export default ImageSection;
