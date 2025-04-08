import React, { useRef } from "react";
import {
  Box,
  Stack,
  CircularProgress,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import NewsCardVertical from "./NewsCardVertical";

const NewsCarousel = ({ label, passedArticles }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  // Reference to the Box containing the articles
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      // Scroll the container to the left by a certain amount
      scrollContainerRef.current.scrollBy({
        left: -700, // Adjust this value to control the scroll distance
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      // Scroll the container to the right by a certain amount
      scrollContainerRef.current.scrollBy({
        left: 700, // Adjust this value to control the scroll distance
        behavior: "smooth",
      });
    }
  };

  return (
    <Box sx={{ width: "100%", position: "relative", marginBlock: "50px" }}>
      <Typography variant="h4" sx={{ marginBlock: "20px" }}>
        {label}
      </Typography>

      {passedArticles.length > 0 ? (
        <Box sx={{ position: "relative" }}>
          {/* Left scroll button */}
          <IconButton
            onClick={scrollLeft}
            sx={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              color: isDarkMode ? "#ffffff" : "#000000",
              backgroundColor: isDarkMode
                ? "rgba(255, 255, 255, 0.4)"
                : "rgba(0, 0, 0, 0.2)",
              borderRadius: "50%",
              padding: "10px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
              "&:hover": {
                backgroundColor: isDarkMode
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)", // Stronger hover effect
                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            <ArrowBack />
          </IconButton>
          {/* Scrollable container */}
          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              width: "100%",
              alignItems: "center",
              paddingBottom: "30px",
              scrollbarWidth: "none", // For Firefox
              "&::-webkit-scrollbar": {
                display: "none", // For Chrome, Safari, Edge
              },
            }}
            ref={scrollContainerRef}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{
                display: "flex",
                flexWrap: "nowrap",
                width: "max-content",
              }}
            >
              {passedArticles.map((article, index) => (
                <NewsCardVertical key={index} article={article} />
              ))}
            </Stack>
          </Box>

          {/* Right scroll button */}
          <IconButton
            onClick={scrollRight}
            sx={{
              position: "absolute",
              right: 10, // Add margin to place the button inside the container
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2, // Ensure it's above other elements
              color: isDarkMode ? "#ffffff" : "#000000",
              backgroundColor: isDarkMode
                ? "rgba(255, 255, 255, 0.4)"
                : "rgba(0, 0, 0, 0.2)",
              borderRadius: "50%",
              padding: "10px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
              "&:hover": {
                backgroundColor: isDarkMode
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)", // Stronger hover effect
                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            <ArrowForward />
          </IconButton>
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default NewsCarousel;
