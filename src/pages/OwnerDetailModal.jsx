import { Modal, Box, Typography, Button, Stack } from "@mui/material";

export default function OwnerDetailModal({ open, onClose, owner }) {
  if (!owner) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: 500,
          width: "100%",
          bgcolor: "background.paper",
          borderRadius: 3,
          p: 4
        }}
      >
        <Typography variant="h5" color="primary" mb={3}>
          Owner Details
        </Typography>

        <Stack spacing={1.5}>
          <Typography>
            <strong>First Name:</strong> {owner.first_name}
          </Typography>
          <Typography>
            <strong>Last Name:</strong> {owner.last_name}
          </Typography>
          <Typography>
            <strong>Email:</strong> {owner.email}
          </Typography>

          <Button
            variant="contained"
            onClick={onClose}
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
