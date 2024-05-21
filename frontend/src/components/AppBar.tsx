import { useRecoilValue } from "recoil"
import { Avatar } from "./Avatar"
import { userAtomSelector } from "../state/UserAtom"
import { useNavigate } from "react-router-dom";


export const AppBar = () => {

    const user = useRecoilValue(userAtomSelector);
    const navigate = useNavigate();

    if (user.email === "") {
        navigate("/signin");
    }

    console.log(user);
    console.log(user.name);

    return (
        <div className="border-b flex justify-between px-10 py-5">
            <div className="text-3xl font-bold">
                Medium
            </div>
            <div>
                <Avatar name={user.name} sizeType={"large"}/>
            </div>
        </div>
    )
}