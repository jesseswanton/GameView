import type { UserLogin } from '../interfaces/UserLogin.js';
import type { UserRegister } from '../interfaces/UserRegister.js';



const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('User information not retrieved, check network tab!');
    }
    
    return data;
  } catch (err) {
    console.log('Error from user login: ', err);
    return Promise.reject('Could not fetch user info');
  }
};

export const register = async (registerData: UserRegister) => {
  try {
    const response = await fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    });

    const data = await response.json();
    console.log("Data: ", data);
    if (!response.ok) {
      throw new Error('User information cannot be saved, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from user login: ', err);
    return Promise.reject('Could not fetch user info');
  }
};

export const forgotPasswordRequest = async ({ email }: { email: string }) => {
  try {
    const response = await fetch('/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Password reset request failed, check network tab!');
    }
    
    return data;
  } catch (err) {
    console.log('Error from forgot password request: ', err);
    return Promise.reject('Could not process password reset request');
  }
};
export { login };
