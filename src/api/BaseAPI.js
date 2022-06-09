import requestHeader from "~/config/requestHeader";
import instance from "./instance";
import instance2 from "./instance2";

export const getData = (data) => {
  const url = data;
  return instance.get(url);
};

export const getData2 = (data) => {
  const url = data;
  const headers = requestHeader();
  return instance2.get(url, { headers });
};

export const checkAuth = () => {
  const headers = requestHeader();
  const url = "auth";
  return instance2.post(url, [], { headers });
};

export const LoginApi = (data) => {
  const url = "login";
  return instance2.post(url, data);
};

export const LoginGG = (tokenId) => {
  const url = `login-google/?token_id=${tokenId}`;
  return instance2.post(url);
};

export const GetDataFake = () => {
  const headers = requestHeader();
  const url = "users";
  return instance2.get(url, { headers });
};
export const GetDataLogin = () => {
  const headers = requestHeader();
  const url = "login-google";
  return instance2.get(url, { headers });
};

export const Logout = () => {
  const headers = requestHeader();
  const url = "logout";
  return instance2.post(url, [], { headers });
};

export const checkIn = () => {
  const headers = requestHeader();
  const url = "checkin";
  return instance2.post(url, {'latitude': 1, 'longitude': 103}, { headers });
};
