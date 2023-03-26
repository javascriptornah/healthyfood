import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";

const Cont = styled.div`
  .drop-holder {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    border: 1px dotted ${(props) => props.colors.grey};
    height: 120px;
    position: relative;
  }
  .cover-image {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
    animation: opacity 1s;
  }
  .input-section {
    z-index: 1;
    p {
      padding: 8px;
      background-color: #fff;
      border-radius: 8px;
    }
  }
  .animation-holder {
    background: rgb(39, 143, 253);
    background: radial-gradient(
      circle,
      rgba(39, 143, 253, 1) 2%,
      rgba(124, 187, 254, 1) 6%,
      rgba(255, 255, 255, 1) 44%,
      rgba(124, 187, 254, 1) 94%,
      rgba(39, 143, 253, 1) 100%
    );
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .blue-ball {
      background-color: ${(props) => props.colors.lightBlue};
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }
  }
`;

const ImageDropper = ({ image, setImage }) => {
  const [hoverState, setHoverState] = useState(false);
  const fileRef = useRef(null);
  const imgRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("/images/white.jpg");
  const dragFunc = (e) => {
    e.preventDefault();
  };

  const dropFunc = (ev) => {
    setHoverState(false);
    console.log("File(s) dropped");
    ev.preventDefault();
    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...ev.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === "file") {
          const file = item.getAsFile();
          console.log(`… file[${i}].name = ${file.name}`);
          let blob = URL.createObjectURL(file);
          setImgSrc(blob);
          setImage(file);
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...ev.dataTransfer.files].forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`);
      });
    }
  };

  const uploadImage = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      throw new Error("You must select an image to upload.");
    }
    const file = e.target.files[0];
    setImage(file);
    console.log(file);
    setImgSrc(URL.createObjectURL(file));
  };

  const startDrag = (e) => {
    setHoverState(true);
    console.log("??");
  };

  const endDrag = (e) => {
    if (e.target.id == "hover-section") {
      setHoverState(false);
    }
  };
  return (
    <Cont colors={COLORS}>
      <div
        className="drop-holder"
        id="hover-section"
        onDragOver={(e) => dragFunc(e)}
        onDrop={(e) => dropFunc(e)}
        onDragEnter={(e) => startDrag(e)}
        onDragLeave={(e) => endDrag(e)}
      >
        {hoverState ? (
          <div className="animation-holder">
            <div className="blue-ball color-blue-scale"></div>
          </div>
        ) : (
          <>
            <input
              ref={fileRef}
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => uploadImage(e)}
              hidden
            />
            <img ref={imgRef} src={imgSrc} className="cover-image" />
            <div className=" input-section flex flex-wrap align-center justify-center text-center">
              <p className="light-blue-2 mar-right-8 mar-bottom-8">
                Drag and drop images or
              </p>
              <div
                onClick={() => fileRef.current.click()}
                className="blue-btn-one mar-bottom-8"
              >
                <h5>Upload</h5>
              </div>
            </div>
          </>
        )}
      </div>
    </Cont>
  );
};

export default ImageDropper;
