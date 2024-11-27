import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';
import GameViewLogo from "/GameView.png";
import Dropdown from './Dropdown';  
import '../styles/dropdown.css';


const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    console.log(loginCheck);
    checkLogin();
  }, [loginCheck]);

 // Example data for dropdowns
 const genres = ['Action', 'Adventure', 'RPG', 'Shooter', 'Strategy'];
 const ratings = ['E (Everyone)', 'T (Teen)', 'M (Mature)', 'AO (Adults Only)'];
 const platforms = ['PC', 'PlayStation', 'Xbox', 'Switch'];

 // Handle item selection from any dropdown
 const handleItemSelect = (item: string) => {
   console.log(`Selected: ${item}`);
 };
  return (


    <nav className='navbar display-flex justify-space-between align-center py-2 px-5 dark-gray'>
        <Link to="/" className="navbar-logo">
        <img
          src={GameViewLogo}
          alt="GameView Logo"
          className="navbar-logo-img"
        />
      </Link>
      <div className="navbar-dropdowns">
        {/* Use the Dropdown component for Genre, Rating, and Platform */}
        <Dropdown label="Genre" items={genres} onItemSelect={handleItemSelect} />
        <Dropdown label="Rating" items={ratings} onItemSelect={handleItemSelect} />
        <Dropdown label="Platform" items={platforms} onItemSelect={handleItemSelect} />
      </div>

      <div>
        {!loginCheck ? (
          <button className='btn' type='button' style={{ backgroundColor: 'black', color: 'white' }} 
          title="Click to view your data and game list">
            <Link to='/login' style={{ color: 'white', textDecoration: 'none' }} 
            onMouseOver={(e) => e.currentTarget.style.color = 'red'} 
            onMouseOut={(e) => e.currentTarget.style.color = 'white'}>
              Login
            </Link>
          </button>
        ) : (
            <button
            className='btn'
            type='button'
            title="Goodbye!"
            style={{ backgroundColor: 'black', color: 'white' }}
            onClick={() => {
              auth.logout();
            }}
            >
            Logout
            </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;