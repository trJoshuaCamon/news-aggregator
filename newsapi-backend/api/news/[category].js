import axios from "axios";

export default async function handler(req, res) {
  const { category } = req.query;

  const validCategories = [
    "topHeadlines",
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  if (!validCategories.includes(category)) {
    return res.status(400).json({ error: "Invalid category" });
  }

  try {
    const baseUrl =
      category === "topHeadlines"
        ? `https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apiKey=${process.env.NEWS_API_KEY}`
        : `https://newsapi.org/v2/top-headlines?category=${category}&country=us&pageSize=100&apiKey=${process.env.NEWS_API_KEY}`;

    const response = await axios.get(baseUrl);
    res.status(200).json(response.data.articles);
  } catch (error) {
    console.error("Error fetching category:", error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
