import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
  Stack
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const PROPERTY_TYPES = ["1BHK", "2BHK", "3BHK", "2Beds", "3Beds"];
const TENANT_TYPES = ["Bachelor", "Family", "Girls", "Working"];
const STATUS = ["available", "occupied"];

export default function PostRoom() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const [form, setForm] = useState({
    title: "",
    location: "",
    rent_price: "",
    area: "",
    property_type: "",
    tenant_preference: "",
    status: "available",
    description: ""
  });

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).filter((file) =>
      file.type.startsWith("image/")
    );
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get logged-in user
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) throw new Error("User not logged in");

      // Insert room
      const { data: room, error: roomError } = await supabase
        .from("rooms")
        .insert({
          ...form,
          rent_price: Number(form.rent_price),
          area: Number(form.area),
          owner_id: user.id
        })
        .select()
        .single();

      if (roomError) throw roomError;

      const roomId = room.room_id;

      //  Upload images
      for (const file of images) {
        const ext = file.name.split(".").pop();
        const filePath = `${user.id}/${roomId}/${crypto.randomUUID()}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("room-img")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { error: imgError } = await supabase
          .from("room_images")
          .insert({
            room_id: roomId,
            image_url: filePath
          });

        if (imgError) throw imgError;
      }

      alert("Room posted successfully!");
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0b0b0b",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        p: 4
      }}
    >
      <Paper sx={{ width: "100%", maxWidth: 700, p: 4 }}>
        <Typography variant="h5" color="primary" mb={3}>
          Post a Room
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Title"
              value={form.title}
              onChange={handleChange("title")}
              fullWidth
              required
            />

            <TextField
              label="Location"
              value={form.location}
              onChange={handleChange("location")}
              fullWidth
              required
            />

            <Stack direction="row" spacing={2}>
              <TextField
                label="Rent Price (₹)"
                type="number"
                value={form.rent_price}
                onChange={handleChange("rent_price")}
                fullWidth
                required
              />

              <TextField
                label="Area (sqft)"
                type="number"
                value={form.area}
                onChange={handleChange("area")}
                fullWidth
                required
              />
            </Stack>

            <TextField
              select
              label="Property Type"
              value={form.property_type}
              onChange={handleChange("property_type")}
              fullWidth
              required
            >
              {PROPERTY_TYPES.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Tenant Preference"
              value={form.tenant_preference}
              onChange={handleChange("tenant_preference")}
              fullWidth
              required
            >
              {TENANT_TYPES.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Status"
              value={form.status}
              onChange={handleChange("status")}
              fullWidth
            >
              {STATUS.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Description"
              multiline
              rows={4}
              value={form.description}
              onChange={handleChange("description")}
              fullWidth
            />

            {/* IMAGE UPLOAD */}
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
            >
              Upload Room Images
              <input
                type="file"
                hidden
                multiple
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>

            {images.length > 0 && (
              <Typography color="success.main">
                {images.length} image(s) selected
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? "Posting..." : "Post Room"}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
