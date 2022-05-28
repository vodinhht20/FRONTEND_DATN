import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
const baseURL = process.env.REACT_APP_API_URL;
// const token = reactLocalStorage.get('access_token');
// const headers = {'Authorization': 'Bearer '+ token};
const instance = axios.create({baseURL});

export default instance;