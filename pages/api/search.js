export default async function handler(req, res) { const query = req.query.q;

if (!query) { return res.status(400).json({ error: "Missing query parameter 'q'" }); }

try { const response = await fetch( https://filmot-tube-metadata-archive.p.rapidapi.com/getsearchsubtitles?query=${encodeURIComponent( query )}&searchManualSubs=1, { method: "GET", headers: { "X-RapidAPI-Key": process.env.RAPIDAPI_KEY, "X-RapidAPI-Host": "filmot-tube-metadata-archive.p.rapidapi.com", }, } );

if (!response.ok) {
  throw new Error(`API response error: ${response.status}`);
}

const data = await response.json();
res.status(200).json(data);

} catch (error) { console.error("API request failed:", error); res.status(500).json({ error: "Internal Server Error" }); } }

