import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem
} from "@mui/material";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const TENANT_TYPES = ["Bachelor", "Family", "Girls", "Working"];
const STATUS = ["available", "occupied"];

export default function EditRoomModal({ open, onClose, room, onUpdated }) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    rent_price: "",
    description: "",
    tenant_preference: "",
    status: "available"
  });

  // Prefill form when modal opens
  useEffect(() => {
    if (room) {
      setForm({
        title: room.title || "",
        rent_price: room.rent_price || "",
        description: room.description || "",
        tenant_preference: room.tenant_preference || "",
        status: room.status || "available"
      });
    }
  }, [room]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleUpdate = async () => {
    setLoading(true);

    try {
      const { error } = await supabase
        .from("rooms")
        .update({
          title: form.title,
          rent_price: Number(form.rent_price),
          description: form.description,
          tenant_preference: form.tenant_preference,
          status: form.status
        })
        .eq("room_id", room.room_id);

      if (error) throw error;

      onUpdated(); // refresh dashboard
      onClose();   // close modal
    } catch (err) {
      console.error(err);
      alert(err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: 520,
          bgcolor: "background.paper",
          borderRadius: 3,
          p: 4
        }}
      >
        <Typography variant="h5" color="primary" mb={3}>
          Edit Room
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Title"
            value={form.title}
            onChange={handleChange("title")}
            fullWidth
          />

          <TextField
            label="Rent Price (₹)"
            type="number"
            value={form.rent_price}
            onChange={handleChange("rent_price")}
            fullWidth
          />

          <TextField
            label="Description"
            multiline
            rows={3}
            value={form.description}
            onChange={handleChange("description")}
            fullWidth
          />

          <TextField
            select
            label="Tenant Preference"
            value={form.tenant_preference}
            onChange={handleChange("tenant_preference")}
            fullWidth
          >
            {TENANT_TYPES.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
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

          <Stack direction="row" spacing={2} mt={2}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              onClick={handleUpdate}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
