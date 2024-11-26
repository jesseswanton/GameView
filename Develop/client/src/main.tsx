// import React from "react";
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles/index.css'

// import dotenv from 'dotenv';
// dotenv.config();

import App from './App.tsx';
import Login from './pages/Login.tsx';

import ErrorPage from './pages/ErrorPage.tsx';
// import MainPage from './pages/MainPage.tsx';
import SearchPage from "./pages/SearchPage.tsx";
import VideoPage from "./pages/VideoPage.tsx";
import Home from './pages/Home.tsx';
import RegisterForm from './pages/RegisterUserForm';
import ForgotPassword from './pages/ForgotPassword';
//import GameCard from './pages/Favorites.tsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, 
      {
        path: '/search-video',
        element: <SearchPage />
      },
      {
        path: '/display-video',
        element: <VideoPage />
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
          {
        path: '/registerForm',
        element: <RegisterForm />,
      },
      {
        path: '/forgotPassword',
        element: <ForgotPassword />,
      },
      // {
      //   path: '/favorites',
      //   element: <GameCard />,
      // },
      
    ]
  }
]);

const rootElement = document.getElementById('root');
if(rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <RouterProvider router={router} />
  );
}
