import React, { useState, useEffect, useRef } from "react";
import {
  CircularProgress,
  List,
  ListItem,
  Paper,
  Box,
  IconButton,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const API_URL = "https://newsapi.org/v2/everything";

const SearchContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  borderRadius: "100px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  padding: theme.spacing(0.5, 1),
  width: "100%",
  maxWidth: "400px",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  flex: 1,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1),
  },
}));

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false); // State to control visibility of results
  const navigate = useNavigate();

  const resultsRef = useRef(null); // Reference for the results dropdown

  const handleCardClick = (article) => {
    navigate(`/article/search/${article.title}`, {
      state: { article },
      replace: true,
    });
  };

  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_URL}?q=${encodeURIComponent(query)}&apiKey=${API_KEY}`
        );
        const data = await response.json();
        setResults(data.articles || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
      setLoading(false);
    };

    const debounceFetch = setTimeout(fetchData, 500);
    return () => clearTimeout(debounceFetch);
  }, [query]);

  // Hide the results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        setShowResults(false); // Hide results when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Show results when there are search results
  useEffect(() => {
    if (results.length > 0 && query.length > 2) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [results, query]);

  return (
    <Box sx={{ width: { xs: "200px", sm: "250px", md: "300px", lg: "400px" } }}>
      <SearchContainer>
        <StyledInputBase
          placeholder="Search News..."
          inputProps={{ "aria-label": "search" }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Box sx={{ width: "40px", display: "flex", justifyContent: "center" }}>
          {loading ? (
            <CircularProgress color="inherit" size={20} />
          ) : (
            <IconButton
              onClick={() =>
                navigate("/", {
                  state: { results, query },
                  replace: true,
                })
              }
              sx={{ color: "white" }}
              disabled={loading} // Disable if loading or no results
            >
              <SearchIcon />
            </IconButton>
          )}
        </Box>
      </SearchContainer>

      {loading && (
        <CircularProgress
          size={20}
          style={{ position: "absolute", top: "10px", right: "10px" }}
        />
      )}

      {showResults && results.length > 0 && (
        <Paper
          ref={resultsRef}
          style={{
            position: "absolute",
            width: "50%",
            maxHeight: "350px",
            overflowY: "auto",
            marginTop: "5px",
            zIndex: 3,
          }}
        >
          <List>
            {results.map((article, index) => (
              <ListItem
                sx={{ cursor: "pointer" }}
                key={index}
                onClick={() => handleCardClick(article)}
              >
                {article.title}
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}
