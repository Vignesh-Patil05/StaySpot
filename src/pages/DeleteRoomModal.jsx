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



export default function DeleteRoomModal({ open, onClose, room, onUpdated }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!room) return null;
        setLoading(true);

        try {
            const { error } = await supabase
                .from("rooms")
                .delete()
                .eq("room_id", room.room_id);

            if (error) throw error;

            onUpdated(); // refresh dashboard
            onClose();   // close modal
        } catch (err) {
            console.error(err);
            alert(err.message || "Deletion failed");
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
                    Delete Room
                </Typography>

                <Stack spacing={2}>
                    <Typography variant="body1" color="text.secondary">
                        Are you sure you want to delete this room?
                    </Typography>

                    <Typography variant="body2" color="error">
                        This action cannot be undone.
                    </Typography>

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
                            onClick={handleDelete}
                        >
                            {loading ? "Deleting..." : "Delete"}
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    );
}
