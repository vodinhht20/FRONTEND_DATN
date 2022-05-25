import axios from "axios";

const baseURL = process.env.REACT_APP_API;
const instance2 = axios.create({baseURL});

export default instance2;
