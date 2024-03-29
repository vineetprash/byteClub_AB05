import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Login from "./Routes/Login.jsx";
import Signup from "./Routes/Signup.jsx";
import { NextUIProvider } from "@nextui-org/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProfilePage from "./Components/ProfilePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
]);

const Root = () => {
  return (
    <NextUIProvider>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </NextUIProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
