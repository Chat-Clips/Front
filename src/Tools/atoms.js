import {atom} from "recoil";

export const Uid=atom({
    key: "uid",
    default: '', //string
});

export const roomId=atom({
    key: "rid",
    default: '', //string
});