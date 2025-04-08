import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

const FullPageLoading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <CircularProgress size={60} color="primary" />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Loading...
        </Typography>
      </Box>
    </Box>
  );
};

export default FullPageLoading;
