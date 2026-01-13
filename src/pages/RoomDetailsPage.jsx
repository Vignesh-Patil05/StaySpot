import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import RoomDetails from "./RoomDetails";

export default function RoomDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRoom = async () => {
      // 1️⃣ Check login
      const { data: auth } = await supabase.auth.getUser();

      if (!auth?.user) {
        navigate("/signin", { replace: true });
        return;
      }

      // 2️⃣ Fetch room
      const { data, error } = await supabase
        .from("rooms")
        .select(`
          *,
          room_images (image_url, created_at)
        `)
        .eq("room_id", id)
        .single();

      if (error || !data) {
        navigate("/", { replace: true });
        return;
      }

      // 3️⃣ Prepare images
      const images =
        data.room_images?.map((img) => {
          const { data } = supabase.storage
            .from("room-img")
            .getPublicUrl(img.image_url);
          return data?.publicUrl;
        }).filter(Boolean) || [];

      setRoom({ ...data, images });
      setLoading(false);
    };

    loadRoom();
  }, [id, navigate]);

  if (loading) return null; // or spinner

  return <RoomDetails room={room} />;
}
