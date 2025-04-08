import axios from "axios";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const articlePage = await axios.get(url);
    const dom = new JSDOM(articlePage.data, { url });

    const article = new Readability(dom.window.document).parse();

    res.status(200).json({
      title: article.title,
      content: article.textContent,
    });
  } catch (error) {
    console.error("Failed to fetch article:", error.message);
    res.status(500).json({ error: "Failed to fetch full article" });
  }
}
