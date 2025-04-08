import React from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const BackButton = ({ path }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (path) {
      navigate(path); // Navigate to the provided path
    } else {
      navigate(-1); // Go back to the previous page if no path is provided
    }
  };

  return (
    <Button
      variant="outlined"
      color="primary"
      startIcon={<ArrowBackIcon />}
      onClick={handleBack}
      sx={{ marginBottom: "20px" }}
    >
      Back
    </Button>
  );
};

export default BackButton;
