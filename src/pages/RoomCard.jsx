import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Chip
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Tooltip from "@mui/material/Tooltip";

export default function RoomCard({
  title,
  price,
  bedrooms,
  bathrooms,
  sqft,
  location,
  image,
  canEdit,
  canDelete,
  onEdit,
  onDelete,
  onView,
  activeRole,
  onOwnerClick,
  user
}) {
  const coverImage =
    typeof image === "string" && image.length > 0
      ? image
      : "/placeholder.jpg";


  return (
    <Card
      sx={{
        bgcolor: "#0f0f0f",
        color: "white",
        borderRadius: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 0 20px rgba(0,0,0,0.6)"
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          position: "relative",
          height: 220,              // FIXED HEIGHT
          overflow: "hidden"
        }}
      >
        <CardMedia
          component="img"
          image={coverImage}
          alt={title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover"      // CROPPING
          }}
        />

        {/*Edit icon*/}
        {canEdit && activeRole === "owner" && (
          <Tooltip title="Edit Room Detail(s)" placement="top">
            <Chip
              icon={<EditIcon />}
              label="Edit"
              size="small"
              clickable
              onClick={onEdit}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                bgcolor: "primary.main",
                color: "#fff"
              }}
            />
          </Tooltip>
        )}

        {/*Delete icon*/}
        {canDelete && activeRole === "owner" && (
          <Tooltip title="Edit Room Detail(s)" placement="top">
            <Chip
              icon={<DeleteIcon />}
              label="Delete"
              size="small"
              clickable
              onClick={onDelete}
              sx={{
                position: "absolute",
                top: 10,
                left: 10,
                bgcolor: "primary.main",
                color: "#fff"
              }}
            />
          </Tooltip>
        )}
      </Box>


      {/* Content */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" color="primary.light" noWrap>
          {title}
        </Typography>

        <Typography variant="h6" color="warning.main">
          ₹ {price}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {bedrooms} Beds • {bathrooms} Baths • {sqft} sqft
        </Typography>


        <Box display="flex" alignItems="center" gap={0.5} mt={1}>
          <LocationOnIcon fontSize="small" color="error" />
          <Typography variant="body2" color="text.secondary" noWrap>
            {location}
          </Typography>
        </Box>
      </CardContent>

      {/* Actions */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          gap: 1,
          flexDirection: { xs: "column", sm: "row" }
        }}
      >
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={onView}
        >
          View Details
        </Button>

        <Button fullWidth variant="contained" color="secondary" onClick={onOwnerClick}>
          Owner Details
        </Button>
      </Box>
    </Card>
  );
}
