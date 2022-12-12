import { atom } from "recoil";

export const initAccessToken = atom({
    key: "access_token",
    default: ""
});