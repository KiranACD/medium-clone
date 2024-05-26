import { ChangeEvent, useEffect, useState } from "react";
import { AuthHeader } from "./AuthHeader"
import { InputField } from "./InputField"
import { SigninInput } from "@kiranacd/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../Config";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../state/UserAtom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const SigninComponent = () => {

    const [signInInputs, setSignInInputs] = useState<SigninInput>({ email: "", password: "" });
    const setUserAtomState = useSetRecoilState(userAtom);
    const navigate = useNavigate();

    const onChange = (e: ChangeEvent<HTMLInputElement>, label: string) => {
        setSignInInputs((prevState) => {
            const newState: SigninInput = { ...prevState };
            if (label === "email" || label === "password") {
                newState[label] = e.target.value || "";
            }
            return newState;
        })
    }

    const onClick = () => {
        sendRequest();
    }

    useEffect(() => {
        const token = localStorage.getItem("blogToken");
        if (token) {
            getUserDetails(token);
        }
    }, []);

    const getUserDetails = async (token: string) => {
        const id = toast.loading("Signing In...");
        try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/user/me`, {
                headers: {
                    Authorization: token,
                }
            });
            toast.update(id, {render: "Welcome!", type: "success", isLoading:false, autoClose: 3000});
            const user = response.data;
            setUserAtomState({ name: user.name, email: user.email, tagline: user.tagline, loggedIn: true });
            navigate("/blogs");
        } catch (err) {
            if (err instanceof Error) {
                toast.update(id, {render: `${err.message}`, type: "error", isLoading: false, autoClose: 3000});
            }
        }
    }

    async function sendRequest() {
        const id = toast.loading("Signing In...");
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, signInInputs);
            toast.update(id, {render: "Signed In!", type: "success", isLoading:false, autoClose: 3000});
            const user = response.data;
            localStorage.setItem("blogToken", user.jwt);
            setUserAtomState({ name: user.name, email: user.email, tagline: user.tagline, loggedIn: true });
            navigate("/blogs");
        } catch (err) {
            if (err instanceof Error) {
                toast.update(id, {render: `${err.message}`, type: "error", isLoading: false, autoClose: 3000});
            }
        }
    }

    return (
        <div className="flex justify-center items-center">
            <div className="w-full flex flex-col items-center gap-7">
                <AuthHeader type={'signin'} />
                <div className="w-2/3 mt-10">
                    <InputField label={"email"} type={"email"} placeholder={"john_doe@example.com"} onChange={onChange} />
                </div>
                <div className="w-2/3">
                    <InputField label={"password"} type={"password"} placeholder={"********"} onChange={onChange} />
                </div>
                <button onClick={onClick} type="button" className="w-2/3 text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-2xl px-5 py-2.5 me-2 mb-2">Sign In</button>
            </div>
        </div>
    )
}