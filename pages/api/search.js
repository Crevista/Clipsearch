export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Missing query parameter" });
  }

  const apiKey = process.env.RAPIDAPI_KEY;

  try {
    const response = await fetch(
      `https://filmot-tube-metadata-archive.p.rapidapi.com/getsearchsubtitles?query=${encodeURIComponent(query)}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "filmot-tube-metadata-archive.p.rapidapi.com",
        },
      }
    );

    const data = await response.json();

    // DEBUGGING: Log the raw API result
    console.log("Filmot API result:", data);

    if (!data || !Array.isArray(data.results)) {
      return res.status(500).json({ error: "Unexpected API response" });
    }

    res.status(200).json(data.results);
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
