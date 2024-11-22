import { useState, FormEvent } from 'react';
import { register } from '../api/authAPI';
import Auth from '../utils/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../styles/Login.css';
import { validateEmail } from '../utils/helpers';
import axios from 'axios';



const RegisterForm = () => {
  const [registerData, setRegisterData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [registerPasswordVisible, setRegisterPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const checkUsernameAvailability = async (username: string) => {
    setIsCheckingUsername(true);
    try {
      const response = await axios.post('/api/check-username', { username });
      if (response.data.message === 'Username is available') {
     
        setUsernameAvailable(true);
      } else {
        setUsernameAvailable(false);
      }
    } catch (error) {
      console.error('Error checking username availability:', error);
      setUsernameAvailable(false);
    }
  };
  

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
    if (name === 'username') {
      checkUsernameAvailability(value);
    }

    if (name === 'email') {
      if (!validateEmail(value)) {
        setError('Please enter a valid email address.');
      } else {
        setError(null);
      }
    }

  
  };

  const handleRegisterSubmit = async (e: FormEvent) => {
    e.preventDefault();
      if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    try {
      const data = await register(registerData);
      Auth.login(data.token);
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <form className="form" onSubmit={handleRegisterSubmit}>
      <h1>Register an account</h1>
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={registerData.username}
          onChange={handleRegisterChange}
          className="form-input"
        />
         {isCheckingUsername && <p>Checking username...</p>}
         {usernameAvailable === false && <p className='error-message'>Username is already taken</p>}
        {usernameAvailable === true && <p className='success-message'>Username is available</p>}
   
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={registerData.email}
          onChange={handleRegisterChange}
          className="form-input"
        />
          {/* {error && <p className='error-message'>{error}</p>} */}
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={registerData.password}
          onChange={handleRegisterChange}
          className="form-input"
        />
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
      {/* <div className='form-group'>
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
          </div> */}
      {error && <div className="error-message">{error}</div>}
      <div className="form-group">
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
