import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import LoginPage from "./Routes/Login.jsx";
import SignupPage from "./Routes/Signup.jsx";
import { NextUIProvider } from "@nextui-org/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

const Root = () => {
  return (
    <NextUIProvider dark>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </NextUIProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
