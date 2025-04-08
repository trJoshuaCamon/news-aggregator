import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

export default function NewsSidebar({ allArticles }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCardClick = (category, articleID) => {
    navigate(`/article/${category}/${articleID}`, {
      replace: true,
    });
  };

  useEffect(() => {
    if (allArticles && allArticles.topHeadlines) {
      setNews(allArticles.topHeadlines.slice(6, 11));
      setLoading(false);
    }
  }, [allArticles]);

  return (
    <Paper
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          p: 2,
          backgroundColor: theme.palette.mode === "dark" ? "#333" : "#f8f9fa",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography
          variant="h6"
          component="h1"
          sx={{
            fontWeight: "bold",
            letterSpacing: "0.5px",
            color: theme.palette.text.primary,
          }}
        >
          TOP HEADLINES
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <Typography sx={{ color: theme.palette.text.secondary }}>
            Loading headlines...
          </Typography>
        </Box>
      ) : (
        <List sx={{ p: 0 }}>
          {news.map((article, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() =>
                  handleCardClick(article.category, article.articleID)
                }
                sx={{
                  py: 2,
                  px: 3,
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "medium",
                        fontSize: "0.95rem",
                        color: theme.palette.text.primary,
                        mb: 0.5,
                      }}
                    >
                      {article.title}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontSize: "0.75rem",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>{article.author}</span>
                        <span>
                          {format(
                            new Date(article.publishedAt),
                            "MMMM dd, yyyy • h:mm a"
                          )}
                        </span>
                      </Box>
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
}
