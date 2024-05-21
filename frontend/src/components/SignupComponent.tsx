import { ChangeEvent, useEffect, useState } from "react"
import { AuthHeader } from "./AuthHeader"
import { SignupInput } from "@kiranacd/medium-common";
import { InputField } from "./InputField";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../Config";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userAtom } from "../state/UserAtom";



export const SignupComponent = () => {

    const [signUpInputs, setSignUpInputs] = useState<SignupInput>({email: "", password: "", name: ""});
    const [userAtomState, setUserAtomState] = useRecoilState(userAtom);
    const navigate = useNavigate();

    const onChange = (e: ChangeEvent<HTMLInputElement>, label: string) => {
        setSignUpInputs((prevState) => {
            const newState: SignupInput = {...prevState};
            if (label === "email" || label === "password" || label === "name") {
                newState[label] = e.target.value || "";
            }
            return newState;
        })
    }

    useEffect(() => {
        const token = localStorage.getItem("blogToken");
        console.log(token);
        if (token) {
            navigate("/blogs");
        }
    }, []);

    const onClick = () => {
        sendRequest();
    }

    async function sendRequest() {
        
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, signUpInputs);
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
                <AuthHeader type={'signup'} />
                <div className="w-2/3 mt-10">
                    <InputField label={"name"} type={"text"} placeholder={"John Doe"} onChange={onChange}/>
                </div>
                <div className="w-2/3">
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