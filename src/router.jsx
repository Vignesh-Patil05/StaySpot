import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout";
import Dashboard from "./pages/dashboard";
import PostRoom from "./pages/PostRoom";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import RoomDetailsPage from "./pages/RoomDetailsPage"; 

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "post", element: <PostRoom /> },

      
      { path: "room/:id", element: <RoomDetailsPage /> }
    ]
  },
  { path: "/signin", element: <SignIn /> },
  { path: "/signup", element: <SignUp /> }
]);
