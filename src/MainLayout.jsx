import { Outlet , useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useRole } from "./pages/RoleContext";

export default function MainLayout() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const { switchRole } = useRole();

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);

        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", session.user.id)
          .single(); // RLS ensures only own row

        setProfile(data);
      }
    };

    loadUser();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    switchRole("user");
    localStorage.removeItem("activeRole");
    setUser(null);
    setProfile(null);

    navigate("/",{replace:true});
  };

  return (
    <>
      <Navbar user={user} profile={profile} onLogout={logout} />
      <Outlet context={{ user, profile }} />
    </>
  );
}
