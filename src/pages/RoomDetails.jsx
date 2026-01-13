import {
  Box,
  IconButton,
  Typography,
  Chip,
  Stack,
  Divider
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useState } from "react";

export default function RoomDetails({ room }) {
  const [index, setIndex] = useState(0);

  const images = room.images?.length
    ? room.images
    : ["/placeholder.jpg"];

  const prevImage = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box sx={{ bgcolor: "#0b0b0b", minHeight: "100vh", px: { xs: 2, md: 6 }, py: 4 }}>
      
      {/* IMAGE CAROUSEL */}
      <Box
        sx={{
          position: "relative",
          maxWidth: 1000,
          mx: "auto",
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.7)"
        }}
      >
        <Box
          component="img"
          src={images[index]}
          alt={room.title}
          sx={{
            width: "100%",
            height: { xs: 260, md: 480 },
            objectFit: "cover"
          }}
        />

        {images.length > 1 && (
          <>
            <IconButton
              onClick={prevImage}
              sx={{
                position: "absolute",
                top: "50%",
                left: 12,
                transform: "translateY(-50%)",
                bgcolor: "rgba(0,0,0,0.45)",
                color: "#fff"
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>

            <IconButton
              onClick={nextImage}
              sx={{
                position: "absolute",
                top: "50%",
                right: 12,
                transform: "translateY(-50%)",
                bgcolor: "rgba(0,0,0,0.45)",
                color: "#fff"
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </>
        )}
      </Box>

      {/* DETAILS */}
      <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4 }}>
        <Stack spacing={2}>
          
          {/* TITLE */}
          <Typography variant="h4" color="primary">
            {room.title}
          </Typography>

          {/* LOCATION */}
          <Stack direction="row" spacing={1} alignItems="center">
            <LocationOnIcon color="error" />
            <Typography color="text.secondary">
              {room.location}
            </Typography>
          </Stack>

          {/* PRICE */}
          <Typography variant="h5" sx={{ color: "#facc15", fontWeight: 600 }}>
            ₹ {room.rent_price} / month
          </Typography>

          {/* QUICK INFO */}
          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Chip label={room.property_type} color="info" />
            <Chip label={`${room.area} sqft`} />
            <Chip label={room.tenant_preference} />
            <Chip
              label={room.status}
              color={room.status === "available" ? "success" : "error"}
            />
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* DESCRIPTION */}
          <Typography variant="h6">Description</Typography>
          <Typography color="text.secondary">
            {room.description || "No description provided."}
          </Typography>

        </Stack>
      </Box>
    </Box>
  );
}
