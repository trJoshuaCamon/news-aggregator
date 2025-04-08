import React, { useState, useEffect } from "react";
import { Typography, Box, ThemeProvider, createTheme } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const DateTimeDisplay = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const globalTheme = useTheme(); // Access global theme mode

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDateTime = (date) => {
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // 👉 Separate theme for DateTimeDisplay
  const dateTimeTheme = createTheme({
    palette: {
      mode: globalTheme.palette.mode,
      ...(globalTheme.palette.mode === "dark"
        ? {
            primary: {
              main: "#90caf9", // Light blue in dark mode
            },
            background: {
              paper: "#272727", // Dark grey background
            },
            text: {
              primary: "#ffffff", // White text
            },
          }
        : {
            primary: {
              main: "#1976d2", // Deep blue in light mode
            },
            background: {
              paper: "#1A76D2", // Light grey background
            },
            text: {
              primary: "#ffffff", // Black text
            },
          }),
    },
  });

  return (
    <ThemeProvider theme={dateTimeTheme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "12px 24px",
          borderRadius: "16px",
          color: dateTimeTheme.palette.text.primary,
          backgroundColor: dateTimeTheme.palette.background.paper,
          // boxShadow: 3,
          // transition: "all 0.3s ease",
        }}
      >
        <Typography variant="body1" noWrap>
          {formatDateTime(dateTime)}
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default DateTimeDisplay;
