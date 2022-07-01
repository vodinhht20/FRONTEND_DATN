import axios from "axios";

// const baseURL = process.env.REACT_APP_API;
// const baseURL = "http://13.213.62.168/api"
const baseURL = "http://quan-ly-nhan-su-camel.vn/api"
const instance2 = axios.create({baseURL});

export default instance2;
