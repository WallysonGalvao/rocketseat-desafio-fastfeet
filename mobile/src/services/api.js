import {LOCALHOST} from 'react-native-dotenv';

import axios from 'axios';

const api = axios.create({
  baseURL: `http://192.168.0.26:3333`,
});

export default api;
