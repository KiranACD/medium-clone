import axios from "axios";
import { atom, selector } from "recoil";
import { BACKEND_URL } from "../Config";

export const blogsAtom = atom({
    key: "blogsAtom",
    default: selector({
        key: "blogsAtomSelector",
        get: async ({get}) => {
            const token = localStorage.getItem("blogToken");
            if (token) {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    headers : {
                        Authorization: token,
                    }
                });
                return response.data;
            }
            return {};
        }
    })
})