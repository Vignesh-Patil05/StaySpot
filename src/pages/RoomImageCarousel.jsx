import { Box } from "@mui/material";
import { useState } from "react";

export default function RoomImageCarousel({ images = [] }) {
  const [index, setIndex] = useState(0);

  if (!images.length) {
    return (
      <Box
        sx={{
          width: "100%",
          aspectRatio: "16 / 9",
          bgcolor: "#1f1f1f"
        }}
      />
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 9",
        overflow: "hidden"
      }}
    >
      <Box
        component="img"
        src={images[index]}
        alt=""
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "0.3s"
        }}
      />

      {/* dots */}
      <Box
        sx={{
          position: "absolute",
          bottom: 10,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 1
        }}
      >
        {images.map((_, i) => (
          <Box
            key={i}
            onClick={() => setIndex(i)}
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: i === index ? "#ec4899" : "#555",
              cursor: "pointer"
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
