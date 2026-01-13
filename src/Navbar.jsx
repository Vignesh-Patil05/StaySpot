import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Chip
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "./pages/RoleContext";

export default function Navbar({ user, profile, onLogout }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { role, switchRole } = useRole();

  const isLoggedIn = Boolean(user);
  const isOwner = role === "owner";

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#0b0b0b" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{ color: "primary.main", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Romify
        </Typography>

        <Box display="flex" alignItems="center" gap={1}>
          {/* Role badge */}
          {isLoggedIn && (
            <Chip
              label={isOwner ? "Owner" : "User"}
              size="small"
              color={isOwner ? "success" : "info"}
            />
          )}

          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Avatar sx={{ bgcolor: "primary.main" }}>
              {profile?.first_name?.[0] ?? "?"}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {isLoggedIn ? (
              <>
                <MenuItem disabled>
                  Hi, {profile?.first_name}
                </MenuItem>

                {/* Role toggle */}
                {isOwner ? (
                  <MenuItem
                    onClick={() => {
                      switchRole("user");
                      setAnchorEl(null);
                    }}
                  >
                    Switch to User
                  </MenuItem>
                ) : (
                  <MenuItem
                    onClick={() => {
                      switchRole("owner");
                      setAnchorEl(null);
                    }}
                  >
                    Switch to Owner
                  </MenuItem>
                )}

                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    onLogout();
                  }}
                >
                  Logout
                </MenuItem>
              </>
            ) : (
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  navigate("/signin");
                }}
              >
                Sign In
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
