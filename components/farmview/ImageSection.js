import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import COLORS from "../../data/colors";
import PhotoDisplay from "../popups/PhotoDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { createImageFetch } from "../../utils/supabaseFunctions";
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
  }
  .selected-image {
    opacity: 1;
    cursor: default;
    border: 2px solid ${(props) => props.colors.darkPink};
  }
`;

const ImageSection = ({ images, location_id, user_id, post_user_id }) => {
  const [previewUrl, setPreviewUrl] = useState(images[0]?.url || null);
  const [loading, setLoading] = useState({ state: false, msg: "" });
  const selectImage = (url) => {
    if (previewUrl === url) return;
    setPreviewUrl(url);
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
          image.url === previewUrl
            ? "selected-image image-select"
            : "image-select"
        }
      >
        <img src={image.url} />
      </div>
    );
  });
  const [imagesCopy, setImagesCopy] = useState(images);
  const [imageElems, setImageElems] = useState([]);
  useEffect(() => {
    const imageArr = [];
    for (let i = 0; i < 4; i++) {
      if (imagesCopy[i] !== undefined) {
        imageArr.push(
          <div
            key={i}
            onClick={() => selectImage(imagesCopy[i].url)}
            className={
              imagesCopy[i].url == previewUrl
                ? "selected-image image-select"
                : "image-select"
            }
          >
            <img src={imagesCopy[i].url} />
          </div>
        );
      } else {
        if (user_id === post_user_id) {
          imageArr.push(
            <div
              key={i}
              onClick={() => imageInputRef?.current?.click()}
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

  const imageRef = useRef(null);

  const imageInputRef = useRef(null);
  useEffect(() => {}, []);

  const uploadImage = async (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      alert("You must select an image to upload.");
      return;
    }
    setLoading({ state: true, msg: "Uploading image..." });
    const file = event.target.files[0];
    let formData = new FormData();
    formData.append("image", file);

    try {
      console.log("tried");
      const response = await fetch("https://api.imgur.com/3/image", {
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
          return [...prev, uploadedImage[0]];
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

      console.log(err.message);
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
        <PhotoDisplay selectedImage={previewUrl} hidePhoto={hidePhoto} />
      )}
      <input ref={imageInputRef} type="file" onChange={uploadImage} hidden />
      <div className="hero-image-section dark-blue-bg">
        {previewUrl !== null ? (
          <div onClick={setPhotoDisplayVisible} className="image-holder ">
            <img ref={imageRef} src={previewUrl} />
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
