import supabase from "../../../utils/supabaseClient";

export default async (req, res) => {
  if (req.method === "POST") {
    // Call our stored procedure with the page_slug set by the request params slug
    try {
      const { data, error } = await supabase.rpc("increment_post_view", {
        page_id: 32,
      });
      if (error) throw data;
      return res.status(200).json({
        message: `Successfully incremented post: ${req.query.id}`,
      });
    } catch (data) {
      return res.status(200).json({ error: data });
    }
  }

  if (req.method === "GET") {
    // Query the pages table in the database where slug equals the request params slug.
    const { data } = await supabase
      .from("page_views")
      .select("view_count")
      .filter("id", "eq", req.query.id);

    if (data) {
      return res.status(200).json({
        total: data[0]?.view_count || null,
      });
    }
  }

  return res.status(400).json({
    message: "Unsupported Request",
  });
};
