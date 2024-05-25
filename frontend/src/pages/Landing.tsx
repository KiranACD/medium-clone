import { useNavigate } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { userAtomSelector } from "../state/UserAtom";
import { AppBar } from "../components/AppBar";
import { AppBarSkeleton } from "../components/AppBarSkeleton";

export const Landing = () => {

    const navigate = useNavigate();
    const userLoadable = useRecoilValueLoadable(userAtomSelector);

    if (userLoadable.state === "loading") {
        return (
            <div className="h-screen">
                <AppBarSkeleton />
                <div className="h-2/3 flex justify-center items-center">
                    <h1 className="text-8xl font-bold">Stay Curious.</h1>
                </div>
            </div>
        )
    } else if (userLoadable.state === "hasValue") {
        if (userLoadable.contents.loggedIn === true) {
            navigate("/blogs");
        }
        return (
            <div className="h-screen">
                <AppBar userName={userLoadable.contents.name} loggedIn={false}/>
                <div className="h-2/3 flex justify-center items-center">
                    <h1 className="text-8xl font-bold">Stay Curious.</h1>
                </div>
            </div>
        );
    } else {
        return (
            <div className="h-screen">
                <AppBar userName={""} loggedIn={false}/>
                <div className="h-2/3 flex justify-center items-center">
                    <h1 className="text-8xl font-bold">Stay Curious.</h1>
                </div>
            </div>
        );
    }
}