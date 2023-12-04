import axios from 'axios';
import Cookies from 'js-cookie';
let URL = 'http://localhost:5000/api/users/';

const register = async (userData) => {
  const response = await axios.post(URL, userData);

  if (typeof window !== 'undefined') {
   
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  Cookies.set('user', JSON.stringify(response.data));
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(URL + 'login', userData);

  if (typeof window !== 'undefined') {
   
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  Cookies.set('user', JSON.stringify(response.data));
  return response.data;
};

const logout = () => {
  if (typeof window !== 'undefined') {
  
    localStorage.removeItem('user');
    
  }
  Cookies.remove('user');
};

const authService = {
  register,
  logout,
  login,
};

export default authService;