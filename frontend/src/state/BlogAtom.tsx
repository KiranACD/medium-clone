import axios from "axios";
import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { BACKEND_URL } from "../Config";

export const blogsAtom = atom({
    key: "blogsAtom",
    default: selector({
        key: "blogsAtomSelector",
        get: async ({get}) => {
            const token = localStorage.getItem("blogToken");
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                headers : {
                    Authorization: token,
                }
            });
            return response.data.blogs;
        }
    })
})

export const blogAtomFamily = atomFamily({
    key: "blogAtomFamily",
    default: selectorFamily({
        key: "blogAtomFamilySelector",
        get: (id: string) => async ({get}) => {
            const token = localStorage.getItem("blogToken");
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                headers: {
                    Authorization: token,
                }
            });
            return response.data.blog;
        }
    })
})