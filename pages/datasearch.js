import { useEffect, useState } from "react";
import styled from "styled-components";
import COLORS from "../data/colors";
import Searchbar from "../components/datasearch/Searchbar";
import SearchResults from "../components/datasearch/SearchResults";
import {
  fetchAllFishNames,
  fetchOceansData,
  fetchSeasData,
} from "../utils/supabaseFunctions";
const Cont = styled.div`
  margin-top: 48px;
`;

export async function getStaticProps() {
  const fishFetch = await fetchAllFishNames();
  const oceansFetch = await fetchOceansData();
  const seasFetch = await fetchSeasData();
  return {
    props: {
      fishFetch,
      oceansFetch,
      seasFetch,
    },
  };
}

const Datasearch = ({ fishFetch, oceansFetch, seasFetch }) => {
  const [baseFish, setBaseFish] = useState(fishFetch.map((fish) => fish.name));
  const [fish, setFish] = useState(fishFetch.map((fish) => fish.name));
  const [baseOceans, setBaseOceans] = useState([]);
  const [oceans, setOceans] = useState([]);
  const [baseSeas, setBaseSeas] = useState([]);
  const [seas, setSeas] = useState([]);
  useEffect(() => {
    // set default values for oceans
    let oceanObjects = [];
    let oceanObj = {};
    let fish = [];
    for (let i = 0; i < oceansFetch.length; i++) {
      fish = [];
      oceanObj = { name: oceansFetch[i].name };
      oceansFetch[i].oceanFish.forEach((oceanFish) => {
        if (!fish.includes(oceanFish.fish_id.name)) {
          fish.push(oceanFish.fish_id.name);
        }
      });
      oceanObj.fish = fish;
      oceanObjects.push(oceanObj);
    }
    setBaseOceans(oceanObjects);
    setOceans(oceanObjects);

    // set default values for seas

    let seaObjects = [];
    let seaObj = {};
    let seaFish = [];

    for (let i = 0; i < seasFetch.length; i++) {
      seaFish = [];
      seaObj = { name: seasFetch[i].name };
      console.log(seasFetch[i].name);
      seasFetch[i].oceanFish.forEach((oceanFish) => {
        if (!seaFish.includes(oceanFish.fish_id.name)) {
          seaFish.push(oceanFish.fish_id.name);
        }
      });
      seaObj.fish = seaFish;
      seaObjects.push(seaObj);
    }
    setBaseSeas(seaObjects);
    setSeas(seaObjects);
  }, []);
  const [text, setText] = useState("");
  console.log("seas");
  console.log(seas);
  //console.log(baseOceans)
  const updateFish = (val) => {
    if (val == "") {
      setFish(baseFish);
    } else {
      setFish(
        baseFish.filter((fish) =>
          fish.toLowerCase().includes(val.toLowerCase())
        )
      );
    }
  };

  const updateOceans = (val) => {
    setOceans((oceans) => {
      let oceanFishFiltered = baseOceans.map((ocean) => {
        let innerOcean = ocean.fish.filter((fish) =>
          fish.toLowerCase().includes(val.toLowerCase())
        );
        return { name: ocean.name, fish: innerOcean };
      });
      let filteredOceans = oceanFishFiltered.filter((ocean) => {
        if (ocean.fish.length > 0) {
          return true;
        } else if (ocean.name.toLowerCase().includes(val.toLowerCase())) {
          return true;
        }
      });
      return filteredOceans;
    });
  };

  const updateSeas = (val) => {
    setSeas((sea) => {
      let seaFishFiltered = baseSeas.map((sea) => {
        let innerSea = sea.fish.filter((fish) =>
          fish.toLowerCase().includes(val.toLowerCase())
        );
        return { name: sea.name, fish: innerSea };
      });
      let filteredSeas = seaFishFiltered.filter((sea) => {
        if (sea.fish.length > 0) {
          return true;
        } else if (sea.name.toLowerCase().includes(val.toLowerCase())) {
          return true;
        }
      });
      return filteredSeas;
    });
  };

  const updateText = (e) => {
    const val = e.target.value;
    console.log(val);
    setText(val);
    updateFish(val);
    updateOceans(val);
    updateSeas(val);
  };
  return (
    <Cont colors={COLORS}>
      <div className="center-inline mar-bottom-32">
        <h3 className="blue text-shadow-blue">Data Search</h3>
      </div>
      <Searchbar text={text} updateText={updateText} />
      <div className="ssm-spacer-bot-res"></div>
      <SearchResults fish={fish} oceans={oceans} seas={seas} />
      <div className="sm-spacer"></div>
    </Cont>
  );
};

export default Datasearch;
