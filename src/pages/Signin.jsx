import * as React from "react";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Paper,
  Box,
  Typography,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useRole } from "./RoleContext";
import { Link as RouterLink } from "react-router-dom";


export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { switchRole } = useRole();

  const handleSignIn = async (role) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert(error.message);
      return;
    }

    // store selected role for this session
    switchRole(role);
    navigate("/");
  };

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f0f0f, #1c1c1c)"
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: 420,
          p: 4,
          borderRadius: 3,
          backgroundColor: "#181818"
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ bgcolor: "#E53888", mb: 1 }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography variant="h5" color="white">
            Sign In
          </Typography>

          <Box component="form" sx={{ mt: 2, width: "100%" }}>
            {/* Email */}
            <TextField
              fullWidth
              required
              margin="normal"
              label="Email Address"
              type="email"
              InputLabelProps={{ style: { color: "#aaa" } }}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password */}
            <TextField
              fullWidth
              required
              margin="normal"
              label="Password"
              type="password"
              InputLabelProps={{ style: { color: "#aaa" } }}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Sign In Buttons */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mt: 2,
                mb: 2
              }}
            >
              <Button
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: "#E53888",
                  color: "#fff",
                  "&:hover": {
                    bgcolor: "#AC1754"
                  }
                }}
                onClick={() => handleSignIn("user")}
              >
                Sign In as User
              </Button>

              <Button
                fullWidth
                variant="outlined"
                sx={{
                  borderColor: "#E53888",
                  color: "#E53888",
                  "&:hover": {
                    borderColor: "#AC1754",
                    backgroundColor: "rgba(229,56,136,0.15)"
                  }
                }}
                onClick={() => handleSignIn("owner")}
              >
                Sign In as Owner
              </Button>
            </Box>

            {/* Footer links */}
            <Typography variant="body2" align="center" color="#aaa">
              Don’t have an account?{" "}
              <Link component={RouterLink} to="/signup" sx={{ color: "#E53888" }}>
                Sign Up
              </Link>
            </Typography>

            <Typography
              variant="caption"
              display="block"
              align="center"
              mt={3}
              color="#666"
            >
              Romify • Find your perfect stay
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
