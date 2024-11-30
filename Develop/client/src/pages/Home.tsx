import React, { useState, useEffect, useLayoutEffect } from "react";
import { retrieveUsers } from "../api/userAPI";
import type { UserData } from "../interfaces/UserData";
import ErrorPage from "./ErrorPage";
import UserList from "../components/Users";
import auth from "../utils/auth";
import "../styles/home.css"
import { GameData } from "../interfaces/Data";
import { useNavigate } from "react-router-dom";



const Home: React.FC = () => {
  // Login state
  const [users, setUsers] = useState<UserData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    if (loginCheck) {
      fetchUsers();
    }
  }, [loginCheck]);

  const fetchUsers = async () => {
    try {
      const data = await retrieveUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to retrieve users:", err);
      setError(true);
    }
  };

  // Game list state
  const [gameArray, setGameArray] = useState<GameData[]>([]);
  const [dataCheck, setDataCheck] = useState(true);

  useEffect(() => {
    if (dataCheck) {
      fetchGames();
      setDataCheck(false);
    }
  }, [dataCheck]);

  const fetchGames = async () => {
    try {
      const response = await fetch(`https://api.rawg.io/api/games?dates=2019-10-10,2020-10-10&ordering=-added&key=${import.meta.env.VITE_RAWG_KEY}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json();
    console.log(data)
    if (data) {
      setGameArray(data.results)
    }
  } catch (error) {
    console.log(error)
  }
  };

  // Navigation with example query

  const navigate = useNavigate();
  const handleNavigateToSearch = (event: React.MouseEvent<HTMLElement>) => {
    const gameName = event.currentTarget.querySelector("h3")?.innerText;
    if (gameName) {
      navigate("/search-video", { state: { searchQuery: "Reviews for " + gameName } });
    }
  };



  if (error) {
    return <ErrorPage />;
  }

    return (
    
      <>
    
      {!loginCheck ? (
        <div className="login-notice">
          {/* <h3>Please log in to view user data and game lists.</h3> */}
        </div>
      ) : (
        <UserList users={users} />
      )}

      <div className="main-list">
        {gameArray.length > 0 ? (
          <div className="game-list">
            {gameArray.map((game, index) => (
              <div onClick={(event) => handleNavigateToSearch(event)} key={index} className="card">
                <img className="card-img"  src={game.background_image} alt={`${game.name} cover art`} />
                  <h3 className="card-title">{game.name}</h3>
              </div>
            ))}

          </div>
        ) : (
          <div>No games available!</div>
        )}
      </div>
    </>
  );
};

export default Home;