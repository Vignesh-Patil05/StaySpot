import * as React from "react";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Paper,
  Box,
  Typography
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  });

  const handleSignup = async () => {
    // reate auth user (email + password)
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password
    });

    if (error) {
      alert(error.message);
      return;
    }

    // Insert profile (RLS: auth.uid() === user_id)
    const { error: profileError } = await supabase
      .from("profiles")
      .upsert({
        user_id: data.user.id,
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email
      });

    if (profileError) {
      alert(profileError.message);
      return;
    }

    // Redirect to signin
    navigate("/signin");
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
        elevation={16}
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
            Create Account
          </Typography>

          <Box sx={{ mt: 2, width: "100%" }}>
            {/* First Name */}
            <TextField
              fullWidth
              required
              margin="normal"
              label="First Name"
              InputLabelProps={{ style: { color: "#aaa" } }}
              onChange={(e) =>
                setForm({ ...form, first_name: e.target.value })
              }
            />

            {/* Last Name */}
            <TextField
              fullWidth
              required
              margin="normal"
              label="Last Name"
              InputLabelProps={{ style: { color: "#aaa" } }}
              onChange={(e) =>
                setForm({ ...form, last_name: e.target.value })
              }
            />

            {/* Email */}
            <TextField
              fullWidth
              required
              margin="normal"
              label="Email Address"
              type="email"
              InputLabelProps={{ style: { color: "#aaa" } }}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            {/* Password */}
            <TextField
              fullWidth
              required
              margin="normal"
              label="Password"
              type="password"
              InputLabelProps={{ style: { color: "#aaa" } }}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            {/* Sign Up */}
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "#E53888",
                "&:hover": { bgcolor: "#AC1754" }
              }}
              onClick={handleSignup}
            >
              Sign Up
            </Button>

            <Typography variant="body2" align="center" color="#aaa">
              Already have an account?{" "}
              <Link component={RouterLink} to="/signin">
                Sign In
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
