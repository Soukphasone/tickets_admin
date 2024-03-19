import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Link,
  Paper,
  ThemeProvider,
  CircularProgress, // Import CircularProgress for spinner
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { createTheme } from "@mui/material/styles";
import axios from "axios";

const theme = createTheme({
  typography: {
    fontFamily: ["Noto Sans Lao", "Arial", "sans-serif"].join(","),
  },
});

const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const [errorMessages, setErrorMessages] = useState({});
  const [loading, setLoading] = useState(false); // New state for loading

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const errors = {
    username_pass: "ຊື່ ຫຼື ລະຫັດ ບໍ່ຖືກຕ້ອງ",
    noUsername: "ກະລຸນາ ປ້ອນຊື່ຜູ້ໃຊ້",
    noPassword: "ກະລຸນາ ປ້ອນລະຫັດຜ່ານ",
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!data.username || !data.password) {
      setErrorMessages({
        name: "incorrect user or password",
        message: errors.noUsername,
      });
      return;
    }

    setLoading(true); // Set loading state to true during login request

    try {
      const url = "https://soukphasone.onrender.com/login";
      const response = await axios.post(url, data);
      const { token, accessToken, _id } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("token3", _id);
      localStorage.setItem("token1", accessToken);

      window.location = "/";
    } catch (error) {
      setErrorMessages({
        name: "username_pass",
        message: errors.username_pass,
      });

      console.error("Error:", error);
    } finally {
      setLoading(false); // Reset loading state after login request completes
    }
  };

  const renderErrorMsg = (name) =>
    name === errorMessages.name && (
      <Typography color="error" variant="body2" gutterBottom>
        {errorMessages.message}
      </Typography>
    );

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" className="vh-100">
        <Paper
          sx={{
            padding: 3,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" className="title">
            ລ໋ອກອິນ
          </Typography>
          <Typography component="h2" variant="h6" className="subtitle">
            ລະບົບຈັດການເກັບປີ້ລົດ
          </Typography>
          <form onSubmit={handleLogin} style={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="username"
                  label="ຊື່"
                  name="username"
                  autoComplete="username"
                  value={data.username}
                  onChange={handleChange}
                />
                {renderErrorMsg("noUsername")}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="password"
                  label="ລະຫັດ"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={data.password}
                  onChange={handleChange}
                />
                {renderErrorMsg("username_pass")}
                {renderErrorMsg("noPassword")}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="login_button"
              sx={{ mt: 3 }}
              disabled={loading} // Disable the button when loading
              startIcon={loading && <CircularProgress size={20} />} // Show spinner when loading
            >
              {loading ? "" : "ເຂົ້າສຸ່ລະບົບ"}
            </Button>
          </form>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2" className="small">
                ລືມລະຫັດ?
              </Link>
            </Grid>
          </Grid>
          <div className="icons">
            <GoogleIcon className="icon" />
            <FacebookIcon className="icon" />
            <TwitterIcon className="icon" />
          </div>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
