import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function NewsCardHorizontal({ article }) {
  const {
    title = "No Title",
    description = "No Description",
    urlToImage = null, // Allowing it to be null initially
    url = "#",
    articleID,
    category,
  } = article;
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate(); // Initialize useNavigate

  const img_placeholder =
    "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=170667a&w=0&k=20&c=Q7gLG-xfScdlTlPGFohllqpNqpxsU1jy8feD_fob87U=";

  // Set a fallback image URL if urlToImage is invalid or null
  const [imgSrc, setImgSrc] = React.useState(urlToImage || img_placeholder);
  const [isHovered, setIsHovered] = React.useState(false); // Track hover state

  // Handle image error (CORS or other issues)
  const handleImageError = (event) => {
    // Check if the error was due to a CORS issue (by checking the event)
    if (event.target.naturalWidth === 0) {
      // The image failed to load (likely due to CORS), so use fallback image
      setImgSrc(img_placeholder);
    }
  };

  // Navigate function when the card is clicked
  const handleCardClick = () => {
    navigate(`/article/${category}/${articleID}`, {
      state: { article },
      replace: true,
    });
  };

  React.useEffect(() => {
    if (!urlToImage) {
      setImgSrc(img_placeholder);
    } else {
      setImgSrc(urlToImage);
    }
  }, [urlToImage]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
        marginBlock: "40px",
      }}
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
        style={{
          textDecoration: "none",
          display: "block",
          width: "100%",
          maxWidth: "1220px",
          cursor: "pointer",
        }}
      >
        <Card
          style={{
            width: "100%",
            maxWidth: "1220px",
            display: "grid",
            gridTemplateColumns: isMediumScreen ? "1fr" : "1fr 1fr",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "16px",
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              overflow: "hidden", // Prevents the image from exceeding the container when scaled
            }}
          >
            <CardMedia
              component="img"
              image={imgSrc}
              alt={title}
              style={{
                height: isMediumScreen ? "300px" : "100%",
                objectFit: "cover",
                transition: "transform 0.3s ease-in-out",
                transform: isHovered ? "scale(1.1)" : "scale(1)",
              }}
              onError={handleImageError} // Handle image load error
              crossOrigin="anonymous"
            />
          </div>
          <CardContent style={{ padding: "24px" }}>
            <Typography
              variant="h4"
              style={{
                color:
                  theme.palette.mode === "dark"
                    ? "#ffffff"
                    : theme.palette.primary.main,
                marginBottom: "16px",
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body1"
              style={{
                color: theme.palette.mode === "dark" ? "#ffffff" : "#374151",
                marginBottom: "16px",
              }}
            >
              {description}
            </Typography>
            <Button
              color="primary"
              style={{ textTransform: "none" }}
              component="a"
              href={url}
              target="_blank"
            >
              Read More »
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default NewsCardHorizontal;
