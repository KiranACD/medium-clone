import axios from "axios";
import { atom, selector } from "recoil";
import { BACKEND_URL } from "../Config";


export const userAtom = atom({
    key: "userAtom",
    default: {
        email: "",
        name: "",
        tagline: "",
    }
});

export const userAtomSelector = selector({
    key: "userAtomSelector",
    get: async ({get}) => {
        const user = get(userAtom);
        if (user.email === "") {
            const token = localStorage.getItem("blogToken");
            if (token) {
                try {
                    const response = await axios.get(`${BACKEND_URL}/api/v1/user/me`, {
                        headers: {
                            Authorization: token,
                        }
                    });
                    return response.data.user;
                } catch (err) {
                    return user;
                }
            }
            return user;
        }
        return user;
    }
})