import { Box, Fab, Typography, Button, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

import FilterBar from "./filterBar";
import RoomCard from "./RoomCard";
import EditRoomModal from "./EditRoomModal";
import DeleteRoomModal from "./DeleteRoomModal";
import OwnerDetailModal from "./OwnerDetailModal";
import { useRole } from "./RoleContext";


export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useOutletContext();
  const { role } = useRole();
  const isOwner = role === "owner";

  const [maxPrice, setMaxPrice] = useState(0);
  const [locationInput, setLocationInput] = useState("");
  const [rooms, setRooms] = useState([]);
  const [userId, setUserId] = useState(null);
  const [editRoom, setEditRoom] = useState(null);
  const [deleteRoom, setDeleteRoom] = useState(null);
  const [selectedOwner, setSelectedOwner] = useState(null);

  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    tenant: null,
    propertyTypes: [],
    status: ""
  });

  const [loading, setLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  // Get logged-in user ID
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserId(data?.user?.id || null);
    };
    getUser();
  }, []);

  // Fetch max rent for filter
  useEffect(() => {
    const fetchMaxPrice = async () => {
      const { data } = await supabase
        .from("rooms")
        .select("rent_price")
        .order("rent_price", { ascending: false })
        .limit(1)
        .single();

      if (data) {
        setMaxPrice(data.rent_price);
        setFilters((prev) => ({
          ...prev,
          minPrice: 0,
          maxPrice: data.rent_price
        }));
      }
    };
    fetchMaxPrice();
  }, []);

  // Reset modals on logout
  useEffect(() => {
    if (!user) {
      setUserId(null);
      setEditRoom(null);
      setSelectedOwner(null);
      setDeleteRoom(null);
    }
  }, [user]);

  // Refetch on filter change
  useEffect(() => {
    fetchRooms();
  }, [filters, role, userId]);

  const fetchRooms = async () => {
    setLoading(true);
    setHasFetched(false);

    let query = supabase
      .from("rooms")
      .select(
        `
        *,
        room_images (
          image_url,
          created_at
        )
      `
      );

    if (isOwner && userId) {
      query = query.eq("owner_id", userId);
    }

    if (filters.location) {
      query = query.ilike("location", `%${filters.location}%`);
    }
    if (filters.minPrice != null) {
      query = query.gte("rent_price", filters.minPrice);
    }
    if (filters.maxPrice != null) {
      query = query.lte("rent_price", filters.maxPrice);
    }
    if (filters.tenant) {
      query = query.eq("tenant_preference", filters.tenant);
    }
    if (filters.propertyTypes.length > 0) {
      query = query.in("property_type", filters.propertyTypes);
    }
    if (filters.status) {
      query = query.eq("status", filters.status);
    }

    const { data } = await query;

    if (data) {
      const roomsWithImages = data.map((room) => {
        const sortedImages = (room.room_images || []).sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );

        const images = sortedImages
          .map((img) => {
            const { data } = supabase.storage
              .from("room-img")
              .getPublicUrl(img.image_url);
            return data?.publicUrl;
          })
          .filter(Boolean);

        return {
          ...room,
          coverImage: images[0] || "/placeholder.jpg"
        };
      });

      setRooms(roomsWithImages);
    }

    setLoading(false);
    setHasFetched(true);
  };

  return (
    <Box sx={{ bgcolor: "#0b0b0b", minHeight: "100vh" }}>
      <Box sx={{ px: { xs: 2, md: 4 }, pt: 3 }}>
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          maxRent={maxPrice}
          locationInput={locationInput}
          setLocationInput={setLocationInput}
        />
      </Box>

      {/*  Loading */}
      {loading && (
        <Box sx={{ mt: 8, textAlign: "center", color: "text.secondary" }}>
          <Typography>Loading rooms...</Typography>
        </Box>
      )}

      {/*  No rooms */}
      {!loading && hasFetched && rooms.length === 0 && (
        <Box sx={{ mt: 8, textAlign: "center", color: "text.secondary" }}>
          {isOwner ? (
            <>
              <Typography variant="h6">
                No room posted
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Please create a room to see your rooms
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 3 }}
                onClick={() => navigate("/post")}
              >
                Create Room
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h6">
                No such available rooms
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Try adjusting your filters or search location
              </Typography>
            </>
          )}
        </Box>
      )}


      {/* Rooms Grid */}
      {hasFetched && !loading && rooms.length > 0 && (
        <Box
          sx={{
            mt: 3,
            px: { xs: 2, md: 4 },
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)"
            },
            gap: 3
          }}
        >
          {rooms.map((room) => (
            <RoomCard
              key={room.room_id}
              title={room.title}
              price={room.rent_price}
              bedrooms={room.property_type}
              sqft={room.area}
              location={room.location}
              image={room.coverImage}
              user={user}
              activeRole={role}
              canEdit={isOwner && room.owner_id === userId}
              canDelete={isOwner && room.owner_id === userId}
              onEdit={() => {
                if (!isOwner || room.owner_id !== userId) return;
                setEditRoom(room);
              }}
              onDelete={() => {
                if (!isOwner || room.owner_id !== userId) return;
                setDeleteRoom(room);
              }}
              onView={() => navigate(`/room/${room.room_id}`)}
              onOwnerClick={async () => {
                if (!user) {
                  navigate("/signin");
                  return;
                }

                const { data } = await supabase
                  .from("profiles")
                  .select("first_name, last_name, email")
                  .eq("user_id", room.owner_id)
                  .single();

                if (data) setSelectedOwner(data);
              }}
            />
          ))}
        </Box>
      )}

      {/* Owner FAB */}
      {isOwner && (
        <Tooltip title="Add New Room" placement="left">
          <Fab

            onClick={() => navigate("/post")}
            sx={{
              position: "fixed",
              bottom: 24,
              right: 24,
              bgcolor: "primary.main",
              color: "#fff"
            }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      )}

      {/* Edit Modal */}
      {editRoom && isOwner && (
        <EditRoomModal
          open
          room={editRoom}
          onClose={() => setEditRoom(null)}
          onUpdated={fetchRooms}
        />
      )}

      {/*Delete Modal */}
      {deleteRoom && isOwner && (
        <DeleteRoomModal
          open
          room={deleteRoom}
          onClose={() => setDeleteRoom(null)}
          onUpdated={() => {
            setDeleteRoom(null);
            fetchRooms();
          }}
        />
      )}

      {/* Owner Detail */}
      {selectedOwner && userId && (
        <OwnerDetailModal
          open
          owner={selectedOwner}
          onClose={() => setSelectedOwner(null)}
        />
      )}
    </Box>
  );
}
