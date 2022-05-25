import { reactLocalStorage } from "reactjs-localstorage";
import instance from "./instance";
import instance2 from "./instance2";

// const config = {
//   headers: {
//     Authorization: reactLocalStorage.getObject('user')
//       ? "Bearer " + reactLocalStorage.getObject('user').access_token
//       : null,
//   },
// };

export const getData = (data) => {
  const url = data;
  return instance.get(url);
};

export const LoginApi = (data) => {
  const url = "login";
  return instance2.post(url, data);
};

export const GetDataFake = (config) => {
  const url = "users";
  return instance2.get(url, {headers: {Authorization: "Bearer " + config.access_token}});
};

export const Logout = (config) => {
  const url = "logout";
  return instance2.post(url, [], {headers: {Authorization: "Bearer " + config.access_token}});
};
