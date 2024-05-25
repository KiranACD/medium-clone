import axios from "axios";
import { atom, selector } from "recoil";
import { BACKEND_URL } from "../Config";

interface User {
    email: string;
    name: string;
    tagline: string;
    loggedIn: boolean;
}

export const userAtom = atom<User>({
    key: "userAtom",
    default: {
        email: "",
        name: "",
        tagline: "",
        loggedIn: false,
    }
});

export const userAtomSelector = selector<User>({
    key: "userAtomSelector",
    get: async ({get}) => {
        const user = get(userAtom);
        console.log("user", user);
        if (user.loggedIn) {
            return user;
        }
        const token = localStorage.getItem("blogToken");
        const response = await axios.get(`${BACKEND_URL}/api/v1/user/me`, {
            headers: {
                Authorization: token,
            }
        });
        return {name: response.data.user.name, email: response.data.user.email, tagline: response.data.user.tagline, loggedIn: true};
    }
})