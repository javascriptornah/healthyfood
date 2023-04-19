export default async (req, res) => {
  let address = req.body;
  if (req.method === "POST") {
    let response = await fetch(
      `https://us1.locationiq.com/v1/search?key=${process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY}&q=${address}&format=json`,
      {
        method: "GET",
      }
    );
    let jsonData = await response.json();
    return res.status(200).json({
      addresses: jsonData,
    });
  }
  return res.status(400).json({
    message: "Unsupported Request",
  });
};
