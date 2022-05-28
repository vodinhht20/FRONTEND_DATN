import requestHeader from "~/config/requestHeader";
import instance from "./instance";
import instance2 from "./instance2";

export const getData = (data) => {
  const url = data;
  return instance.get(url);
};

export const LoginApi = (data) => {
  const url = "login";
  return instance2.post(url, data);
};

export const GetDataFake = () => {
  const headers = requestHeader();
  const url = "users";
  return instance2.get(url, { headers });
};

export const Logout = () => {
  const headers = requestHeader();
  const url = "logout";
  return instance2.post(url, [], { headers });
};
