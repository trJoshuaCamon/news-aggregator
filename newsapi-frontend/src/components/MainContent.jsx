import React, { useState, useEffect } from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import NewsCardHorizontal from "./NewsCardHorizontal";
import NewsCardVertical from "./NewsCardVertical";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import NewsCarousel from "./NewsCarousel";
import FullPageLoading from "./FullPageLoading";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import CloseIcon from "@mui/icons-material/Close"; // import CloseIcon

const stackProps = {
  direction: { xs: "column", md: "row" },
  spacing: 0,
  sx: { marginBottom: { xs: "15px", md: "20px", lg: "30px" } },
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
};

const MainContent = ({ allArticles }) => {
  // for search results
  const location = useLocation();
  const navigate = useNavigate();
  const { results, query } = location.state || {};

  const [visibleCount, setVisibleCount] = useState(3);

  const firstTopHeadline_article = allArticles.topHeadlines[0];
  const fourTopHeadline_articles = allArticles.topHeadlines.slice(1, 5);

  useEffect(() => {
    if (results && results.length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [results]);

  return (
    <Box id="MainContent">
      {results && results.length === 0 && (
        <>
          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center" }}
          >
            No results found for "{query}"
            <CloseIcon
              onClick={() => navigate("/")}
              sx={{ marginLeft: 1, color: "gray", cursor: "pointer" }}
            />
          </Typography>
        </>
      )}

      {results && results.length > 0 && (
        <Box id="SearchResults">
          <BackButton path="/" />
          <Typography variant="h6" gutterBottom>
            Search results for "{query}" ({results.length} results found)
          </Typography>
          <Stack {...stackProps}>
            {results.slice(0, visibleCount).map((article, index) => (
              <NewsCardVertical key={index} article={article} />
            ))}
          </Stack>

          {/* Only show the View More button if there are more results left to display */}
          {visibleCount < results.length && (
            <Box display="flex" justifyContent="center">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setVisibleCount((prev) => prev + 3)}
                sx={{ marginY: "20px" }}
              >
                View More
              </Button>
            </Box>
          )}

          <Divider />
        </Box>
      )}

      <Box id="News">
        <NewsCardHorizontal article={firstTopHeadline_article} />
      </Box>

      <Stack {...stackProps}>
        {fourTopHeadline_articles.map((article, index) => (
          <NewsCardVertical key={index} article={article} />
        ))}
      </Stack>

      <Divider />
      <Box id="Business">
        <NewsCarousel label="Business" passedArticles={allArticles.business} />
      </Box>
      <Divider />

      <Box id="Entertainment">
        <NewsCarousel
          label="Entertainment"
          passedArticles={allArticles.entertainment}
        />
      </Box>
      <Divider />

      <Box id="General">
        <NewsCarousel label="General" passedArticles={allArticles.general} />
      </Box>
      <Divider />

      <Box id="Health">
        <NewsCarousel label="Health" passedArticles={allArticles.health} />
      </Box>

      <Divider />

      <Box id="Science">
        <NewsCarousel label="Science" passedArticles={allArticles.science} />
      </Box>
      <Divider />

      <Box id="Sports">
        <NewsCarousel label="Sports" passedArticles={allArticles.sports} />
      </Box>
      <Divider />

      <Box id="Technology">
        <NewsCarousel
          label="Technology"
          passedArticles={allArticles.technology}
        />
      </Box>
      <Divider />
    </Box>
  );
};

export default MainContent;
