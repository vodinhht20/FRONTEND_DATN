import { atom } from "recoil";

export const initSearch = atom({
    key: "search",
    default: [
        {name: 'Chấm công', link: "cham-cong"},
        {name: 'Bảng công', link: "bang-cong"},
        {name: 'Thống kê', link: "thong-ke"},
      ]
});