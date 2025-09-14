import { Typography, Card, Button } from "../design-system/components";
import { Box, CardContent, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
      }}
    >
      <Card sx={{ maxWidth: 500, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h1" color="error" gutterBottom>
            404
          </Typography>
          <Typography variant="h4" gutterBottom>
            Page Not Found
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Sorry, the page you are looking for doesn't exist or has been moved.
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button variant="primary" onClick={() => navigate("/")}>
            Go Home
          </Button>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default NotFoundPage;
