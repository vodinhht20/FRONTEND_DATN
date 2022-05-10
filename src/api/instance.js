import axios from "axios";

const instance = axios.create({
    baseURL: 'https://627a1d1273bad5068582bcba.mockapi.io/polyf/'
});

export default instance;