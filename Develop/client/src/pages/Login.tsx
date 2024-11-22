import { useState, type FormEvent, type ChangeEvent } from 'react';
import Auth from '../utils/auth';
import { login, register } from '../api/authAPI';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import type { UserLogin } from '../interfaces/UserLogin';
import type { UserRegister } from '../interfaces/UserRegister'
//import ForgotPassword from './ForgotPassword'; 
import { validateEmail } from '../utils/helpers';

import '../styles/Login.css';

const Login = () => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const [loginData, setLoginData] = useState<UserLogin>({
    username: '',
    password: '',
  });

  const [registerData, setRegisterData] = useState<UserRegister>({
    username: '',
    password: '',
    confirmPassword: '', // To confirm that both passwords match
    email: '',
  });

  //to have an eye icon to show/hide password
  const [loginPasswordVisible, setLoginPasswordVisible] = useState(false);
  const [registerPasswordVisible, setRegisterPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);


  //for password errors
  const [error, setError] = useState<string | null>(null);

  const handleLoginChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleRegisterChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
    if (name === 'email') {
      if (!validateEmail(value)) {
        setError('Please enter a valid email address.');
      } else {
        setError(null);
      }
    }
  };

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      Auth.login(data.token);
    } catch (err) {
      setError('Failed to login');
      console.error('Failed to login', err);
    }
  };
  const handleRegisterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null); //clears errors
    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match!');
      console.error('Passwords do not match!');
      return;
    }

    try {
      const data = await register(registerData);
      Auth.login(data.token);
    } catch (err) {
      setError('Failed to register');
      console.error('Failed to register', err);
    }
  };


// i should only need to toggle bewteen the Register ForgotPassword and ResetPassword components. 


  return (
    <div className='form-container'>
      {/* The video background */}
      <div className="video-background">
        <video autoPlay loop muted>
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* The login form */}{
        isForgotPassword
      }
      {isRegistering ? (
        <form className='form login-form' onSubmit={handleRegisterSubmit}>
          <h1>Register an account</h1>
          <div className='form-group'>
            <label>Username</label>
            <input
              className='form-input'
              type='text'
              name='username'
              value={registerData.username || ''}
              onChange={handleRegisterChange}
            />
          </div>
          <div className='form-group'>
            <label>Email</label>
            <input
              className='form-input'
              type='text'
              name='email'
              value={registerData.email || ''}
              onChange={handleRegisterChange}
            />
            {error && <p className='error-message'>{error}</p>}
          </div>
          <div className='form-group'>
            <label>Password</label>
            <div className="password-wrapper">
              <input
                className='form-input'
                type={registerPasswordVisible ? 'text' : 'password'}
                name='password'
                value={registerData.password || ''}
                onChange={handleRegisterChange}
                autoComplete="on"
              />
              <span
                className="eye-icon"
                onClick={() => setRegisterPasswordVisible(!registerPasswordVisible)}
              >
                {registerPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <div className="password-wrapper">
              <input
                className="form-input"
                type={confirmPasswordVisible ? 'text' : 'password'}
                name="confirmPassword"
                autoComplete="on"
                value={registerData.confirmPassword || ''}
                onChange={handleRegisterChange}
              />
              <span
                className="eye-icon"
                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              >
                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <button className="btn btn-primary" type="submit">
              Register
            </button>
          </div>
          <p>
            Already have an account?{' '}
            <a href="#" onClick={() => setIsRegistering(false)}>
              Login
            </a>
          </p>
        </form>
      ) : (
        // Login Form
        <form className="form login-form" onSubmit={handleLoginSubmit}>
          <h1>Login to view profile</h1>
          <div className="form-group">
            <label>Username</label>
            <input
              className="form-input"
              type="text"
              name="username"
              value={loginData.username || ''}
              onChange={handleLoginChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                className="form-input"
                type={loginPasswordVisible ? 'text' : 'password'}
                name="password"
                autoComplete="on"
                value={loginData.password || ''}
                onChange={handleLoginChange}
              />
              <span
                className="eye-icon"
                onClick={() => setLoginPasswordVisible(!loginPasswordVisible)}
              >
                {loginPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
          <p>
            Don't have an account?{' '}
            <a href="#" onClick={() => setIsRegistering(true)}>
              Register here
            </a>
          </p>
          <p>
            Forgot your password?{' '}
            <a href="/forgotPassword" onClick={() => setIsForgotPassword(true)}>
              Reset it here
            </a>
                     
          </p>
        </form>
      )}
    </div>
  );
};


export default Login;
