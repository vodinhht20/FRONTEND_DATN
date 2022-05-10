import instance from "./instance";

export const getData = (data) => {
    const url = data;
    return instance.get(url);
};
