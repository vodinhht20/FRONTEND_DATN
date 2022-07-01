import { atom } from "recoil";

export const initSettingDefault = atom({
    key: "settingDefault",
    default: {
        'backgroundHead': "#001529",
        'backgroundBottom': "#ffffff",
    }
});