import React from "react";
import { Box, Typography, Button } from "@mui/material";
import TopHeadlinesSidebar from "./TopHeadlinesSidebar";

const Sidebar = ({ allArticles }) => {
  return (
    <Box>
      {/* <Typography variant="h5" gutterBottom>
        Sidebar
      </Typography>

      <Typography variant="body2" paragraph>
        Add widgets, filters, or other interactive content here.
      </Typography>

      <Button variant="contained" color="primary">
        Example Button
      </Button> */}
      <TopHeadlinesSidebar allArticles={allArticles} />
    </Box>
  );
};

export default Sidebar;
