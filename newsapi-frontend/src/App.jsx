import { useState, useEffect, useRef } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, Paper, Typography, Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewPost from "./ViewPost";
import FullPageLoading from "./components/FullPageLoading";

import Navbar from "./components/Navbar";

import "./App.css";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";
import { Category } from "@mui/icons-material";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const PAGE_SIZE = 100;
const COUNTRY = "us";

const COOKIE_NAME = "news_articles";
const COOKIE_EXPIRATION_MINUTES = 10;

export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [themeMode, setThemeMode] = useState(() => {
    const storedTheme = localStorage.getItem("themeMode");
    return storedTheme ? JSON.parse(storedTheme) : prefersDarkMode;
  });

  const hasFetched = useRef(false); // Track whether API call has run
  const [articles, setArticles] = useState({
    topHeadlines: [],
    business: [],
    entertainment: [],
    general: [],
    health: [],
    science: [],
    sports: [],
    technology: [],
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hasFetched.current) return; // Prevents running twice in Strict Mode
    hasFetched.current = true;

    const fetchData = async () => {
      try {
        const storedData = JSON.parse(localStorage.getItem(COOKIE_NAME));
        if (storedData) {
          setArticles(storedData);
          console.log("Data found in localStorage:", storedData);
          setLoading(false);
          return;
        }

        const categoriesToFetch = [
          "topHeadlines",
          "business",
          "entertainment",
          "general",
          "health",
          "science",
          "sports",
          "technology",
        ];

        const fetchCategory = async (category) => {
          const res = await fetch(`${BACKEND_BASE_URL}/news/${category}`);
          if (!res.ok) throw new Error(`Failed to fetch ${category}`);
          const data = await res.json();
          return data.map((article, index) => ({
            ...article,
            articleID: `${index + 1}`,
            category,
          }));
        };

        const results = await Promise.all(
          categoriesToFetch.map((category) => fetchCategory(category))
        );

        const fetchedArticles = categoriesToFetch.reduce(
          (acc, category, index) => {
            acc[category] = results[index];
            return acc;
          },
          {}
        );

        localStorage.setItem(COOKIE_NAME, JSON.stringify(fetchedArticles));
        console.log("Data saved to localStorage:", fetchedArticles);

        setArticles(fetchedArticles);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("themeMode", JSON.stringify(themeMode));
  }, [themeMode]);

  const appTheme = createTheme({
    palette: {
      mode: themeMode ? "dark" : "light",
    },
  });

  function handleThemeMode() {
    setThemeMode(!themeMode);
  }

  const isMdScreen = useMediaQuery("(max-width:960px)");

  if (loading) {
    return <FullPageLoading />; // Uniform loading state
  }

  if (error) {
    return <Typography variant="h6">Error: {error}</Typography>; // More friendly error display
  }

  {
    console.log(articles);
  }

  const allArticles = {
    topHeadlines: articles.topHeadlines,
    business: articles.business,
    entertainment: articles.entertainment,
    general: articles.general,
    health: articles.health,
    science: articles.science,
    sports: articles.sports,
    technology: articles.technology,
  };

  return (
    <Router>
      <ThemeProvider theme={appTheme}>
        <Paper
          elevation={0}
          square
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh", // Removed fixed height
          }}
        >
          <Navbar themeMode={themeMode} handleThemeMode={handleThemeMode} />

          <Box
            sx={{
              display: "flex",
              flexDirection: isMdScreen ? "column-reverse" : "row",
              flex: 1,
            }}
          >
            {/* Main Content */}
            <Box
              sx={{
                flex: isMdScreen ? 1 : 4,
                overflowY: "auto",
                padding: "20px",
                bgcolor: "background.default",
              }}
            >
              <Routes>
                <Route
                  path="/"
                  element={<MainContent allArticles={allArticles} />}
                />
                <Route path="/article/:category/:id" element={<ViewPost />} />
                <Route
                  path="/article/search/:articleTitleSearch"
                  element={<ViewPost />}
                />

                {/* <Route path="*" element={<MainContent />} /> */}
                {/* <Route path="/new" element={<NewPage />} /> */}
                {/* Add other routes here */}
              </Routes>
            </Box>

            {/* Sidebar */}
            <Box
              sx={{
                flex: 1, // Ensures sidebar takes up full width on medium screens
                minWidth: "300px",
                minHeight: isMdScreen ? "auto" : "100vh", // Prevents shrinking
                overflowY: "auto",
                padding: "20px",
                backgroundColor: themeMode ? "#252525" : "#eeeeee",

                position: isMdScreen ? "static" : "sticky",
                top: "70px",
                height: "100vh",
              }}
            >
              <Sidebar allArticles={allArticles} />
            </Box>
          </Box>
        </Paper>
      </ThemeProvider>
    </Router>
  );
}
