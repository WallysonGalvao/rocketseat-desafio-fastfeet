import {LOCALHOST} from 'react-native-dotenv';
import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://192.168.0.24:3333',
  baseURL: `http://${LOCALHOST}:3333`,
});

export default api;
