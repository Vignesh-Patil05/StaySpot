import {
  Box,
  TextField,
  Slider,
  Chip,
  Button,
  InputAdornment,
  Typography,
  Popover
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TenantFilter from "./TenantFilter";
import PropertyFilter from "./PropertyFilter";
import StatusFilter from "./StatusFilter";
import BudgetFilter from "./BudgetFilter";
import { useState, useEffect } from "react";

export default function FilterBar({ filters, setFilters, maxRent, locationInput, setLocationInput }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [tempPriceRange, setTempPriceRange] = useState([0, maxRent]);
  const [tempTenant, setTempTenant] = useState(filters.tenant);
  const [tempPropertyTypes, setTempPropertyTypes] = useState(
    filters.propertyTypes || []
  );
  const [tempStatus, setTempStatus] = useState(filters.status);

  useEffect(() => {
    if (maxRent) {
      setTempPriceRange([
        filters.minPrice ?? 0,
        filters.maxPrice ?? maxRent
      ]);
      setTempTenant(filters.tenant);
      setTempPropertyTypes(filters.propertyTypes || []);
      setTempStatus(filters.status);
    }
  }, [filters, maxRent]);

  {/* Reset Filters */ }
  const handleFilterRest = () => {
    setFilters({
      location: "",
      minPrice: 0,
      maxPrice: maxRent,
      tenant: null,
      propertyTypes: [],
      status: null
    });

    setTempPriceRange([0, maxRent]);
    setTempTenant(null);
    setTempPropertyTypes([]);
    setTempStatus(null);

    setLocationInput("");

    setAnchorEl(null);
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "auto 1fr 1fr 1fr auto auto auto"
        },
        gap: 2,
        alignItems: "center",
        bgcolor: "#121212",
        p: 2,
        borderRadius: 3,
        boxShadow: "0 8px 30px rgba(0,0,0,0.6)"
      }}
    >

      {/* Location Search */}
      <TextField
        placeholder="Search location"
        value={locationInput}
        onChange={(e) => setLocationInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setFilters((prev) => ({
              ...prev,
              location: locationInput
            }));
          }
        }}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#888" }} />
            </InputAdornment>
          )
        }}
        sx={{
          bgcolor: "#0f0f0f",
          borderRadius: 2,
          input: { color: "#fff" }
        }}
      />
      
      {/*Budget Filter*/}
      <BudgetFilter
        value={tempPriceRange}
        maxRent={maxRent}
        onChange={(priceRange) => setTempPriceRange(priceRange)}
      />
      
      {/* Tenant Pill */}
      <TenantFilter
        value={tempTenant}
        onChange={(tenant) => setTempTenant(tenant)}
      />

      {/* Property Type Pill */}
      <PropertyFilter
        value={tempPropertyTypes}
        onChange={setTempPropertyTypes}
      />

      {/* Status Pill */}
      <StatusFilter
        value={tempStatus}
        onChange={(status) => setTempStatus(status)}
      />

      {/* Global Done Button */}
      <Button
        variant="contained"
        sx={{
          height: 44,
          px: 4,
          fontWeight: 600,
          whiteSpace: "nowrap"
        }}
        onClick={() => {
          setFilters((prev) => ({
            ...prev,
            minPrice: tempPriceRange[0],
            maxPrice: tempPriceRange[1],
            tenant: tempTenant,
            propertyTypes: tempPropertyTypes,
            status: tempStatus
          }));

          setAnchorEl(null); // close budget popover if open
        }}
      >
        Done
      </Button>

      {/*Global Reset Button*/}
      <Button
        variant="outlined"
        color="secondary"
        sx={{
          height: 44,
          px: 3,
          whiteSpace: "nowrap"
        }}
        onClick={handleFilterRest}
      >
        Reset
      </Button>

    </Box>
  );
}
