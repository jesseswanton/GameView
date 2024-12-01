import React, { useState, useEffect, useLayoutEffect } from "react";
import { retrieveUsers } from "../api/userAPI";
import type { UserData } from "../interfaces/UserData";
import ErrorPage from "./ErrorPage";
import UserList from "../components/Users";
import auth from "../utils/auth";
import "../styles/home.css"
import Dropdown from '../components/Dropdown';  
import { GameData } from "../interfaces/Data";
import { useNavigate } from "react-router-dom";
import { HiSearch, HiOutlineStar } from "react-icons/hi";



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
  const [query, setQuery] = useState('dates=2023-01-01%2C2024-11-30');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (dataCheck) {
      fetchGames();
      setDataCheck(false);
    }
  }, [dataCheck]);

  const fetchGames = async () => {
    try {
      const response = await fetch(`https://api.rawg.io/api/games?${query}&page_size=50&page=1&key=${import.meta.env.VITE_RAWG_KEY}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json();
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
    const currentGame = gameArray.find((game) => game.name === gameName);
    if (currentGame) {
      navigate("/search-video", { state: { game: currentGame } });
    }
  };

  // Example data for dropdowns
  const filter = ['Action',
   'Adventure',
   'RPG',
   'Shooter',
   'Strategy'
  ];
  // Handle item selection from any dropdown
  const handleItemSelect = (item: string) => {
    switch (item) {
      case "Action":
        item = 'action';
        break;
      case "Adventure":
        // Handle Adventure genre selection
        break;
      case "RPG":
        // Handle RPG genre selection
        break;
      case "Shooter":
        // Handle Shooter genre selection
        break;
      case "Strategy":
        // Handle Strategy genre selection
        break;
      default:
        break;
    }
    setQuery(`genres=${item.toLowerCase()}`);
    fetchGames();
  };

  const handleSearch = () => {
  if (search !== '') {
    setQuery(`search=${search}`);
    setDataCheck(true);
  }
}

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  } 

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
      <div className="filter-search">
        <div className="search-bar">
          <input
          type="text"
          className="search"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}/>
          <HiSearch
          className="search-button"
          onClick={handleSearch}
          size={30}/>
        </div>
        {/* Use the Dropdown component for Genre, Rating, and Platform */}
        <Dropdown items={filter} onItemSelect={handleItemSelect} />
      </div>
        {gameArray.length > 0 ? (
          <div className="game-list">
            {gameArray.map((game, index) => (
              <div onClick={(event) => handleNavigateToSearch(event)} key={index} className="card">
                <HiOutlineStar className="favorite" size={20} stroke="yellow"></HiOutlineStar>
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