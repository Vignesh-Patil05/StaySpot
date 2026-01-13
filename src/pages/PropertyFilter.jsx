import {
  Box,
  Typography,
  Chip,
  Button,
  Popover,
  Stack
} from "@mui/material";
import { useState } from "react";

const PROPERTY_TYPES = [
  "1BHK",
  "2BHK",
  "3BHK",
  "2Beds",
  "3Beds"
];

export default function PropertyTypeFilter({ value = [], onChange }) {
  const [anchorEl, setAnchorEl] = useState(null);
  
  const open = Boolean(anchorEl);

  const toggleSelection = (type) => {
    const updated = 
      value.includes(type)
        ? value.filter((t) => t !== type)
        : [...value, type];
    onChange(updated);
  };

  return (
    <>
      {/* Trigger Button */}
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
        Property Type
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
            Property Type
          </Typography>

          <Stack direction="row" flexWrap="wrap" gap={1}>
            {PROPERTY_TYPES.map((type) => (
              <Chip
                key={type}
                label={type}
                clickable
                onClick={() => toggleSelection(type)}
                color={value.includes(type) ? "primary" : "default"}
                variant={value.includes(type) ? "filled" : "outlined"}
                sx={{
                  borderRadius: 2,
                  fontWeight: 500
                }}
              />
            ))}
          </Stack>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 3
            }}
          >
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
