import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';

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

  return (
    <div className='display-flex justify-space-between align-center py-2 px-5 mint-green'>
      <h2>Game View</h2>
      <div>
        {!loginCheck ? (
          <button className='btn' type='button' style={{ backgroundColor: 'black', color: 'white' }}>
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
            style={{ backgroundColor: 'black', color: 'white' }}
            onClick={() => {
              auth.logout();
            }}
            >
            Logout
            </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
