import {
  Box,
  Typography,
  Slider,
  Button,
  Popover
} from "@mui/material";
import { useState, useEffect } from "react";

export default function BudgetFilter({ value, maxRent, onChange }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [tempPriceRange, setTempPriceRange] = useState([0, maxRent]);

  const open = Boolean(anchorEl);

  // Sync temp state when parent value changes
  useEffect(() => {
    if (!maxRent) return;

    setTempPriceRange([
      value?.[0] ?? 0,
      value?.[1] ?? maxRent
    ]);
  }, [value, maxRent]);

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
          textTransform: "none",
          whiteSpace: "nowrap"
        }}
      >
        Budget
      </Button>

      {/* Popover */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        PaperProps={{
          sx: {
            mt: 1,
            width: { xs: 280, sm: 360 },
            borderRadius: 3,
            p: 3
          }
        }}
      >
        <Typography variant="subtitle2" mb={2}>
          Price Range
        </Typography>

        <Slider
          value={tempPriceRange}
          min={0}
          max={maxRent}
          step={1000}
          onChange={(_, val) => setTempPriceRange(val)}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `₹${v}`}
          sx={{
            px: 0.01,
            color: "#ec4899",
            mb: 2
          }}
        />

        {/* Local apply (updates temp in parent, not DB) */}
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            onChange(tempPriceRange); // pass range up
            setAnchorEl(null);
          }}
        >
          Close
        </Button>
      </Popover>
    </>
  );
}
