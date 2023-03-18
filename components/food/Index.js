import { useEffect, useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import NutrientLine from "../nutritionFacts/NutrientLine";
import MacroLine from "../nutritionFacts/MacroLine";
import NutrientTopSection from "../nutritionFacts/NutrientTopSection";

const Cont = styled.div`
  margin: 0 auto;
  .nutrient-sections-holder {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
  }
  .nutrient-holder {
    border: 1px solid ${(props) => props.colors.grey};
    border-radius: 8px;
    padding: 8px;
    max-width: 280px;
    margin: 0 16px 32px;
    flex: 1;
    @media only screen and (max-width: 350px) {
      margin: 0 0 32px;
    }
  }
  .nutrient-title {
    background-color: ${(props) => props.colors.offWhite};
    padding: 2px 4px;
    border-bottom: 1px solid ${(props) => props.colors.black};
  }
`;
const Index = ({ fish, allFish, reFetchFood }) => {
  const [quantity, setQuantity] = useState(
    `${fish.nutrients_id.quantity} grams`
  );
  const [nutrients, setNutrients] = useState(fish.nutrients_id);

  const [nutrientObject, setNutrientObject] = useState({
    nutrients: {
      "Vitamin A": {
        value:
          fish.nutrients_id.vitamin_a_units?.match(/\d*\.*\d*/g)[0] || null,
        units:
          fish.nutrients_id.vitamin_a_units?.match(/(mcg|mg|IU)/)[0] || null,
        daily_value: fish.nutrients_id.vitamin_a_daily_value,
      },
      "Vitamin C": {
        value:
          fish.nutrients_id.vitamin_c_units?.match(/\d*\.*\d*/g)[0] || null,
        units:
          fish.nutrients_id.vitamin_c_units?.match(/(mcg|mg|IU)/)[0] || null,
        daily_value: fish.nutrients_id.vitamin_c_daily_value,
      },
      "Vitamin D": {
        value: fish.nutrients_id.vitamin_d_units?.match(/\d*\.*\d*/g)[0] || 0,
        units: fish.nutrients_id.vitamin_d_units?.match(/(mcg|mg|IU)/)[0] || 0,
        daily_value: fish.nutrients_id.vitamin_d_daily_value || 0,
      },
      "Vitamin E": {
        value:
          fish.nutrients_id.vitamin_e_units?.match(/\d*\.*\d*/g)[0] || null,
        units:
          fish.nutrients_id.vitamin_e_units?.match(/(mcg|mg|IU)/)[0] || null,
        daily_value: fish.nutrients_id.vitamin_e_daily_value,
      },
      "Vitamin K": {
        value:
          fish.nutrients_id.vitamin_k_units?.match(/\d*\.*\d*/g)[0] || null,
        units:
          fish.nutrients_id.vitamin_k_units?.match(/(mcg|mg|IU)/)[0] || null,
        daily_value: fish.nutrients_id.vitamin_k_daily_value,
      },
      Thiamin: {
        value: fish.nutrients_id.thiamin_units?.match(/\d*\.*\d*/g)[0] || null,
        units: fish.nutrients_id.thiamin_units?.match(/(mcg|mg|IU)/)[0] || null,
        daily_value: fish.nutrients_id.thiamin_daily_value,
      },
      Niacin: {
        value: fish.nutrients_id.niacin_units?.match(/\d*\.*\d*/g)[0] || null,
        units: fish.nutrients_id.niacin_units?.match(/(mcg|mg|IU)/)[0] || null,
        daily_value: fish.nutrients_id.niacin_daily_value,
      },
      "Vitamin B6": {
        value:
          fish.nutrients_id.vitamin_b6_units?.match(/\d*\.*\d*/g)[0] || null,
        units:
          fish.nutrients_id.vitamin_b6_units?.match(/(mcg|mg|IU)/)[0] || null,
        daily_value: fish.nutrients_id.vitamin_b6_daily_value,
      },
      Folate: {
        value: fish.nutrients_id.folate_units?.match(/\d*\.*\d*/g)[0] || null,
        units: fish.nutrients_id.folate_units?.match(/(mcg|mg|IU)/)[0] || null,
        daily_value: fish.nutrients_id.folate_daily_value,
      },
      "Vitamin B12": {
        value:
          fish.nutrients_id.vitamin_b12_units?.match(/\d*\.*\d*/g)[0] || null,
        units:
          fish.nutrients_id.vitamin_b12_units?.match(/(mcg|mg|IU)/)[0] || null,
        daily_value: fish.nutrients_id.vitamin_b12_daily_value,
      },
      "Pantothenic Acid": {
        value:
          fish.nutrients_id.pantothenic_acid_units?.match(/\d*\.*\d*/g)[0] ||
          null,
        units:
          fish.nutrients_id.pantothenic_acid_units?.match(/(mcg|mg|IU)/)[0] ||
          null,
        daily_value: fish.nutrients_id.pantothenic_acid_daily_value,
      },
      Choline: {
        value: fish.nutrients_id.choline_units?.match(/\d*\.*\d*/g)[0] || null,
        units: fish.nutrients_id.choline_units?.match(/(mcg|mg|IU)/)[0] || null,
        daily_value: fish.nutrients_id?.choline_daily_value || null,
      },
      Calcium: {
        value: fish.nutrients_id.calcium_units?.match(/\d*\.*\d*/g)[0] || null,
        units: fish.nutrients_id.calcium_units?.match(/(mcg|mg|IU)/)[0] || null,
        daily_value: fish.nutrients_id.calcium_daily_value,
      },
      Iron: {
        value: fish.nutrients_id.iron_units?.match(/\d*\.*\d*/g)[0] || null,
        units: fish.nutrients_id.iron_units?.match(/(mcg|mg|IU)/)[0] || null,
        daily_value: fish.nutrients_id.iron_daily_value,
      },
      Magnesium: {
        value:
          fish.nutrients_id.magnesium_units?.match(/\d*\.*\d*/g)[0] || null,
        units:
          fish.nutrients_id.magnesium_units?.match(/(mcg|mg|IU)/)[0] || null,
        daily_value: fish.nutrients_id.magnesium_daily_value,
      },
      Phosphorus: {
        value:
          fish.nutrients_id.phosphorus_units?.match(/\d*\.*\d*/g)[0] || null,
        units:
          fish.nutrients_id.phosphorus_units?.match(/(mcg|mg|IU)/)[0] || null,
        daily_value: fish.nutrients_id.phosphorus_daily_value,
      },
      Potassium: {
        value:
          fish.nutrients_id.potassium_units?.match(/\d*\.*\d*/g)[0] || null,
        units:
          fish.nutrients_id.potassium_units?.match(/(mcg|mg|IU)/)[0] || null,
        daily_value: fish.nutrients_id.potassium_daily_value,
      },
      Sodium: {
        value: fish.nutrients_id.sodium_units?.match(/\d*\.*\d*/g)[0] || null,
        units: fish.nutrients_id.sodium_units?.match(/(mcg|mg|IU)/)[0] || null,
        daily_value: fish.nutrients_id.sodium_daily_value,
      },
      Zinc: {
        value: fish.nutrients_id.zinc_units?.match(/\d*\.*\d*/g)[0] || null,
        units: fish.nutrients_id.zinc_units?.match(/(mcg|mg|IU)/)[0] || null,
        daily_value: fish.nutrients_id.zinc_daily_value,
      },
      Copper: {
        value: fish.nutrients_id.copper_units?.match(/\d*\.*\d*/g)[0] || null,
        units: fish.nutrients_id.copper_units?.match(/(mcg|mg|IU)/)[0] || null,
        daily_value: fish.nutrients_id.copper_daily_value,
      },
      Manganese: {
        value:
          fish.nutrients_id.manganese_units?.match(/\d*\.*\d*/g)[0] || null,
        units:
          fish.nutrients_id.manganese_units?.match(/(mcg|mg|IU)/)[0] || null,
        daily_value: fish.nutrients_id.manganese_daily_value,
      },
      Selenium: {
        value: fish.nutrients_id.selenium_units?.match(/\d*\.*\d*/g)[0] || null,
        units:
          fish.nutrients_id.selenium_units?.match(/(mcg|mg|IU)/)[0] || null,
        daily_value: fish.nutrients_id.selenium_daily_value,
      },
      Cholesterol: {
        value:
          fish.nutrients_id.cholesterol_units?.match(/\d*\.*\d*/g)[0] || null,
        units:
          fish.nutrients_id.cholesterol_units?.match(/(mcg|mg|IU)/)[0] || null,
        daily_value: fish.nutrients_id.cholesterol_daily_value,
      },
      "Omega 6": {
        value: fish.nutrients_id.omega6_units?.match(/\d*\.*\d*/g)[0] || null,
        units: fish.nutrients_id.omega6_units?.match(/(mcg|mg|IU)/)[0] || null,
        daily_value: null,
      },
      "Omega 3": {
        value: fish.nutrients_id.omega3_units?.match(/\d*\.*\d*/g)[0] || null,
        units: fish.nutrients_id.omega3_units?.match(/(mcg|mg|IU)/)[0] || null,
        daily_value: null,
      },
    },
    macros: {
      Protein: {
        value: fish.nutrients_id.protein,
      },
      Fat: {
        value: fish.nutrients_id.fat,
      },
      Carbs: {
        value: fish.nutrients_id.carbs,
      },
      "Saturated Fat": {
        value: fish.nutrients_id.saturated_fat,
      },
      "Polyunsaturated Fat": {
        value: fish.nutrients_id.polyunsaturated_fat,
      },
      "Monounsaturated Fat": {
        value: fish.nutrients_id.monounsaturated_fat,
      },
    },
  });
  console.log(nutrientObject);
  useEffect(() => {
    setQuantity(`${fish.nutrients_id.quantity} grams`);
    setNutrientObject({
      nutrients: {
        "Vitamin A": {
          value:
            fish.nutrients_id.vitamin_a_units?.match(/\d*\.*\d*/g)[0] || null,
          units:
            fish.nutrients_id.vitamin_a_units?.match(/(mcg|mg|IU)/)[0] || null,
          daily_value: fish.nutrients_id.vitamin_a_daily_value,
        },
        "Vitamin C": {
          value:
            fish.nutrients_id.vitamin_c_units?.match(/\d*\.*\d*/g)[0] || null,
          units:
            fish.nutrients_id.vitamin_c_units?.match(/(mcg|mg|IU)/)[0] || null,
          daily_value: fish.nutrients_id.vitamin_c_daily_value,
        },
        "Vitamin D": {
          value: fish.nutrients_id.vitamin_d_units?.match(/\d*\.*\d*/g)[0] || 0,
          units:
            fish.nutrients_id.vitamin_d_units?.match(/(mcg|mg|IU)/)[0] || 0,
          daily_value: fish.nutrients_id.vitamin_d_daily_value || 0,
        },
        "Vitamin E": {
          value:
            fish.nutrients_id.vitamin_e_units?.match(/\d*\.*\d*/g)[0] || null,
          units:
            fish.nutrients_id.vitamin_e_units?.match(/(mcg|mg|IU)/)[0] || null,
          daily_value: fish.nutrients_id.vitamin_e_daily_value,
        },
        "Vitamin K": {
          value:
            fish.nutrients_id.vitamin_k_units?.match(/\d*\.*\d*/g)[0] || null,
          units:
            fish.nutrients_id.vitamin_k_units?.match(/(mcg|mg|IU)/)[0] || null,
          daily_value: fish.nutrients_id.vitamin_k_daily_value,
        },
        Thiamin: {
          value:
            fish.nutrients_id.thiamin_units?.match(/\d*\.*\d*/g)[0] || null,
          units:
            fish.nutrients_id.thiamin_units?.match(/(mcg|mg|IU)/)[0] || null,
          daily_value: fish.nutrients_id.thiamin_daily_value,
        },
        Niacin: {
          value: fish.nutrients_id.niacin_units?.match(/\d*\.*\d*/g)[0] || null,
          units:
            fish.nutrients_id.niacin_units?.match(/(mcg|mg|IU)/)[0] || null,
          daily_value: fish.nutrients_id.niacin_daily_value,
        },
        "Vitamin B6": {
          value:
            fish.nutrients_id.vitamin_b6_units?.match(/\d*\.*\d*/g)[0] || null,
          units:
            fish.nutrients_id.vitamin_b6_units?.match(/(mcg|mg|IU)/)[0] || null,
          daily_value: fish.nutrients_id.vitamin_b6_daily_value,
        },
        Folate: {
          value: fish.nutrients_id.folate_units?.match(/\d*\.*\d*/g)[0] || null,
          units:
            fish.nutrients_id.folate_units?.match(/(mcg|mg|IU)/)[0] || null,
          daily_value: fish.nutrients_id.folate_daily_value,
        },
        "Vitamin B12": {
          value:
            fish.nutrients_id.vitamin_b12_units?.match(/\d*\.*\d*/g)[0] || null,
          units:
            fish.nutrients_id.vitamin_b12_units?.match(/(mcg|mg|IU)/)[0] ||
            null,
          daily_value: fish.nutrients_id.vitamin_b12_daily_value,
        },
        "Pantothenic Acid": {
          value:
            fish.nutrients_id.pantothenic_acid_units?.match(/\d*\.*\d*/g)[0] ||
            null,
          units:
            fish.nutrients_id.pantothenic_acid_units?.match(/(mcg|mg|IU)/)[0] ||
            null,
          daily_value: fish.nutrients_id.pantothenic_acid_daily_value,
        },
        Choline: {
          value:
            fish.nutrients_id.choline_units?.match(/\d*\.*\d*/g)[0] || null,
          units:
            fish.nutrients_id.choline_units?.match(/(mcg|mg|IU)/)[0] || null,
          daily_value: fish.nutrients_id?.choline_daily_value || null,
        },
        Calcium: {
          value:
            fish.nutrients_id.calcium_units?.match(/\d*\.*\d*/g)[0] || null,
          units:
            fish.nutrients_id.calcium_units?.match(/(mcg|mg|IU)/)[0] || null,
          daily_value: fish.nutrients_id.calcium_daily_value,
        },
        Iron: {
          value: fish.nutrients_id.iron_units?.match(/\d*\.*\d*/g)[0] || null,
          units: fish.nutrients_id.iron_units?.match(/(mcg|mg|IU)/)[0] || null,
          daily_value: fish.nutrients_id.iron_daily_value,
        },
        Magnesium: {
          value:
            fish.nutrients_id.magnesium_units?.match(/\d*\.*\d*/g)[0] || null,
          units:
            fish.nutrients_id.magnesium_units?.match(/(mcg|mg|IU)/)[0] || null,
          daily_value: fish.nutrients_id.magnesium_daily_value,
        },
        Phosphorus: {
          value:
            fish.nutrients_id.phosphorus_units?.match(/\d*\.*\d*/g)[0] || null,
          units:
            fish.nutrients_id.phosphorus_units?.match(/(mcg|mg|IU)/)[0] || null,
          daily_value: fish.nutrients_id.phosphorus_daily_value,
        },
        Potassium: {
          value:
            fish.nutrients_id.potassium_units?.match(/\d*\.*\d*/g)[0] || null,
          units:
            fish.nutrients_id.potassium_units?.match(/(mcg|mg|IU)/)[0] || null,
          daily_value: fish.nutrients_id.potassium_daily_value,
        },
        Sodium: {
          value: fish.nutrients_id.sodium_units?.match(/\d*\.*\d*/g)[0] || null,
          units:
            fish.nutrients_id.sodium_units?.match(/(mcg|mg|IU)/)[0] || null,
          daily_value: fish.nutrients_id.sodium_daily_value,
        },
        Zinc: {
          value: fish.nutrients_id.zinc_units?.match(/\d*\.*\d*/g)[0] || null,
          units: fish.nutrients_id.zinc_units?.match(/(mcg|mg|IU)/)[0] || null,
          daily_value: fish.nutrients_id.zinc_daily_value,
        },
        Copper: {
          value: fish.nutrients_id.copper_units?.match(/\d*\.*\d*/g)[0] || null,
          units:
            fish.nutrients_id.copper_units?.match(/(mcg|mg|IU)/)[0] || null,
          daily_value: fish.nutrients_id.copper_daily_value,
        },
        Manganese: {
          value:
            fish.nutrients_id.manganese_units?.match(/\d*\.*\d*/g)[0] || null,
          units:
            fish.nutrients_id.manganese_units?.match(/(mcg|mg|IU)/)[0] || null,
          daily_value: fish.nutrients_id.manganese_daily_value,
        },
        Selenium: {
          value:
            fish.nutrients_id.selenium_units?.match(/\d*\.*\d*/g)[0] || null,
          units:
            fish.nutrients_id.selenium_units?.match(/(mcg|mg|IU)/)[0] || null,
          daily_value: fish.nutrients_id.selenium_daily_value,
        },
        Cholesterol: {
          value:
            fish.nutrients_id.cholesterol_units?.match(/\d*\.*\d*/g)[0] || null,
          units:
            fish.nutrients_id.cholesterol_units?.match(/(mcg|mg|IU)/)[0] ||
            null,
          daily_value: fish.nutrients_id.cholesterol_daily_value,
        },
        "Omega 6": {
          value: fish.nutrients_id.omega6_units?.match(/\d*\.*\d*/g)[0] || null,
          units:
            fish.nutrients_id.omega6_units?.match(/(mcg|mg|IU)/)[0] || null,
          daily_value: null,
        },
        "Omega 3": {
          value: fish.nutrients_id.omega3_units?.match(/\d*\.*\d*/g)[0] || null,
          units:
            fish.nutrients_id.omega3_units?.match(/(mcg|mg|IU)/)[0] || null,
          daily_value: null,
        },
      },
      macros: {
        Protein: {
          value: fish.nutrients_id.protein,
        },
        Fat: {
          value: fish.nutrients_id.fat,
        },
        Carbs: {
          value: fish.nutrients_id.carbs,
        },
        "Saturated Fat": {
          value: fish.nutrients_id.saturated_fat,
        },
        "Polyunsaturated Fat": {
          value: fish.nutrients_id.polyunsaturated_fat,
        },
        "Monounsaturated Fat": {
          value: fish.nutrients_id.monounsaturated_fat,
        },
      },
    });
  }, [fish]);
  const toggleQuantity = (newQuantity) => {
    setQuantity(newQuantity);

    const ratio =
      fish.nutrients_id.quantity / Number(newQuantity.match(/\d+/g)[0]);

    setNutrientObject((prev) => {
      return {
        nutrients: {
          "Vitamin A": {
            value:
              fish.nutrients_id.vitamin_a_units == null
                ? ""
                : (
                    fish.nutrients_id.vitamin_a_units?.match(/\d*\.*\d*/g)[0] /
                    ratio
                  ).toFixed(2) || null,
            units:
              fish.nutrients_id.vitamin_a_units?.match(/(mcg|mg|IU)/)[0] ||
              null,
            daily_value: (
              fish.nutrients_id.vitamin_a_daily_value / ratio
            ).toFixed(2),
          },
          "Vitamin C": {
            value:
              fish.nutrients_id.vitamin_c_units == null
                ? ""
                : (
                    fish.nutrients_id.vitamin_c_units?.match(/\d*\.*\d*/g)[0] /
                    ratio
                  ).toFixed(2),
            units:
              fish.nutrients_id.vitamin_c_units?.match(/(mcg|mg|IU)/)[0] ||
              null,
            daily_value: (
              fish.nutrients_id.vitamin_c_daily_value / ratio
            ).toFixed(2),
          },
          "Vitamin D": {
            value:
              fish.nutrients_id.vitamin_d_units == null
                ? ""
                : (
                    fish.nutrients_id.vitamin_d_units?.match(/\d*\.*\d*/g)[0] /
                    ratio
                  ).toFixed(2),
            units:
              fish.nutrients_id.vitamin_d_units?.match(/(mcg|mg|IU)/)[0] || 0,
            daily_value:
              (fish.nutrients_id.vitamin_d_daily_value / ratio).toFixed(2) || 0,
          },
          "Vitamin E": {
            value:
              fish.nutrients_id.vitamin_e_units == null
                ? ""
                : (
                    fish.nutrients_id.vitamin_e_units?.match(/\d*\.*\d*/g)[0] /
                    ratio
                  ).toFixed(2) || null,
            units:
              fish.nutrients_id.vitamin_e_units?.match(/(mcg|mg|IU)/)[0] ||
              null,
            daily_value: (
              fish.nutrients_id.vitamin_e_daily_value / ratio
            ).toFixed(2),
          },
          "Vitamin K": {
            value:
              fish.nutrients_id.vitamin_k_units == null
                ? ""
                : (
                    fish.nutrients_id.vitamin_k_units?.match(/\d*\.*\d*/g)[0] /
                    ratio
                  ).toFixed(2) || null,
            units:
              fish.nutrients_id.vitamin_k_units?.match(/(mcg|mg|IU)/)[0] ||
              null,
            daily_value: (
              fish.nutrients_id.vitamin_k_daily_value / ratio
            ).toFixed(2),
          },
          Thiamin: {
            value:
              fish.nutrients_id.thiamin_units == null
                ? ""
                : (
                    fish.nutrients_id.thiamin_units?.match(/\d*\.*\d*/g)[0] /
                    ratio
                  ).toFixed(2) || null,
            units:
              fish.nutrients_id.thiamin_units?.match(/(mcg|mg|IU)/)[0] || null,
            daily_value: (
              fish.nutrients_id.thiamin_daily_value / ratio
            ).toFixed(2),
          },
          Niacin: {
            value:
              fish.nutrients_id.niacin_units == null
                ? ""
                : (
                    fish.nutrients_id.niacin_units?.match(/\d*\.*\d*/g)[0] /
                    ratio
                  ).toFixed(2) || null,
            units:
              fish.nutrients_id.niacin_units?.match(/(mcg|mg|IU)/)[0] || null,
            daily_value: (fish.nutrients_id.niacin_daily_value / ratio).toFixed(
              2
            ),
          },
          "Vitamin B6": {
            value:
              fish.nutrients_id.vitamin_b6_units == null
                ? ""
                : (
                    fish.nutrients_id.vitamin_b6_units?.match(/\d*\.*\d*/g)[0] /
                    ratio
                  ).toFixed(2) || null,
            units:
              fish.nutrients_id.vitamin_b6_units?.match(/(mcg|mg|IU)/)[0] ||
              null,
            daily_value: (
              fish.nutrients_id.vitamin_b6_daily_value / ratio
            ).toFixed(2),
          },
          Folate: {
            value:
              fish.nutrients_id.folate_units == null
                ? ""
                : (
                    fish.nutrients_id.folate_units?.match(/\d*\.*\d*/g)[0] /
                    ratio
                  ).toFixed(2) || null,
            units:
              fish.nutrients_id.folate_units?.match(/(mcg|mg|IU)/)[0] || null,
            daily_value: (fish.nutrients_id.folate_daily_value / ratio).toFixed(
              2
            ),
          },
          "Vitamin B12": {
            value:
              fish.nutrients_id.vitamin_b12_units == null
                ? ""
                : (
                    fish.nutrients_id.vitamin_b12_units?.match(
                      /\d*\.*\d*/g
                    )[0] / ratio
                  ).toFixed(2) || null,
            units:
              fish.nutrients_id.vitamin_b12_units?.match(/(mcg|mg|IU)/)[0] ||
              null,
            daily_value: (
              fish.nutrients_id.vitamin_b12_daily_value / ratio
            ).toFixed(2),
          },
          "Pantothenic Acid": {
            value:
              fish.nutrients_id.pantothenic_acid_units == null
                ? ""
                : (
                    fish.nutrients_id.pantothenic_acid_units?.match(
                      /\d*\.*\d*/g
                    )[0] / ratio
                  ).toFixed(2) || null,
            units:
              fish.nutrients_id.pantothenic_acid_units?.match(
                /(mcg|mg|IU)/
              )[0] || null,
            daily_value: (
              fish.nutrients_id.pantothenic_acid_daily_value / ratio
            ).toFixed(2),
          },
          Choline: {
            value:
              fish.nutrients_id.choline_units == null
                ? ""
                : (
                    fish.nutrients_id.choline_units?.match(/\d*\.*\d*/g)[0] /
                    ratio
                  ).toFixed(2) || null,
            units:
              fish.nutrients_id.choline_units?.match(/(mcg|mg|IU)/)[0] || null,
            daily_value: fish.nutrients_id?.choline_daily_value || null,
          },
          Calcium: {
            value:
              fish.nutrients_id.calcium_units == null
                ? ""
                : (
                    fish.nutrients_id.calcium_units?.match(/\d*\.*\d*/g)[0] /
                    ratio
                  ).toFixed(2) || null,
            units:
              fish.nutrients_id.calcium_units?.match(/(mcg|mg|IU)/)[0] || null,
            daily_value: (
              fish.nutrients_id.calcium_daily_value / ratio
            ).toFixed(2),
          },
          Iron: {
            value:
              fish.nutrients_id.iron_units == null
                ? ""
                : (
                    fish.nutrients_id.iron_units?.match(/\d*\.*\d*/g)[0] / ratio
                  ).toFixed(2) || null,
            units:
              fish.nutrients_id.iron_units?.match(/(mcg|mg|IU)/)[0] || null,
            daily_value: (fish.nutrients_id.iron_daily_value / ratio).toFixed(
              2
            ),
          },
          Magnesium: {
            value:
              fish.nutrients_id.magnesium_units == null
                ? ""
                : (
                    fish.nutrients_id.magnesium_units?.match(/\d*\.*\d*/g)[0] /
                    ratio
                  ).toFixed(2) || null,
            units:
              fish.nutrients_id.magnesium_units?.match(/(mcg|mg|IU)/)[0] ||
              null,
            daily_value: (
              fish.nutrients_id.magnesium_daily_value / ratio
            ).toFixed(2),
          },
          Phosphorus: {
            value:
              fish.nutrients_id.phosphorus_units == null
                ? ""
                : (
                    fish.nutrients_id.phosphorus_units?.match(/\d*\.*\d*/g)[0] /
                    ratio
                  ).toFixed(2) || null,
            units:
              fish.nutrients_id.phosphorus_units?.match(/(mcg|mg|IU)/)[0] ||
              null,
            daily_value: (
              fish.nutrients_id.phosphorus_daily_value / ratio
            ).toFixed(2),
          },
          Potassium: {
            value:
              fish.nutrients_id.potassium_units == null
                ? ""
                : (
                    fish.nutrients_id.potassium_units?.match(/\d*\.*\d*/g)[0] /
                    ratio
                  ).toFixed(2) || null,
            units:
              fish.nutrients_id.potassium_units?.match(/(mcg|mg|IU)/)[0] ||
              null,
            daily_value: (
              fish.nutrients_id.potassium_daily_value / ratio
            ).toFixed(2),
          },
          Sodium: {
            value:
              fish.nutrients_id.sodium_units == null
                ? ""
                : (
                    fish.nutrients_id.sodium_units?.match(/\d*\.*\d*/g)[0] /
                    ratio
                  ).toFixed(2) || null,
            units:
              fish.nutrients_id.sodium_units?.match(/(mcg|mg|IU)/)[0] || null,
            daily_value: (fish.nutrients_id.sodium_daily_value / ratio).toFixed(
              2
            ),
          },
          Zinc: {
            value:
              fish.nutrients_id.zinc_units == null
                ? ""
                : (
                    fish.nutrients_id.zinc_units?.match(/\d*\.*\d*/g)[0] / ratio
                  ).toFixed(2) || null,
            units:
              fish.nutrients_id.zinc_units?.match(/(mcg|mg|IU)/)[0] || null,
            daily_value: (fish.nutrients_id.zinc_daily_value / ratio).toFixed(
              2
            ),
          },
          Copper: {
            value:
              fish.nutrients_id.copper_units == null
                ? ""
                : (
                    fish.nutrients_id.copper_units?.match(/\d*\.*\d*/g)[0] /
                    ratio
                  ).toFixed(2) || null,
            units:
              fish.nutrients_id.copper_units?.match(/(mcg|mg|IU)/)[0] || null,
            daily_value: (fish.nutrients_id.copper_daily_value / ratio).toFixed(
              2
            ),
          },
          Manganese: {
            value:
              fish.nutrients_id.manganese_units == null
                ? ""
                : (
                    fish.nutrients_id.manganese_units?.match(/\d*\.*\d*/g)[0] /
                    ratio
                  ).toFixed(2) || null,
            units:
              fish.nutrients_id.manganese_units?.match(/(mcg|mg|IU)/)[0] ||
              null,
            daily_value: (
              fish.nutrients_id.manganese_daily_value / ratio
            ).toFixed(2),
          },
          Selenium: {
            value:
              fish.nutrients_id.selenium_units == null
                ? ""
                : (
                    fish.nutrients_id.selenium_units?.match(/\d*\.*\d*/g)[0] /
                    ratio
                  ).toFixed(2) || null,
            units:
              fish.nutrients_id.selenium_units?.match(/(mcg|mg|IU)/)[0] || null,
            daily_value: (
              fish.nutrients_id.selenium_daily_value / ratio
            ).toFixed(2),
          },
          Cholesterol: {
            value:
              fish.nutrients_id.cholesterol_units == null
                ? ""
                : (
                    fish.nutrients_id.cholesterol_units?.match(
                      /\d*\.*\d*/g
                    )[0] / ratio
                  ).toFixed(2) || null,
            units:
              fish.nutrients_id.cholesterol_units?.match(/(mcg|mg|IU)/)[0] ||
              null,
            daily_value: (
              fish.nutrients_id.cholesterol_daily_value / ratio
            ).toFixed(2),
          },
          "Omega 6": {
            value:
              fish.nutrients_id.omega6_units == null
                ? ""
                : (
                    fish.nutrients_id.omega6_units?.match(/\d*\.*\d*/g)[0] /
                    ratio
                  ).toFixed(2) || null,
            units:
              fish.nutrients_id.omega6_units?.match(/(mcg|mg|IU)/)[0] || null,
            daily_value: null,
          },
          "Omega 3": {
            value:
              fish.nutrients_id.omega3_units == null
                ? ""
                : (
                    fish.nutrients_id.omega3_units?.match(/\d*\.*\d*/g)[0] /
                    ratio
                  ).toFixed(2) || null,
            units:
              fish.nutrients_id.omega3_units?.match(/(mcg|mg|IU)/)[0] || null,
            daily_value: null,
          },
        },
        macros: {
          Protein: {
            value: (fish.nutrients_id.protein / ratio).toFixed(2),
          },
          Fat: {
            value: (fish.nutrients_id.Fat / ratio).toFixed(2),
          },
          Carbs: {
            value: (fish.nutrients_id.carbs / ratio).toFixed(2),
          },
          "Saturated Fat": {
            value: (fish.nutrients_id.saturated_fat / ratio).toFixed(2),
          },
          "Polyunsaturated Fat": {
            value: (fish.nutrients_id.polyunsaturated_fat / ratio).toFixed(2),
          },
          "Monounsaturated Fat": {
            value: (fish.nutrients_id.monounsaturated_fat / ratio).toFixed(2),
          },
        },
      };
    });
  };

  return (
    <Cont colors={COLORS}>
      <div className="center-inline">
        <h5 className="blue mar-bottom-32">Nutrition Facts</h5>
      </div>
      <NutrientTopSection
        name={fish.name}
        allFish={allFish}
        fish={fish}
        quantity={quantity}
        setQuantity={toggleQuantity}
        nutrientObject={nutrientObject}
        reFetchFish={reFetchFood}
      />
      <div className="nutrient-sections-holder">
        <div className="nutrient-holder box-shadow-2">
          <div className="nutrient-title">
            <p className="bold">Vitamins</p>
          </div>
          <NutrientLine
            name="Vitamin A"
            units={`${nutrientObject.nutrients["Vitamin A"].value || ""} ${
              nutrientObject.nutrients["Vitamin A"].units || ""
            }`}
            dv={nutrientObject.nutrients["Vitamin A"].daily_value}
          />
          <NutrientLine
            name="Vitamin C"
            units={`${nutrientObject.nutrients["Vitamin C"].value || ""} ${
              nutrientObject.nutrients["Vitamin C"].units || ""
            }`}
            dv={nutrientObject.nutrients["Vitamin C"].daily_value}
          />
          <NutrientLine
            name="Vitamin D"
            units={`${nutrientObject.nutrients["Vitamin D"].value || ""} ${
              nutrientObject.nutrients["Vitamin D"].units || ""
            }`}
            dv={nutrientObject.nutrients["Vitamin D"].daily_value}
          />
          <NutrientLine
            name="Vitamin E"
            units={`${nutrientObject.nutrients["Vitamin E"].value || ""} ${
              nutrientObject.nutrients["Vitamin E"].units || ""
            }`}
            dv={nutrientObject.nutrients["Vitamin E"].daily_value}
          />
          <NutrientLine
            name="Vitamin K"
            units={`${nutrientObject.nutrients["Vitamin K"].value || ""} ${
              nutrientObject.nutrients["Vitamin K"].units || ""
            }`}
            dv={nutrientObject.nutrients["Vitamin K"].daily_value}
          />
          <NutrientLine
            name="Thiamin"
            units={`${nutrientObject.nutrients["Thiamin"].value || ""} ${
              nutrientObject.nutrients["Thiamin"].units || ""
            }`}
            dv={nutrientObject.nutrients["Thiamin"].daily_value}
          />
          <NutrientLine
            name="Niacin"
            units={`${nutrientObject.nutrients["Niacin"].value || ""} ${
              nutrientObject.nutrients["Niacin"].units || ""
            }`}
            dv={nutrientObject.nutrients["Niacin"].daily_value}
          />
          <NutrientLine
            name="Vitamin B6"
            units={`${nutrientObject.nutrients["Vitamin B6"].value || ""} ${
              nutrientObject.nutrients["Vitamin B6"].units || ""
            }`}
            dv={nutrientObject.nutrients["Vitamin B6"].daily_value || ""}
          />
          <NutrientLine
            name="Folate"
            units={`${nutrientObject.nutrients["Folate"].value || ""} ${
              nutrientObject.nutrients["Folate"].units || ""
            }`}
            dv={nutrientObject.nutrients["Folate"].daily_value}
          />
          <NutrientLine
            name="Vitamin B12"
            units={`${nutrientObject.nutrients["Vitamin B12"].value || ""} ${
              nutrientObject.nutrients["Vitamin B12"].units || ""
            }`}
            dv={nutrientObject.nutrients["Vitamin B12"].daily_value}
          />
          <NutrientLine
            name="Pantothenic Acid"
            units={`${
              nutrientObject.nutrients["Pantothenic Acid"].value || ""
            } ${nutrientObject.nutrients["Pantothenic Acid"].units || ""}`}
            dv={nutrientObject.nutrients["Pantothenic Acid"].daily_value}
          />
          <NutrientLine
            name="Choline"
            units={`${nutrientObject.nutrients["Choline"].value || ""} ${
              nutrientObject.nutrients["Choline"].units || ""
            }`}
            dv={nutrientObject.nutrients["Choline"].daily_value}
          />
          <NutrientLine
            name="Calcium"
            units={`${nutrientObject.nutrients["Calcium"].value || ""} ${
              nutrientObject.nutrients["Calcium"].units || ""
            }`}
            dv={nutrientObject.nutrients["Calcium"].daily_value}
          />
        </div>
        <div className="mar-bottom-32"></div>
        <div className="nutrient-holder box-shadow-2">
          <div className="nutrient-title">
            <p className="bold">Minerals</p>
          </div>

          <NutrientLine
            name="Iron"
            units={`${nutrientObject.nutrients["Iron"].value || ""} ${
              nutrientObject.nutrients["Iron"].units || ""
            }`}
            dv={nutrientObject.nutrients["Iron"].daily_value}
          />
          <NutrientLine
            name="Magnesium"
            units={`${nutrientObject.nutrients["Magnesium"].value || ""} ${
              nutrientObject.nutrients["Magnesium"].units || ""
            }`}
            dv={nutrientObject.nutrients["Magnesium"].daily_value}
          />
          <NutrientLine
            name="Phosphorus"
            units={`${nutrientObject.nutrients["Phosphorus"].value || ""} ${
              nutrientObject.nutrients["Phosphorus"].units || ""
            }`}
            dv={nutrientObject.nutrients["Phosphorus"].daily_value}
          />
          <NutrientLine
            name="Potassium"
            units={`${nutrientObject.nutrients["Potassium"].value || ""} ${
              nutrientObject.nutrients["Potassium"].units || ""
            }`}
            dv={nutrientObject.nutrients["Potassium"].daily_value}
          />
          <NutrientLine
            name="Sodium"
            units={`${nutrientObject.nutrients["Sodium"].value || ""} ${
              nutrientObject.nutrients["Sodium"].units || ""
            }`}
            dv={nutrientObject.nutrients["Sodium"].daily_value}
          />
          <NutrientLine
            name="Zinc"
            units={`${nutrientObject.nutrients["Zinc"].value || ""} ${
              nutrientObject.nutrients["Zinc"].units || ""
            }`}
            dv={nutrientObject.nutrients["Zinc"].daily_value}
          />
          <NutrientLine
            name="Copper"
            units={`${nutrientObject.nutrients["Copper"].value || ""} ${
              nutrientObject.nutrients["Copper"].units || ""
            }`}
            dv={nutrientObject.nutrients["Copper"].daily_value}
          />
          <NutrientLine
            name="Manganese"
            units={`${nutrientObject.nutrients["Manganese"].value || ""} ${
              nutrientObject.nutrients["Manganese"].units || ""
            }`}
            dv={nutrientObject.nutrients["Manganese"].daily_value}
          />
          <NutrientLine
            name="Selenium"
            units={`${nutrientObject.nutrients["Selenium"].value || ""} ${
              nutrientObject.nutrients["Selenium"].units || ""
            }`}
            dv={nutrientObject.nutrients["Selenium"].daily_value}
          />
          <NutrientLine
            name="Cholesterol"
            units={`${nutrientObject.nutrients["Cholesterol"].value || ""} ${
              nutrientObject.nutrients["Cholesterol"].units || ""
            }`}
            dv={nutrientObject.nutrients["Cholesterol"].daily_value}
          />
        </div>
        <div className="mar-bottom-32"></div>
        <div className="nutrient-holder box-shadow-2">
          <div className="nutrient-title">
            <p className="bold">Macronutrients</p>
          </div>
          <MacroLine
            name="Protein"
            units={nutrientObject.macros.Protein.value}
            grams={true}
          />

          <MacroLine
            name="Carbohydrates"
            units={nutrientObject.macros.Carbs.value}
            grams={true}
          />

          <div className="mar-bottom-32"></div>
          <div className="nutrient-title">
            <p className="bold">Fatty Acids</p>
          </div>
          <MacroLine
            name="Total Fat"
            units={nutrientObject.macros.Fat.value}
            grams={true}
          />
          <MacroLine
            name="Saturated Fat"
            units={nutrientObject.macros["Saturated Fat"].value}
            grams={true}
          />
          <MacroLine
            name="Monounsaturated Fat"
            units={nutrientObject.macros["Monounsaturated Fat"].value}
            grams={true}
          />
          <MacroLine
            name="Polyunsaturated Fat"
            units={nutrientObject.macros["Polyunsaturated Fat"].value}
            grams={true}
          />
          <MacroLine
            name="Omega 6"
            units={`${nutrientObject.nutrients["Omega 3"].value || ""} mg`}
          />

          <MacroLine
            name="Omega 3"
            units={`${nutrientObject.nutrients["Omega 6"].value || ""} mg`}
          />
        </div>
      </div>
      <div className="sm-spacer-bot-res"></div>
    </Cont>
  );
};

export default Index;
