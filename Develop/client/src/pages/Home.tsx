// import { useState, useEffect, MouseEventHandler } from "react";
// import { Link } from "react-router-dom";
// import { GameData } from "../interfaces/Data.js";

// const MainPage = () => {
//   const [gameArray, setGameArray] = useState<GameData[]>([]);
//   const [dataCheck, setDataCheck] = useState(true);

//   const fetchGames = async () => {
//     try {
//       const response = await fetch("https://api.igdb.com/v4/games", {
//         method: "POST",
//         headers: {
//           "Client-ID": import.meta.env.VITE_IGDB_CLIENT_ID,
//           Authorization: `Bearer ${import.meta.env.VITE_IGDB_ACCESS_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           fields: "id, name, genres.name, release_dates.date",
//           limit: 10,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch games");
//       }

//       const data = await response.json();
//       setGameArray(data);
//     } catch (err) {
//       console.error("Failed to retrieve games:", err);
//     }
//   };

//   const handleDelete: MouseEventHandler<HTMLButtonElement> = async (event) => {
//     const gameId = Number(event.currentTarget.value);
//     if (!isNaN(gameId)) {
//       try {
//         console.log(`Mock deletion for game ID: ${gameId}`);
//         setGameArray((prevGames) =>
//           prevGames.filter((game) => game.id !== gameId)
//         );
//       } catch (error) {
//         console.error("Failed to delete game:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     if (dataCheck) {
//       fetchGames();
//     }
//     setDataCheck(false);
//   }, [dataCheck]);

//   return (
//     <div className="main-list">
//       <div>
//         <Link to="/games">Click here to see the full game list!</Link>
//       </div>
//       {gameArray.length > 0 ? (
//         <div className="game-list">
//           {gameArray.map((game) => (
//             <div key={game.id} className="game-details">
//               <h3>{game.name}</h3>
//               <h4>Genres: {game.genres?.map((g) => g.name).join(", ")}</h4>
//               <div>Release Dates: {game.releaseDates?.map((d) => d.date).join(", ")}</div>
//               <Link to={"/edit-game"} state={{ id: game.id }}>
//                 <button>Edit</button>
//               </Link>
//               <button value={String(game.id)} onClick={handleDelete}>
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div>No games available!</div>
//       )}
//     </div>
//   );
// };

// export default MainPage;
import { useState, useEffect, useLayoutEffect } from "react";
import { retrieveUsers } from "../api/userAPI";
import type { UserData } from "../interfaces/UserData";
import ErrorPage from "./ErrorPage";
import UserList from '../components/Users';
import auth from '../utils/auth';
import '../styles/login.css';
//import backgroundImage from '/gamer_bkgrd.jpg';

import { useNavigate } from "react-router-dom";

const Home = () => {

    const [users, setUsers] = useState<UserData[]>([]);
    const [error, setError] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);

    useEffect(() => {
        if (loginCheck) {
            fetchUsers();
        }
    }, [loginCheck]);

    useLayoutEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };

    const fetchUsers = async () => {
        try {
            const data = await retrieveUsers();
            setUsers(data)
        } catch (err) {
            console.error('Failed to retrieve tickets:', err);
            setError(true);
        }
    }

    const navigate = useNavigate();

    const handleNavigate = () => {
      navigate("/search-video"); // Navigates to the SearchPage component
    };

    if (error) {
        return <ErrorPage />;
    }

    return (
  
        <>
          
            {
                !loginCheck ? (
                    <div className='login-notice'>
                      
                    </div>
                ) : (
                     <UserList users={users} />
                  
                )}

        <div>
            <h2>Video game categories returned by the IGDB API will go here</h2>
            <button onClick={handleNavigate}>Go to Search Page</button>
        </div>
        </>
        // </div>
    
    ); 
};

export default Home;
