import axios from 'axios';

const spookifyAPI = axios.create({
  // baseURL: 'https://spookify-music.herokuapp.com/api',
  baseURL: 'http://localhost:8080/api',
});

export default spookifyAPI;
