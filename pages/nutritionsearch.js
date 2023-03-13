import { useState } from "react";
import styled from "styled-components";
import COLORS from "../data/colors";
import Searchbar from "../components/nutritionsearch/Searchbar";
import Results from "../components/nutritionsearch/Results";
import supabase from "../utils/supabaseClient";
import {
  fetchAllFoods,
  fetchFoodCategoryByName,
  fetchAllFish,
} from "../utils/supabaseFunctions";
import { macros } from "../data/Quantities";
const Cont = styled.div`
  margin-top: 40px;
`;

export async function getServerSideProps() {
  const allFoodCategories = await fetchAllFoods();
  const beefFetch = await fetchFoodCategoryByName("Beef");
  const dairyAndEggsFetch = await fetchFoodCategoryByName("Dairy and Eggs");
  const fishFetch = await fetchAllFish();
  const poultryFetch = await fetchFoodCategoryByName("Poultry");
  const lambVealAndGameFetch = await fetchFoodCategoryByName(
    "Lamb, Veal and Game"
  );
  const porkFetch = await fetchFoodCategoryByName("Pork");
  const fruitsFetch = await fetchFoodCategoryByName("Fruits and Fruit Juices");
  const grainsFetch = await fetchFoodCategoryByName("Grains and Starches");
  return {
    props: {
      allFoodCategories,
      beefFetch,
      dairyAndEggsFetch,
      fishFetch,
      poultryFetch,
      lambVealAndGameFetch,
      fruitsFetch,
      grainsFetch,
      porkFetch,
    },
  };
}

const Nutritionsearch = ({
  allFoodCategories,
  beefFetch,
  dairyAndEggsFetch,
  fishFetch,
  poultryFetch,
  lambVealAndGameFetch,
  fruitsFetch,
  grainsFetch,
  porkFetch,
}) => {
  const [allFoods, setAllFoods] = useState(
    allFoodCategories.sort((a, b) =>
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    )
  );
  const [dairy, setDairy] = useState(
    dairyAndEggsFetch.foods.sort((a, b) =>
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    )
  );

  const [fish, setFish] = useState(
    fishFetch.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
  );

  const [poultry, setPoultry] = useState(
    poultryFetch.foods.sort((a, b) =>
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    )
  );

  const [lambVealAndGame, setLambVealAndGame] = useState(
    lambVealAndGameFetch.foods.sort((a, b) =>
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    )
  );

  const [fruit, setFruit] = useState(
    fruitsFetch.foods.sort((a, b) =>
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    )
  );

  const [grains, setGrains] = useState(
    grainsFetch.foods.sort((a, b) =>
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    )
  );

  const [beef, setBeef] = useState(
    beefFetch.foods.sort((a, b) =>
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    )
  );

  const [pork, setPork] = useState(
    porkFetch.foods.sort((a, b) =>
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    )
  );

  const [foodsObject, setFoodsObject] = useState({
    "All Food Categories": allFoods,
    "Dairy and Eggs": dairy,
    Fish: fish,
    Poultry: poultry,
    "Lamb, Veal and Game": lambVealAndGame,
    Pork: pork,
    "Fruits and Fruit Juices": fruit,
    "Grains and Starches": grains,
    Beef: beef,
  });

  console.log("fish");
  console.log(fish);
  console.log("beef");
  console.log(beef);
  const [selectedFoods, setSelectedFoods] = useState(
    foodsObject["All Food Categories"]
  );
  const [selectedFoodsCopy, setSelectedFoodsCopy] = useState(
    foodsObject["All Food Categories"]
  );
  const [value, setValue] = useState("All Food Categories");
  const updateValue = (val) => {
    setSelectedFoods(foodsObject[val]);
    setSelectedFoodsCopy(foodsObject[val]);
    console.log(foodsObject[val]);
    setValue(val);
  };

  const [searchText, setSearchText] = useState("");

  const filterFoods = (val) => {
    setSelectedFoods(
      selectedFoodsCopy.filter((food) => {
        return food.name.toLowerCase().includes(val.toLowerCase());
      })
    );
  };
  const updateSearchText = (e) => {
    const val = e.target.value;

    setSearchText(val);
    const delayType = setTimeout(() => {
      filterFoods(val);
    }, 500);
    return () => clearTimeout(delayType);
  };

  const [nutrientValue, setNutrientValue] = useState("Unselected");
  const updateNutrientValue = (val) => {
    setNutrientValue(val);
    sortFoods(val);
  };
  const [filterValue, setFilterValue] = useState("Highest in");
  const updateFilterValue = (val) => {
    setFilterValue(val);
  };
  console.log("??");
  console.log(selectedFoods);
  const sortFoods = (val) => {
    console.log(selectedFoods[0]);
    if (!macros.includes(val)) {
      setSelectedFoods((foods) => {
        return foods.sort((a, b) => {
          let aVal =
            a.nutrients_id[`${val.replaceAll(" ", "_")}_daily_value`] /
            (a.nutrients_id.quantity / 100);

          let bVal =
            b.nutrients_id[`${val.replaceAll(" ", "_")}_daily_value`] /
            (b.nutrients_id.quantity / 100);

          return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
        });
      });
    }
  };
  console.log("xxx");
  console.log(selectedFoods);
  return (
    <Cont colors={COLORS}>
      <Searchbar
        searchText={searchText}
        updateSearchText={updateSearchText}
        value={value}
        setValue={setValue}
        updateValue={updateValue}
      />
      <div className="ssm-spacer-bot-res"></div>
      <Results
        foods={selectedFoods}
        nutrientValue={nutrientValue}
        updateNutrientValue={updateNutrientValue}
        filterValue={filterValue}
        updateFilterValue={updateFilterValue}
      />
      <div className="sm-spacer-bot-res"></div>
    </Cont>
  );
};

export default Nutritionsearch;
