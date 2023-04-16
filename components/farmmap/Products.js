import { useEffect, useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Searchbar from "../search/Searchbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const Cont = styled.div`
  margin-bottom: 32px;

  display: inline-block;
  cursor: pointer;
  .tag-selected {
    background: ${(props) => props.colors.darkBlue};
  }
  .tag-spec {
    //border: 1px solid ${(props) => props.colors.grey};
    padding: 8px 16px;
    display: flex;

    align-items: center;
    transition: background-color 0.25s ease;
    &:hover {
      background-color: ${(props) => props.colors.darkBlue};
    }
    p {
      color: ${(props) => props.colors.offWhite};
    }
  }
  .tag-holder-spec {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    border-radius: 32px;
    background: ${(props) => props.colors.lightBlue};
    box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
      rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
      rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset,
      rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
      rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
      rgba(0, 0, 0, 0.09) 0px 32px 16px;
    .tag-inner-holder {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      &:nth-of-type(1) {
        .tag-spec {
          &:nth-of-type(1) {
            border-radius: 32px 0 0 0;
          }
          &:nth-of-type(3) {
            border-radius: 0 32px 0 0;
          }
        }
      }
      &:nth-of-type(2) {
        .tag-spec {
          &:nth-of-type(1) {
            border-radius: 0 0 0 32px;
          }
          &:nth-of-type(3) {
            border-radius: 0 0 32px 0;
          }
        }
      }
    }
  }
`;
const Products = ({ searchTags, setSearchTags, tagsFetch }) => {
  const [tags, setTags] = useState([]);
  const [text, setText] = useState("");
  const [filterTags, setFilterTags] = useState([]);
  const updateText = (e) => {
    let val = e.currentTarget.value;
    setText((prevText) => {
      return val.toLowerCase();
    });
  };
  useEffect(() => {
    setTags((prev) => {
      return tagsFetch.sort(function (a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    });
    setFilterTags((prev) => {
      return tagsFetch.sort(function (a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    });
  }, []);

  function findClosestTag() {
    if (tags.length == 0) return;
    setFilterTags((prevTags) => {
      return tags.filter((tag) => {
        return tag.name.includes(text);
      });
    });
  }

  function removeSearchTag(id) {
    const item = searchTags.find((tag) => {
      return tag.id === id;
    });
    setFilterTags((prevTags) => {
      return [...prevTags, item];
    });
    setTags((prevTags) => {
      return [...prevTags, item];
    });
    setSearchTags((prevTags) => {
      const tags = prevTags.filter((tag) => {
        return tag.id !== id;
      });
      return [...tags];
    });
    /*
    setContext((prev) => {
      return {
        ...prev,
        tags: searchTags,
      };
    });*/
  }

  useEffect(() => {
    const delayType = setTimeout(() => {
      findClosestTag();
    }, 500);
    return () => clearTimeout(delayType);
  }, [text]);

  function removeTag(id) {
    const item = tags.find((tag) => {
      return tag.id === id;
    });
    pushSearchTag(item);
    setTags((prevTags) => {
      const tags = prevTags.filter((tag) => {
        return tag.id !== id;
      });
      return [...tags];
    });
    setFilterTags((prevTags) => {
      const tags = prevTags.filter((tag) => {
        return tag.id !== id;
      });
      return [...tags];
    });
  }

  function removeSearchTag(id) {
    const item = searchTags.find((tag) => {
      return tag.id === id;
    });
    setFilterTags((prevTags) => {
      return [...prevTags, item];
    });
    setTags((prevTags) => {
      return [...prevTags, item];
    });
    setSearchTags((prevTags) => {
      const tags = prevTags.filter((tag) => {
        return tag.id !== id;
      });
      return [...tags];
    });
  }

  function pushSearchTag(tag) {
    setSearchTags((prevTags) => {
      return [...prevTags, tag];
    });
    setText("");
  }

  function submitSearch(e) {
    e.preventDefault();
    if (filterTags.length <= 0) {
      return;
    }

    let id = filterTags[0].id;
    removeTag(id);
    setText("");
  }

  const togglePresetTag = (text) => {
    setPresetTags((tags) => {
      return tags.map((tag, index) => {
        if (tag.text == text) {
          const elem = document.getElementById(index);

          return { ...tag, selected: !tag.selected };
        }
        return tag;
      });
    });
  };
  const [presetTags, setPresetTags] = useState([
    { text: "meat", selected: false },
    { text: "milk", selected: false },
    { text: "butter", selected: false },
    { text: "eggs", selected: false },
    { text: "goat milk", selected: false },
    { text: "honey", selected: false },
  ]);

  const [tagElems, setTagElems] = useState(
    presetTags.map((tag, index) => {
      return (
        <div
          onClick={() => togglePresetTag(tag.text)}
          className={tag?.selected ? "tag-spec tag-selected " : "tag-spec"}
          key={index}
        >
          <p className="mar-right-8">{tag?.text}</p>
          <FontAwesomeIcon icon={faPlus} className="icon-ssm white" />
        </div>
      );
    })
  );
  console.log(presetTags);
  useEffect(() => {
    setTagElems((prev) => {
      return presetTags.map((tag, index) => {
        return (
          <div
            onClick={() => togglePresetTag(tag.text)}
            className={
              tag?.selected
                ? "tag-spec tag-selected scale-pop-anim"
                : "tag-spec"
            }
            key={index}
          >
            <p className="mar-right-8">{tag?.text}</p>
            <FontAwesomeIcon icon={faPlus} className="icon-ssm white" />
          </div>
        );
      });
    });
  }, [presetTags]);
  return (
    <Cont colors={COLORS}>
      <h5 className="mar-bottom-16">PRODUCTS</h5>
      <div className="tan-container flex flex-wrap box-shadow">
        <div className="mar-right-32">
          <h5 className="mar-bottom-16">TAGS</h5>
          <Searchbar
            text={text}
            updateText={updateText}
            removeSearchTag={removeSearchTag}
            pushTag={pushSearchTag}
            pushSearchTag={pushSearchTag}
            tags={searchTags}
            submitSearch={submitSearch}
            removeTag={removeTag}
            filterTags={filterTags}
            colors={COLORS}
          />
        </div>
        <div className="grey-line mar-bottom-16 mar-top-16"></div>
        <div>
          <h5 className="mar-bottom-16">SUGGESTED</h5>
          <div className="tag-holder-spec">
            <div className="tag-inner-holder">
              {tagElems[0]}
              {tagElems[1]}
              {tagElems[2]}
            </div>
            <div className="tag-inner-holder">
              {tagElems[3]}
              {tagElems[4]}
              {tagElems[5]}
            </div>
          </div>
        </div>
      </div>
    </Cont>
  );
};

export default Products;
