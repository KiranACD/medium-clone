import { ChangeEvent, useState } from "react";
import { AuthHeader } from "./AuthHeader"
import { InputField } from "./InputField"
import { SigninInput } from "@kiranacd/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../Config";
import { useRecoilState } from "recoil";
import { userAtom } from "../state/UserAtom";
import { useNavigate } from "react-router-dom";


export const SigninComponent = () => {

    const [signInInputs, setSignInInputs] = useState<SigninInput>({email: "", password: ""});
    const [userAtomState, setUserAtomState] = useRecoilState(userAtom);
    const navigate = useNavigate();

    const onChange = (e: ChangeEvent<HTMLInputElement>, label: string) => {
        setSignInInputs((prevState) => {
            const newState: SigninInput = {...prevState};
            if (label === "email" || label === "password") {
                newState[label] = e.target.value || "";
            }
            return newState;
        })
    }

    const onClick = () => {
        sendRequest();
    }

    async function sendRequest() {
        const token = localStorage.getItem("blogToken");
        if (token) {
            navigate("/blogs");
        }
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, signInInputs);
            const user = response.data;
            localStorage.setItem("blogToken", user.jwt);
            setUserAtomState({name: user.name, email: user.email, tagline: user.tagline});
            navigate("/blogs");
        } catch (err) {
            alert("Login Failed!");
        }
    }

    return (
        <div className="flex justify-center items-center">
            <div className="w-full flex flex-col items-center gap-7">
                <AuthHeader type={'signin'} />
                <div className="w-2/3 mt-10">
                    <InputField label={"email"} type={"email"} placeholder={"john_doe@example.com"} onChange={onChange}/>
                </div>
                <div className="w-2/3">
                    <InputField label={"password"} type={"password"} placeholder={"********"} onChange={onChange}/>
                </div>
                <button onClick={onClick} type="button" className="w-2/3 text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-2xl px-5 py-2.5 me-2 mb-2">Sign Up</button>
            </div>
        </div>
    )
}