import axios from "axios";

const instance = axios.create({
    baseURL: 'https://627a1d1273bad5068582bcba.mockapi.io/polyf/'
});

export const instanceV2 = axios.create({
    baseURL: 'https://618a8f5a34b4f400177c4794.mockapi.io'
});
export default instance;