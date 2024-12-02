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
import { fetchGames } from "../api/rawgAPI";
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
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (dataCheck) {
      getGames();
      setDataCheck(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCheck]);

  const getGames = async () => {
    try {
      const games = await fetchGames(query, page);
      setGameArray(games);
    } catch (error) {
      console.error("Failed to retrieve games:", error);
      setError(true);
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
        item = 'adventure';
        break;
      case "RPG":
        item = 'role-playing-games-rpg';
        break;
      case "Shooter":
        item = 'shooter';
        break;
      case "Strategy":
        item = 'strategy';
        break;
      default:
        break;
    }
    setQuery(`genres=${item.toLowerCase()}&ordering=-released`);
    setDataCheck(true);
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

  const handlePageChange = (page: number) => {
    setPage(page);
    setDataCheck(true);
  }

  if (error) {
    return <ErrorPage />;
  }

    return (
      <>
      {!loginCheck ? (
        <div className="title">
          <h3>
            Log in to save a list of your favorite games.
          </h3>
        </div>
  ) : (
        <UserList users={users}/>
      )}
      <div className="container main-list">
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
                <HiOutlineStar className="favorite" size={20} stroke="#fef08a"></HiOutlineStar>
                <img className="card-img"  src={game.background_image} alt={`${game.name} cover art`} />
                  <h3 className="card-title">{game.name}</h3>
              </div>
            ))}
            <div className="page-select">
              <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</button>
              <button onClick={() => handlePageChange(page + 1)}>Next</button>
            </div>
          </div>
        ) : (
          <div style={{margin: "1 rem", color: "white"}}>Loading games!</div>
        )}
      </div>
    </>
  );
};

export default Home;