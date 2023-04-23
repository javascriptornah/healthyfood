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
      .select("*, forumStates(*, posts(count))")
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
export const fetchForumProvinceIdByName = async (name) => {
  try {
    const { data, error } = await supabase
      .from("forumStates")
      .select("id")
      .eq("name", name)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const fetchForumProvincePostsById = async (state_id) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select(
        "id, page_views(view_count), created_at,  title, city_id(name), user_id(username), upvotes(count), downvotes(count), comments(count)"
      )
      .eq("state_id", state_id)
      .order("id", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchForumStateByNameAndInsert = async (name, country_id) => {
  try {
    const { data, error } = await supabase
      .from("forumStates")
      .select()
      .eq("name", name);
    if (data.length === 0) {
      const { data, error2 } = await supabase
        .from("forumStates")
        .insert({ name, country_id })
        .select();
      return data[0].id;
    }

    if (error) throw error;

    return data[0].id;
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchForumCityByName = async (name, state_id) => {
  try {
    const { data, error } = await supabase
      .from("forumCities")
      .select()
      .eq("name", name);

    if (data.length === 0) {
      const { data, error2 } = await supabase
        .from("forumCities")
        .insert({ name, state_id })
        .select();

      return data[0].id;
    }

    if (error) throw error;

    return data[0].id;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const fetchPostById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select(
        "*, page_views(view_count), state_id(name), country_id(name),user_id(*), comments(*, comment_id(id), upvotes(id, users(id)), downvotes(id, users(id)), users(*), comments(*,  upvotes(id), downvotes(id), users(*))), upvotes(id), downvotes(id)"
      )
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
  const country_id = await fetchForumCountryByNameAndInsert(country);
  const state_id =
    state !== null
      ? await fetchForumStateByNameAndInsert(state, country_id)
      : null;

  const city_id =
    city !== null ? await fetchForumCityByName(city, state_id) : null;

  try {
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
      .select()
      .maybeSingle();
    if (error) throw error;

    return { status: true, data: data };
  } catch (error) {
    return { status: false, error: error };
  }
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
  const country_id = await fetchForumCountryByNameAndInsert(country);
  const state_id =
    state !== null
      ? await fetchForumStateByNameAndInsert(state, country_id)
      : null;

  const city_id =
    city !== null ? await fetchForumCityByName(city, state_id) : null;

  try {
    const { data, error } = await supabase
      .from("posts")
      .insert({
        title,
        content,
        user_id,
        img_url,
        country_id,
        state_id,
        city_id,
      })
      .select()
      .maybeSingle();
    if (error) throw error;

    return { status: true, data: data };
  } catch (error) {
    return { status: false, error: error };
  }
};

export const fetchPosts = async () => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select(
        "*, user_id(username), city_id(name), state_id(name), country_id(name)"
      )
      .order("id", { ascending: false });
    if (error) throw error;
    return data;
  } catch (error) {
    return error;
  }
};

export const createPostComment = async (content, user_id, post_id) => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .insert({ content, user_id, post_id })
      .select(
        "*,comment_id(id), users(*), upvotes(id), downvotes(id), comments(*,  upvotes(id), downvotes(id), users(*))"
      )
      .maybeSingle();
    if (error) throw error;
    return data;
  } catch (error) {
    return error;
  }
};

export const createPostCommentReply = async (
  content,
  user_id,
  post_id,
  comment_id
) => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .insert({ content, user_id, post_id, comment_id })
      .select(
        "*, comment_id(id), users(*), upvotes(id), downvotes(id), comments(*,  upvotes(id), downvotes(id), users(*))"
      )
      .maybeSingle();
    if (error) throw error;
    return { state: true, data };
  } catch (error) {
    return { state: false, error };
  }
};

export const createCommentUpvote = async (comment_id, user_id) => {
  try {
    const { data, error } = await supabase
      .from("upvotes")
      .insert({ comment_id, user_id })
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteComment = async (id) => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return true;
  } catch (error) {
    return error;
  }
};

