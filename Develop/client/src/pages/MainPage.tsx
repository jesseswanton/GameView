// import React from "react";

//This is old code used to test the video search

import { useNavigate } from "react-router-dom";

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/search-video"); // Navigates to the SearchPage component
  };

  return (
    <div>
      <h1>Welcome to the Main Page</h1>
      <button onClick={handleNavigate}>Go to Search Page</button>
    </div>
  );
};

export default MainPage;
