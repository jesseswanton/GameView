
import { useState, FormEvent } from 'react';
import '../styles/Login.css';
import emailjs from 'emailjs-com';

// Utility function to generate a random temporary password
const generateTempPassword = (length = 8) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let tempPassword = '';
  for (let i = 0; i < length; i++) {
    tempPassword += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return tempPassword;
};

const resetPassword = async (email: string, tempPassword: string) => {
  const token = localStorage.getItem('jwtToken');  // Get the JWT token from localStorage

  try {
    const response = await fetch('/api/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  // Send the token in the Authorization header
      },
      body: JSON.stringify({ email, tempPassword }),
    });

    if (response.ok) {
      console.log('Password reset successfully');
    } else {
      try {
        const data = await response.json();
        console.error(data.message || 'Failed to reset password');
      } catch (error) {
        console.error('Failed to parse response as JSON:', error);
      }
    }
  } catch (error) {
    console.error('Error resetting password:', error);
  }
};

const ForgotPassword = () => {
const [email, setEmail] = useState('');
const [message, setMessage] = useState('');
const [isLoading, setIsLoading] = useState(false);



const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const tempPassword = generateTempPassword(); // Generate a temporary password
    try {
      // Access EmailJS service details from .env
      const userId = import.meta.env.VITE_EMAILJS_USER_ID;
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
     
      if (userId && serviceId && templateId) {
        const emailTemplateParams = {
         
           user_email: email,
           message: tempPassword,
           email_to: email,  
         // temp_password: tempPassword,
         
        };
       console.log("tempPassword: ", tempPassword);
       console.log("email: ", email);
        // Send the email using EmailJS
        const result = await emailjs.send(serviceId, templateId, emailTemplateParams, userId);
        if (result.status === 200) {
          setMessage('Temporary password has been sent to your email.');
          await resetPassword(email, tempPassword);
 
        } else {
          setMessage('Failed to send email. Please try again later.');
        }
      } else {
        setMessage('Failed to send email. Please try again later.');
      }
    } catch (error) {
      console.error('Error occurred:', error);
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
            onChange={handleEmailChange}
            type="email"
            id="email"
            placeholder="Enter your email"
            className="form-input"
          />
        </div>
     
      </div>
    
      <div className="form-group">
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
          {message && <p>{message}</p>}
        </div>
        <p>
            Back to Login?{' '}
            <a href="/login">
              Login
            </a>
          </p>
      </form>
    </div>
  );
};
export default ForgotPassword;
