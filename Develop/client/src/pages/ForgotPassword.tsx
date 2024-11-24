
import { useState, FormEvent } from 'react';
//import { forgotPasswordRequest } from '../api/authAPI'; // Your API call to request reset link
import '../styles/Login.css';

import axios from 'axios';
import emailjs from 'emailjs-com';


const ForgotPassword = () => {
const [email, setEmail] = useState('');
const [message, setMessage] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
     
      const response = await axios.post<{ success: boolean; tempPassword: string }>('http://localhost:5000/forgot-password', { email });

      if (response.data.success) {
          const tempPassword = response.data.tempPassword; // Received temporary password

          const emailTemplateParams = {
              email_to: email,
              temp_password: tempPassword,
          };

          // Access EmailJS service details from .env
          const userId = process.env.REACT_APP_EMAILJS_USER_ID;
          const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
          const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;

          // Send the email using EmailJS
          if (userId && serviceId && templateId) {
            const result = await emailjs.send(serviceId, templateId, emailTemplateParams, userId);
            if (result.status === 200) {
              setMessage('Temporary password has been sent to your email.');
            } else {
              setMessage('Failed to send email. Please try again later.');
            }
          } else {
            setMessage('Failed to send email. Please try again later.');
          }
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    }
};
 
  return (
    <div className='form-container'>
    {/* The video background */}
    <div className="video-background">
      <video autoPlay loop muted>
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    <form onSubmit={handleSubmit} className="form">
      <h2>Reset Your Password</h2>
      <div className="form-group">

      <div>
          <label htmlFor="email">Email:</label>
          <input
            value={email}
            name="email"
            // onChange={(e) => setEmail(e.target.value)}
            onChange={handleEmailChange}
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
    </div>
  );
};

export default ForgotPassword;
