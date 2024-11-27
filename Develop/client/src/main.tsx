import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/index.css";

import App from "./App.tsx";
import Login from "./pages/Login.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import Home from "./pages/Home.tsx";
import RegisterForm from "./pages/RegisterUserForm.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import Favorites from "./pages/Favorites.tsx";


// Create the router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />, // Default route
      },
      {
        path: "search-video",
        element: <SearchPage />, // Route for searching videos
      },
      {
        path: "login",
        element: <Login />, // Route for login
      },
      {
        path: "registerForm",
        element: <RegisterForm />, // Route for user registration
      },
      {
        path: "forgotPassword",
        element: <ForgotPassword />, // Route for password recovery
      },
     {
        path: "favorites",
        element: <Favorites />, // Route for favorites
      },
    ],
  },
]);

// Mount the React application
const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <RouterProvider router={router} />
  );
} else {
  console.error("Failed to find the root element. React application cannot render.");
}
