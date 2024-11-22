
import { useState, FormEvent } from 'react';
import { forgotPasswordRequest } from '../api/authAPI'; // Your API call to request reset link
import '../styles/Login.css';


const ForgotPassword = () => {
const [email, setEmail] = useState('');
const [message, setMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Call API to send reset password link
      await forgotPasswordRequest({ email });
      setMessage('If an account with this email exists, a reset link has been sent.');
    } catch (err) {
      setMessage('There was an error, please try again.');
    }
  };

  return (
    
    <form onSubmit={handleSubmit} className="form">
      <h2>Reset Your Password</h2>
      <div className="form-group">

      <div>
          <label htmlFor="email">Email:</label>
          <input
            value={email}
            name="email"
            // onChange={(e) => setEmail(e.target.value)}
            onChange={handleInputChange}
            type="email"
            id="email"
            placeholder="Enter your email"
            className="form-input"
          />
        </div>
     
      </div>
      {message && <div className="message">{message}</div>}
      <div className="form-group">
        <button type="submit" className="btn btn-primary">
          Send Reset Link
        </button>
        
      </div>
    </form>
  );
};

export default ForgotPassword;
