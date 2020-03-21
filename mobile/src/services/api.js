import {LOCALHOST} from 'react-native-dotenv';

import axios from 'axios';

const api = axios.create({
  baseURL: `http://${LOCALHOST}:3333`,
});

export default api;
