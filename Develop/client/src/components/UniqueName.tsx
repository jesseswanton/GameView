import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Props {
  onSubmit: (username: string) => void;
}

const UsernameForm: React.FC<Props> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);

  useEffect(() => {
    const checkUsernameAvailability = async () => {
      if (username.trim() === '') {
        setIsUsernameAvailable(true); 
        return;
      }

      try {
        const response = await axios.get(`/api/check-username?username=${username}`);
        setIsUsernameAvailable(response.data.isAvailable);
      } catch (error) {
        console.error('Error checking username availability:', error);
        setIsUsernameAvailable(false);
      }
    };

    checkUsernameAvailability();
  }, [username]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isUsernameAvailable) {
      onSubmit(username);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Username" 
      />
      {!isUsernameAvailable && <p>Username is not available</p>}
      <button type="submit" disabled={!isUsernameAvailable}>Submit</button>
    </form>
  );
};

export default UsernameForm;