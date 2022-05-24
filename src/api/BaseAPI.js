import instance from "./instance";
import instance2 from "./instance2";

export const getData = (data) => {
    const url = data;
    return instance.get(url);
};

export const Login = (data) => {
    const url = 'login';
    return instance2.post(url, data);
};

export const GetDataFake = (accessToken) => {
    const url = 'users';
    return instance2.get(url, accessToken);
};
