import { useState, useEffect, useLayoutEffect } from "react";
import { retrieveUsers } from "../api/userAPI";
import type { UserData } from "../interfaces/UserData";
import ErrorPage from "./ErrorPage";
import UserList from '../components/Users';
import auth from '../utils/auth';
import '../styles/login.css';
//import backgroundImage from '/gamer_bkgrd.jpg';

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

    if (error) {
        return <ErrorPage />;
    }

    return (
        // <div style={{ 
        //     backgroundImage: `url(${backgroundImage})`,
        //     backgroundSize: 'cover',
        //     backgroundPosition: 'left', 
        //     minHeight: '100vh', 
        //     opacity: '0.9',
        //     width: '100%',
        //     height: '100%',

        //   }}>
        <>
          
            {
                !loginCheck ? (
                    <div className='login-notice'>
                      
                    </div>
                ) : (
                     <UserList users={users} />
                  
                )}
               
        </>
        // </div>
    
    ); 
};

export default Home;

//I was using the below as my home page "MainPage.tsx"

// import { useNavigate } from "react-router-dom";

// const MainPage: React.FC = () => {
//   const navigate = useNavigate();

//   const handleNavigate = () => {
//     navigate("/search-video"); // Navigates to the SearchPage component
//   };

//   return (
//     <div>
//       <h1>Welcome to the Main Page</h1>
//       <button onClick={handleNavigate}>Go to Search Page</button>
//     </div>
//   );
// };

// export default MainPage;