import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';
import GameViewLogo from "/GameView.png";
import '../styles/dropdown.css';

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    checkLogin();
  }, [loginCheck]);

  return (
    <nav className='navbar display-flex justify-space-between align-center py-2 px-5 dark-gray'>
      <Link to="/" className="navbar-logo">
        <img
          src={GameViewLogo}
          alt="GameView Logo"
          className="navbar-logo-img"
        />
      </Link>

      <div className="button-container">
        {loginCheck && (
          <button className='btn' type='button'>
            <Link
              to='/favorites'
              className='btn-link'
              title="Click to view your favorites"
            >
              Favorites
            </Link>
          </button>
        )}

        {!loginCheck ? (
          <button className='btn' type='button' title="Click to view your data and game list">
            <Link to='/login' className='btn-link' title="Click to login">
              Login
            </Link>
          </button>
        ) : (
          <button
            className='btn'
            type='button'
            title="Goodbye!"
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