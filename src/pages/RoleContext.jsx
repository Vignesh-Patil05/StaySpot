import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const RoleContext = createContext();

export const useRole = () => useContext(RoleContext);

export function RoleProvider({ children }) {
    const [role, setRole] = useState(() => {
        return localStorage.getItem("activeRole") || "user";
    });

    const switchRole = (newRole) => {
        localStorage.setItem("activeRole", newRole);
        setRole(newRole);
    };

    useEffect(() => {
        if (!localStorage.getItem("activeRole")) {
            localStorage.setItem("activeRole", "user");
        }
    }, []);

    {/*Owner state to user on loggout*/}
    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                if (!session) {
                    setRole("user");
                    localStorage.removeItem("activeRole");
                }
            }
        );

        return () => listener.subscription.unsubscribe();
    }, []);

    return (
        <RoleContext.Provider value={{ role, switchRole }}>
            {children}
        </RoleContext.Provider>
    );
}