export const deleteCommentUpvote = async (comment_id, user_id) => {
  try {
    const { data, error } = await supabase
      .from("upvotes")
      .delete()
      .eq("comment_id", comment_id)
      .eq("user_id", user_id);

    if (error) throw error;
    return data;
  } catch (error) {
    return error;
  }
};

export const createCommentDownvote = async (comment_id, user_id) => {
  try {
    const { data, error } = await supabase
      .from("downvotes")
      .insert({ comment_id, user_id });

    if (error) throw error;
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteCommentDownvote = async (comment_id, user_id) => {
  try {
    const { data, error } = await supabase
      .from("downvotes")
      .delete()
      .eq("comment_id", comment_id)
      .eq("user_id", user_id);

    if (error) throw error;
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchPostsByCountryName = async (name) => {
  try {
    const { data, error } = await supabase
      .from("forumCountries")
      .select(
        "name, posts(*, country_id(name), state_id(name), city_id(name), user_id(username), upvotes(id), downvotes(id), comments(*, upvotes(id), downvotes(id), users(*), comments(*,  upvotes(id), downvotes(id), users(*))))"
      )
      .eq("name", name)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchStateLastPostByName = async (state_id) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("title, users(username), created_at, city_id(name)")
      .eq("state_id", state_id)
      .limit(1)
      .order("id", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    return error;
  }
};
export const fetchPostLastCommentById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("comments(users(username), created_at) ")
      .eq("id", id)
      .limit(1)
      .order("id", { ascending: false })
      .maybeSingle();

    if (error) throw error;
    return data.comments[data.comments.length - 1] || {};
  } catch (error) {
    return error;
  }
};

export const fetchForumCountries = async () => {
  try {
    const { data, error } = await supabase
      .from("forumCountries")
      .select("*, forumStates(*), posts(count)")
      .or("name.eq.Canada,name.eq.United States");

    const { data: data2, error: error2 } = await supabase
      .from("continent")
      .select("*, forumCountries(*)")
      .eq("name", "Europe")
      .maybeSingle();

    if (error) throw error;
    if (error2) throw error2;
    return { data, data2 };
  } catch (error) {
    return error;
  }
};

export const fetchRecentCountryPosts = async () => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("created_at, users(username), country_id(name)")
      .or("country_id.eq.1, country_id.eq.2")
      .order("created_at", { ascending: false })
      .limit(1);
    if (error) throw error;
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchCountryLastPosts = async (name) => {
  try {
    const { data, error } = await supabase
      .from("forumCountry")
      .select("posts(created_at, users(username), state_id(name))")
      .eq("name", name)
      .order("created_at", { ascending: false })
      .limit(1);
    if (error) throw error;
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchCountryByStateName = async (name) => {
  try {
    const { data, error } = await supabase
      .from("forumStates")
      .select("country_id(name)")
      .eq("name", name)
      .maybeSingle();
    if (error) throw error;
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchUserByName = async (username) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select(
        "username, comments(count), created_at, avatar_url, posts(title, content, created_at, img_url,  country_id(name), state_id(name), city_id(name), comments(count), upvotes(count), downvotes(count), page_views(view_count)), locations(*, address(*), products(*), images(*)), about(*,links(*)))"
      )
      .eq("username", username)
      .maybeSingle();
    if (error) throw error;
    return data;
  } catch (error) {
    return error;
  }
};

//files

export const deleteFile = async (filePath) => {
  try {
    const { error } = await supabase.storage.from("avatars").remove(filePath);
    if (error) throw error;

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const uploadFile = async (filePath, file) => {
  try {
    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);

    if (error) throw error;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateUserAvatar = async (avatar_url) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      data: { avatar_url },
    });
    if (error) throw error;

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateUserEmail = async (email) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      email,
    });
    if (error) throw error;
    return true;
  } catch (error) {
    return false;
  }
};

export const updateUserUsername = async (username) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      data: { username: username },
    });
    if (error) throw error;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
