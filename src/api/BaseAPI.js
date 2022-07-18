import requestHeader from "~/config/requestHeader";
import instance from "./instance";
import instance2 from "./instance2";
import axios from "axios";

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

export const checkIn = (location) => {
  const headers = requestHeader();
  const url = "checkin";
  return instance2.post(url, location, { headers });
};

export const locationOCG = (query) => {
  const url = process.env.REACT_APP_OPENCAGE_URL;
  const key = process.env.REACT_APP_OPENCAGE_KEY;
  return axios.get(url, { params:{ q: query, key, language: 'vn' }});
}

export const changePassword = (password) => {
  const headers = requestHeader();
  const url = "change-password";
  return instance2.post(url, password, { headers });
};

export const updateAvatar = (avatar) => {
  const headers = requestHeader();
  const url = "update-avatar";
  return instance2.post(url, avatar, { headers });
};

export const updateProfile = (profile) => {
  const headers = requestHeader();
  const url = "update-profile";
  return instance2.post(url, profile, { headers });
};

export const kyc = (data) => {
  const headers = requestHeader();
  const url = "kyc";
  return instance2.post(url, data, { headers });
};

export const timesheet = (month) => {
  const headers = requestHeader();
  const url = "timesheet";
  return instance2.get(url, { headers, params: { month } });
}

export const tokenFirebase = (token) => {
  const headers = requestHeader();
  const url = "update-fcm-token";
  return instance2.patch(url, token, { headers });
}

export const timekeepRanking = () => {
  const headers = requestHeader();
  const url = "timekeep-ranking";
  return instance2.get(url, { headers });
}

export const requests = (data) => {
  const headers = requestHeader();
  const url = "requests";
  return instance2.post(url, data, { headers });
}