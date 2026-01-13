import {
  Box,
  Typography,
  Chip,
  Button,
  Popover,
  Stack
} from "@mui/material";
import { useState } from "react";

const TENANT_TYPES = [
  "Bachelor",
  "Family",
  "Girls",
  "Working"
];

export default function TenantTypeFilter({ value, onChange }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleToggle = (type) => {
    if(value === type) {
      onChange(null);
    } else {
      onChange(type);
    }
  };

  return (
    <>
      {/* Trigger */}
      <Button
        variant="outlined"
        color="primary"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          borderRadius: 3,
          px: 3,
          textTransform: "none"
        }}
      >
        Tenant Type{value ? `: ${value}` : ""}
      </Button>

      {/* Popover */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Box sx={{ p: 3, width: 320 }}>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>
            Tenant Type
          </Typography>

          <Stack direction="row" flexWrap="wrap" gap={1}>
            {TENANT_TYPES.map((type) => (
              <Chip
                key={type}
                label={type}
                clickable
                onClick={() => handleToggle(type)}
                color={value === type ? "primary" : "default"}
                variant={value === type ? "filled" : "outlined"}
                sx={{
                  borderRadius: 2,
                  fontWeight: 500
                }}
              />
            ))}
          </Stack>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setAnchorEl(null)}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
}
