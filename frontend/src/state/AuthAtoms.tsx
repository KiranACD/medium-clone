import { atom } from "recoil";


export const signUpAtom = atom({
    key: "signUpAtom",
    default: {
        name: "",
        email: "",
        password: "",
    }
});

export const signInAtom = atom({
    key: "signInAtom",
    default: {
        email: "",
        password: "",
    }
});