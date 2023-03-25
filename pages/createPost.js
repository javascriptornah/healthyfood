import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import COLORS from "../data/colors";
import Editor from "../components/Editor";
import Select from "../components/google/Select";
import ImageDropper from "../components/inputs/ImageDropper";
import toast, { Toaster } from "react-hot-toast";
const Cont = styled.div`
  background-color: ${(props) => props.colors.tan};
  min-height: 100vh;
  padding-top: 40px;
  width: 90%;
  margin: 0 auto;
  padding: 40px 16px 16px;
  @media only screen and (max-width: 800px) {
    width: 100%;
  }
  @media only screen and (max-width: 400px) {
    width: 100%;
    padding: 40px 0;
    .grey-border {
      border-radius: 0;
    }
  }
  input {
    min-width: 0px !important;
  }
  @media only screen and (max-width: 300px) {
    .dropdown__selected,
    .dropdown__menu {
      width: 100% !important;
      min-width: 0;
    }
  }
  .mde__textarea {
    height: 30vh;
    background-color: ${(props) => props.colors.lightGrey2};
    &:focus {
      background-color: white;
    }
  }
  .dropdown {
    border: none;
    &__menu {
      border: 1px solid ${(props) => props.colors.grey};
    }
    &__menu_search {
      border: 1px solid ${(props) => props.colors.darkBlue};
    }
  }
  .dropdown__selected {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    background-color: white;
    border-radius: 8px;
    &:hover {
      border: 1px solid ${(props) => props.colors.black};
    }
  }
  .select-line {
    margin-right: 32px;
    @media only screen and (max-width: 400px) {
      margin-right: 0;
    }
  }
  .mde__preview__content {
    h1,
    h2,
    h3,
    h4,
    h5 {
      color: ${(props) => props.colors.black};
    }
  }
`;

const CreatePost = () => {
  const [file, setFile] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [data, setData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [options, setOptions] = useState([]);
  const [regions, setRegions] = useState([]);

  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      )
      .then((res) => {
        setData((prevData) => {
          return res.data;
        });
        setRegions((prevData) => {
          return [...new Set(res.data.map((item) => item.country))].sort();
        });
        setOptions((prevData) => {
          return [...new Set(res.data.map((item) => item.country))].sort();
        });
      })
      .catch((err) => console.log(err));
  }, []);

  function updateCountry(value) {
    setCountry((prevCountry) => {
      return value;
    });
    let states = data.filter((item) => {
      return item.country === value;
    });
    states = [...new Set(states.map((item) => item.subcountry))];
    states.sort();
    setStates((prevStates) => {
      return states;
    });
    setState("");
    setCity("");
  }

  function updateState(value) {
    setState((prevState) => {
      return value;
    });
    let cities = data.filter((city) => city.subcountry === value);
    cities = cities.map((city) => city.name);
    cities.sort();
    setCities(cities);
  }

  function updateCity(value) {
    setCity((prevCity) => {
      return value;
    });
  }

  function updateRegion(location, name) {
    if (name === "country") {
      updateCountry(location);
    } else if (name === "state") {
      updateState(location);
    } else if (name == "city") {
      updateCity(location);
    }
  }

  const uploadImage = async () => {
    let formData = new formData();
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
        const uploadState = await createImage(
          res.data.link,
          res.data.deletehash,
          location_id
        );
      }
    } catch (error) {}
  };

  const createPostFunctional = async () => {
    if (title == "") {
      toast.error("Empty title");
      document.getElementById("title").focus();
    } else if (text == "") {
      toast.error("Empty content");
      document.querySelector(".mde__textarea").focus();
    }
  };

  return (
    <Cont colors={COLORS}>
      <Toaster />
      <h5 className="light black mar-bottom-8">CREATE POST</h5>
      <div className="grey-line mar-bottom-16"></div>
      <div className="grey-border box-shadow">
        <div className="flex flex-wrap justify-center mar-bottom-32">
          <div className="select-line mar-bottom-16">
            <h5 className="light contrast mar-bottom-16">COUNTRY *</h5>
            <Select
              regions={countries}
              value={country}
              updateValue={updateRegion}
              searchPlaceholder="Search"
              options={options}
              setOptions={setOptions}
              name="country"
            />
          </div>

          <div className="select-line mar-bottom-16">
            <h5 className="light contrast mar-bottom-16">
              STATE <span className="light small">(OPTIONAL)</span>
            </h5>
            <Select
              regions={states}
              value={state}
              updateValue={updateRegion}
              options={states}
              setOptions={setStates}
              name="state"
            />
          </div>

          <div className="select-line mar-bottom-16">
            <h5 className="light contrast mar-bottom-16">
              CITY <span className="light small">(OPTIONAL)</span>
            </h5>
            <Select
              regions={cities}
              value={city}
              updateValue={updateRegion}
              searchPlaceholder="Search"
              options={cities}
              setOptions={setCities}
              name="city"
            />
          </div>
        </div>
        <input
          placeholder="Title"
          type="text"
          className="white-input mar-bottom-16"
          onChange={(e) => setTitle(e.target.value)}
          id="title"
        />

        <div className="mar-bottom-16">
          <ImageDropper file={file} setFile={setFile} />
        </div>
        <Editor section={text} updateSection={setText} />
        <div className="mar-bottom-16"></div>
        <div className="flex justify-end">
          <div onClick={createPostFunctional} className="blue-btn-one">
            <h5>Create Post</h5>
          </div>
        </div>
      </div>
    </Cont>
  );
};

export default CreatePost;
