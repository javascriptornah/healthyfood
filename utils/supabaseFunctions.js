import supabase from "./supabaseClient";

const createLocation = async (
  name,
  description,
  hoursFrom = null,
  hoursTo = null,
  pickup,
  website = null,
  email = null,
  number = null,
  tags,
  grassFed,
  organic,
  vaccineFree,
  pastureRaised,
  soyFree,
  A2,
  unfrozen,
  pricing,
  quality,
  friendly,
  howToOrder,
  icon
) => {
  try {
    const { data, error } = await supabase
      .from("locations")
      .insert({
        name,
        description,
        hoursFrom,
        hoursTo,
        pickup,
        website,
        email,
        number,
        tags,
        grassFed,
        organic,
        vaccineFree,
        pastureRaised,
        soyFree,
        A2,
        unfrozen,
        pricing,
        quality,
        friendly,
        howToOrder,
        icon,
      })
      .select("id")
      .single();
    if (error) throw error;

    return data.id;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default createLocation;

export const createUserLocation = async (
  name,
  description,
  hoursFrom = null,
  hoursTo = null,
  pickup,
  website = null,
  email = null,
  number = null,
  tags,
  grassFed,
  organic,
  vaccineFree,
  pastureRaised,
  soyFree,
  A2,
  unfrozen,
  pricing,
  quality,
  friendly,
  howToOrder,
  user_id,
  icon
) => {
  try {
    const { data, error } = await supabase
      .from("locations")
      .insert({
        name,
        description,
        hoursFrom,
        hoursTo,
        pickup,
        website,
        email,
        number,
        tags,
        grassFed,
        organic,
        vaccineFree,
        pastureRaised,
        soyFree,
        A2,
        unfrozen,
        pricing,
        quality,
        friendly,
        howToOrder,
        user_id,
        icon,
      })
      .select("id")
      .single();
    if (error) throw error;

    return data.id;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateLocation = async (
  name,
  description,
  hoursFrom = null,
  hoursTo = null,
  pickup,
  website = null,
  email = null,
  number = null,
  grassFed,
  organic,
  vaccineFree,
  pastureRaised,
  soyFree,
  A2,
  unfrozen,
  pricing,
  quality,
  friendly,
  howToOrder,
  id
) => {
  try {
    const { data, error } = await supabase
      .from("locations")
      .update({
        name,
        description,
        hoursFrom,
        hoursTo,
        pickup,
        website,
        email,
        number,
        grassFed,
        organic,
        vaccineFree,
        pastureRaised,
        soyFree,
        A2,
        unfrozen,
        pricing,
        quality,
        friendly,
        howToOrder,
      })
      .eq("id", id);

    if (error) throw error;

    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteLocation = async (id) => {
  try {
    const { data, error } = await supabase
      .from("locations")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return true;
  } catch (error) {
    return error.message;
  }
};

export const createAddress = async (
  location_id,
  full_address,
  text_address,
  lat,
  lng,
  country,
  state
) => {
  try {
    const country_id = await fetchCountryByName(country);
    const state_id = await fetchStateByName(state);

    const { data, error } = await supabase
      .from("address")
      .insert({
        full_address,
        text_address,
        lat,
        lng,
        country_id,
        state_id,
        location_id,
      })
      .select();
    if (error) throw error;
    return true;
  } catch (error) {
    return false;
  }
};

export const updateAddress = async (
  location_id,
  full_address,
  text_address,
  lat,
  lng,
  country,
  state,
  city
) => {
  try {
    const country_id = await fetchCountryByName(country);
    const state_id = await fetchStateByName(state);
    const city_id = await fetchCityByName(city);
    const { data, error } = await supabase
      .from("address")
      .update({
        full_address,
        text_address,
        lat,
        lng,
        country_id,
        state_id,
        location_id,
      })
      .eq("location_id", location_id)
      .select();
    if (error) throw error;
    return true;
  } catch (error) {
    return false;
  }
};

export const fetchCountryByName = async (name) => {
  try {
    const { data, error } = await supabase
      .from("country")
      .select()
      .eq("name", name);
    if (data.length === 0) {
      const { data, error2 } = await supabase
        .from("country")
        .insert({ name })
        .select();
      return data[0].id;
    }

    if (error) throw error;

    return data[0].id;
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchCityByName = async (name) => {
  try {
    const { data, error } = await supabase
      .from("cities")
      .select()
      .eq("name", name);

    if (data.length === 0) {
      const { data, error2 } = await supabase
        .from("cities")
        .insert({ name })
        .select();

      return data[0].id;
    }

    if (error) throw error;
    return data[0].id;
  } catch (error) {
    console.log(error);
  }
};

export const fetchStateByName = async (name) => {
  try {
    const { data, error } = await supabase
      .from("state")
      .select()
      .eq("name", name);

    if (data.length === 0) {
      const { data, error2 } = await supabase
        .from("state")
        .insert({ name })
        .select();

      return data[0].id;
    }

    if (error) throw error;
    return data[0].id;
  } catch (error) {
    console.log(error);
  }
};

export const fetchLocations = async () => {
  try {
    const { data, error } = await supabase
      .from("locations")
      .select(
        "*,address(*, country_id(name), state_id(name)), products(*), images(*)"
      );
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const fetchUserLocations = async (user_id) => {
  try {
    const { data, error } = await supabase
      .from("locations")
      .select("*, address(*), products(*), images(*)")
      .eq("user_id", user_id);
    if (error) throw error;
    return data;
  } catch (error) {
    return false;
  }
};

export const fetchTags = async () => {
  try {
    const { data, error } = await supabase.from("tags").select("name, id");
    return data;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const createTag = async (name) => {
  try {
    const { data, error } = await supabase.from("tags").insert({ name });
    if (error) throw error;
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const createProduct = async (
  location_id,
  name,
  price,
  dollarType,
  measurement
) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .insert({ location_id, name, price, dollarType, measurement });
    if (error) throw error;
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const deleteProduct = async (id) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const fetchLocation = async (id) => {
  try {
    const { data, error } = await supabase
      .from("locations")
      .select("*,address(*), products(*), images(*)")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const createImage = async (url, deleteHash, location_id) => {
  try {
    const { data, error } = await supabase
      .from("images")
      .insert({ url, deleteHash, location_id });
    if (error) throw error;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteImage = async (id) => {
  try {
    const { data, error } = await supabase.from("images").delete().eq("id", id);
    if (error) throw error;
    return true;
  } catch (error) {
    return false;
  }
};

export const createImageFetch = async (url, deleteHash, location_id) => {
  try {
    const { data, error } = await supabase
      .from("images")
      .insert({ url, deleteHash, location_id })
      .select();
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const checkUsernameUnique = async (username) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("username", username);
    if (error) throw error;
    // if username doesn't exist, return true
    if (!data.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const checkEmailUnique = async (email) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("email", email);
    if (error) throw error;
    // if email doesn't exist, return true
    if (!data.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const createFish = async (name, nutrients_id) => {
  try {
    const { data, error } = await supabase
      .from("fish")
      .insert({ name, nutrients_id })
      .select();
    if (error) throw error;
    return data;
  } catch (error) {
    return error;
  }
};

export const createFood = async (
  name,
  nutrients_id,
  food_category_id,
  measurement
) => {
  try {
    const { data, error } = await supabase
      .from("foods")
      .insert({ name, nutrients_id, food_category_id, measurement })
      .select();
    if (error) throw error;
    return data;
  } catch (error) {
    return error;
  }
};

export const createNutrients = async (
  vitamin_a_daily_value,
  vitamin_a_units,
  vitamin_c_daily_value,
  vitamin_c_units,
  vitamin_d_daily_value,
  vitamin_d_units,
  vitamin_e_daily_value,
  vitamin_e_units,
  vitamin_k_daily_value,
  vitamin_k_units,
  thiamin_daily_value,
  thiamin_units,
  niacin_daily_value,
  niacin_units,
  vitamin_b6_daily_value,
  vitamin_b6_units,
  folate_daily_value,
  folate_units,
  vitamin_b12_daily_value,
  vitamin_b12_units,
  pantothenic_acid_daily_value,
  pantothenic_acid_units,
  choline_daily_value,
  choline_units,
  calcium_daily_value,
  calcium_units,
  iron_daily_value,
  iron_units,
  magnesium_daily_value,
  magnesium_units,
  phosphorus_daily_value,
  phosphorus_units,
  potassium_daily_value,
  potassium_units,
  sodium_daily_value,
  sodium_units,
  zinc_daily_value,
  zinc_units,
  copper_daily_value,
  copper_units,
  manganese_daily_value,
  manganese_units,
  selenium_daily_value,
  selenium_units,
  cholesterol_daily_value,
  cholesterol_units,
  omega3_units,
  omega6_units,
  protein,
  carbs,
  fat,
  polyunsaturated_fat,
  saturated_fat,
  monounsaturated_fat,
  quantity,
  fiber,
  starch,
  sugars
) => {
  try {
    const { data, error } = await supabase
      .from("nutrients")
      .insert({
        vitamin_a_daily_value,
        vitamin_a_units,
        vitamin_c_daily_value,
        vitamin_c_units,
        vitamin_d_daily_value,
        vitamin_d_units,
        vitamin_e_daily_value,
        vitamin_e_units,
        vitamin_k_daily_value,
        vitamin_k_units,
        thiamin_daily_value,
        thiamin_units,
        niacin_daily_value,
        niacin_units,
        vitamin_b6_daily_value,
        vitamin_b6_units,
        folate_daily_value,
        folate_units,
        vitamin_b12_daily_value,
        vitamin_b12_units,
        pantothenic_acid_daily_value,
        pantothenic_acid_units,
        choline_daily_value,
        choline_units,
        calcium_daily_value,
        calcium_units,
        iron_daily_value,
        iron_units,
        magnesium_daily_value,
        magnesium_units,
        phosphorus_daily_value,
        phosphorus_units,
        potassium_daily_value,
        potassium_units,
        sodium_daily_value,
        sodium_units,
        zinc_daily_value,
        zinc_units,
        copper_daily_value,
        copper_units,
        manganese_daily_value,
        manganese_units,
        selenium_daily_value,
        selenium_units,
        cholesterol_daily_value,
        cholesterol_units,
        omega3_units,
        omega6_units,
        protein,
        carbs,
        fat,
        polyunsaturated_fat,
        saturated_fat,
        monounsaturated_fat,
        quantity,
        fiber,
        starch,
        sugars,
      })
      .select();
    if (error) throw error;
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchOceans = async () => {
  try {
    const { data, error } = await supabase.from("oceans").select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchOceansData = async () => {
  try {
    const { data, error } = await supabase
      .from("oceans")
      .select("name, oceanFish(fish_id(name))");

    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchSeas = async () => {
  try {
    const { data, error } = await supabase.from("seas").select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchSeaNames = async () => {
  try {
    const { data, error } = await supabase.from("seas").select("name");

    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchSeaByName = async (name) => {
  try {
    const { data, error } = await supabase
      .from("seas")
      .select(
        "*, oceanFish(fish_id(name)), pollution(name, date, severity, description))"
      )
      .eq("name", name);

    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchSeasData = async () => {
  try {
    const { data, error } = await supabase
      .from("seas")
      .select("name, oceanFish(fish_id(name))");

    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchOceanFish = async () => {
  try {
    const { data, error } = await supabase
      .from("oceanFish")
      .select("*, fish_id(*)");

    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchFishByName = async (name) => {
  try {
    const { data, error } = await supabase
      .from("fish")
      .select("*, nutrients_id(*), oceanFish(ocean_id(name), sea_id(name))")
      .eq("name", name);

    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchFish = async (name) => {
  try {
    const { data, error } = await supabase.from("fish").select("name");

    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchAllFishNames = async () => {
  try {
    const { data, error } = await supabase.from("fish").select("name");

    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchAllFish = async () => {
  try {
    const { data, error } = await supabase
      .from("fish")
      .select("name, nutrients_id(*), food_category_id(name)");

    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchPollution = async () => {
  try {
    const { data, error } = await supabase.from("pollution").select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchAllFoods = async () => {
  try {
    const { data, error } = await supabase
      .from("foods")
      .select("name, id, nutrients_id(*), food_category_id(name)");

    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchAllFoodIds = async () => {
  try {
    const { data, error } = await supabase.from("foods").select("id");

    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchFoodCategoryByName = async (name) => {
  try {
    const { data, error } = await supabase
      .from("foodCategory")
      .select("name, foods(name, id, nutrients_id(*), food_category_id(name))")
      .eq("name", name)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchFoodById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("foods")
      .select("name, nutrients_id(*), food_category_id(name)")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchFoodByName = async (name) => {
  try {
    const { data, error } = await supabase
      .from("foods")
      .select("name, nutrients_id(*), food_category_id(name)")
      .eq("name", name)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchForumCountryByName = async (name) => {
  try {
    const { data, error } = await supabase
      .from("forumCountries")
      .select("*, forumStates(*)")
      .eq("name", name)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchForumCountryByNameAndInsert = async (name) => {
  try {
    const { data, error } = await supabase
      .from("forumCountries")
      .select()
      .eq("name", name);
    if (data.length === 0) {
      const { data, error2 } = await supabase
        .from("forumCountries")
        .insert({ name })
        .select();
      return data[0].id;
    }

    if (error) throw error;

    return data[0].id;
  } catch (error) {
    console.log(error.message);
  }
};
export const fetchForumProvinceByName = async (name) => {
  try {
    const { data, error } = await supabase
      .from("forumStates")
      .select("*, forumCities(*)")
      .eq("name", name)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchForumStateByNameAndInsert = async (name) => {
  try {
    const { data, error } = await supabase
      .from("forumCountries")
      .select()
      .eq("name", name);
    if (data.length === 0) {
      const { data, error2 } = await supabase
        .from("forumCountries")
        .insert({ name })
        .select();
      return data[0].id;
    }

    if (error) throw error;

    return data[0].id;
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchForumCityByName = async (name) => {
  try {
    const { data, error } = await supabase
      .from("forumCities")
      .select()
      .eq("name", name);

    if (data.length === 0) {
      const { data, error2 } = await supabase
        .from("forumCities")
        .insert({ name })
        .select();
      return data[0].id;
    }

    if (error) throw error;

    return data[0].id;
  } catch (error) {
    console.log(error.message);
    return "fagot fuck";
  }
};

export const fetchPostById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*, state_id(name), country_id(name),user_id(username)")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const signInWithEmail = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) throw error;

    return { state: true, data };
  } catch (error) {
    console.log(error);
    return { state: false, error };
  }
};

export const createUserComment = async (content, user_id, post_id) => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .insert({ content, user_id, post_id })
      .select();
    if (error) throw error;

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createUserCommentReply = async (
  content,
  user_id,
  post_id,
  comment_id
) => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .insert({ content, user_id, post_id, comment_id })
      .select();
    if (error) throw error;

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createGuestComment = async (content, name, email, post_id) => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .insert({ content, name, email, post_id })
      .select();
    if (error) throw error;

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createGuestCommentReply = async (
  content,
  name,
  email,
  post_id,
  comment_id
) => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .insert({ content, name, email, post_id, comment_id })
      .select();
    if (error) throw error;

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const logout = async (content, name, email, post_id, comment_id) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    return { state: true };
  } catch (error) {
    return { state: false, error };
  }
};

export const createPost = async (
  title,
  content,
  user_id,
  country,
  state,
  city
) => {
  const city_id = city == null ? await fetchForumCityByName(city) : null;
  return { state: true, data: city };
  /*
  try {
    const country_id = await fetchForumCountryByName(country);
    const state_id = state !== null ? await fetchForumStateByName(state) : null;
    const city_id = city == null ? await fetchForumCityByName(city) : null;
    const { data, error } = await supabase
      .from("posts")
      .insert({
        title,
        content,
        user_id,
        country_id,
        state_id,
        city_id,
      })
      .select();
    if (error) throw error;

    return { state: true, data: data };
  } catch (error) {
    return { state: false, error: error };
  } */
};

export const createPostWithImage = async (
  title,
  content,
  user_id,
  img_url,
  country,
  state,
  city
) => {
  try {
    const country_id = await fetchCountryByName(country);
    const state_id =
      (await state) !== null ? await fetchStateByName(state) : null;
    const city_id = city == null ? await fetchCityByName(city) : null;
    const { data, error } = await supabase.from("posts").insert({
      title,
      content,
      user_id,
      img_url,
      country_id,
      state_id,
      city_id,
    });
    if (error) throw error;

    return { state: true };
  } catch (error) {
    return { state: false, error };
  }
};
