import { useState, type FormEvent, type ChangeEvent, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import { login, register } from '../api/authAPI';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import type { UserLogin } from '../interfaces/UserLogin';
import type { UserRegister } from '../interfaces/UserRegister'
import { validateEmail } from '../utils/helpers';

import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  // const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [loginData, setLoginData] = useState<UserLogin>({
    username: '',
    password: '',
  });

  const [registerData, setRegisterData] = useState<UserRegister>({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  });

  const [loginPasswordVisible, setLoginPasswordVisible] = useState(false);
  const [registerPasswordVisible, setRegisterPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [loginError, setLoginError] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        setEmailError('Please enter a valid email address.');
      } else {
        setEmailError(null);
      }
    }
    if (name === 'password' || name === 'confirmPassword') {
      setTimeout(() => {
        if (registerData.password !== registerData.confirmPassword) {
          setPasswordError('Passwords do not match!');
        } else {
          setPasswordError(null);
        }
      }, 500);
    }
  };

const handleLoginSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setLoginError(null);
  try {
    const data = await login(loginData);
    Auth.login(data.token);
    console.log('Auth token saved:', localStorage.getItem('id_token'));
    navigate('/');  // Redirect after the token is set
  } catch (err) {
    setLoginError('Failed to login, check your username and password');
    console.error('Failed to login', err);
  }
};

  const handleRegisterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError('Passwords do not match!');
      console.error('Passwords do not match!');
      return;
    }

    try {
      const data = await register(registerData);
      console.log("Returned Data: ", data);
      Auth.login(data.token);
      navigate('/'); // Redirect to favorites page on successful registration
    } catch (err) {
      console.log("Error: ", err);
      setRegisterError('Failed to register');
      console.error('Failed to register', err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setLoginError(null);
        setRegisterError(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='form-container'>
      <div className="video-background">
        <video autoPlay loop muted>
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

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
            {emailError && <p className='error-message'>{emailError}</p>}
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
          <div>
           {passwordError && <p className="error-message">{passwordError}</p>} 
          </div>
          {registerError && <div className="error-message">{registerError}</div>}
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
              {loginError && <p className='error-message'>{loginError}</p>} 
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
          {/* <p>
            Forgot your password?{' '}
            <a href="/forgotPassword" onClick={() => setIsForgotPassword(true)}>
              Reset it here
            </a>
          </p> */}
        </form>
      )}
    </div>
  );
};

export default Login;