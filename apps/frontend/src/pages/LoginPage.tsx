import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { Security } from "@mui/icons-material";
import { useAuthStore } from "state";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const success = await login(username, password);
    setLoading(false);

    if (success) {
      navigate("/");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Security sx={{ fontSize: 40, color: "primary.main" }} />
            <Typography variant="h4" component="h1">
              CyberSmart Login
            </Typography>
          </Box>

          <Typography variant="body1" color="text.secondary" align="center">
            Please enter your credentials to access the platform.
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              required
              autoComplete="username"
              data-testid="login-username"
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              autoComplete="current-password"
              data-testid="login-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
              data-testid="login-submit"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Box>

          <Typography variant="body2" color="text.secondary">
            Demo credentials: admin / password
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
