import { Avatar } from "./Avatar"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export const AppBar = ({userName, loggedIn}: {userName: string, loggedIn: boolean}) => {

    const [dropDownOpen, setDropDownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropDown = () => {
        console.log("clicked");
        setDropDownOpen(!dropDownOpen)
    };

    const handleSignup = () => {
        navigate("/signup");
    }

    const handleSignin = () => {
        navigate("/signin");
    }

    const handleButtonClick = () => {
        navigate("/publish");
    }

    return (
        <div className="border-b flex justify-between items-center px-10 py-5">
            <Link to={loggedIn ? "/blogs" : "/"}>
                <div className="text-3xl font-bold cursor-pointer">
                    Medium
                </div>
            </Link>
            {loggedIn ? (
                <div className="flex items-center gap-5">
                    <button type="button" onClick={handleButtonClick} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-md px-5 py-2.5 me-2 ">Publish</button>
                    <div className="cursor-pointer relative" onClick={toggleDropDown}>
                        <Avatar name={userName} sizeType={"large"}/>
                        {dropDownOpen && <DropdownMenu />}                
                    </div>
                </div>
            ) : (
                <div className="flex gap-10">
                    <button onClick={handleSignup} className="text-lg flex flex-col justify-center bg-gray-800 text-white p-2 w-48 rounded-xl">Sign Up</button>
                    <button onClick={handleSignin} className="text-xl flex flex-col justify-center bg-gray-800 text-white p-2 w-48 rounded-xl">Sign In</button>
                </div>
            )
            }
        </div>
    )
}

const DropdownMenu = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("blogToken");
        navigate("/");
    };

    return (
        <div className="absolute right-0 bg-white shadow-md rounded-lg w-40 mt-5">
            <button onClick={handleLogout} className="block px-5 py-5 text-xl text-gray-700 hover:bg-gray-100 w-full text-left">Logout</button>
        </div>
    )
}