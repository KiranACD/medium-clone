import { useRecoilValueLoadable } from "recoil";
import { AppBar } from "../components/AppBar";
import { userAtomSelector } from "../state/UserAtom";
import { BlogsComponent } from "../components/BlogsComponent";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SpinnerLoading } from "../components/SpinnerLoader";


export const Blogs = () => {

    const userLoadable = useRecoilValueLoadable(userAtomSelector);
    const navigate = useNavigate();

    if (userLoadable.state === "loading") {
        return (
            <div>
                <AppBar userName={""} loggedIn={true}/>
                <div className="flex items-center justify-center h-screen">
                    <SpinnerLoading />
                </div>
            </div>
        );
    } else if (userLoadable.state === "hasValue") {

        return (
            <div>
                <AppBar userName={userLoadable.contents.name} loggedIn={true}/>
                <BlogsComponent />
            </div>
        )
    } else {
        toast.error("Unable to get your details", {
            toastId: 'BlogsError',
        });
        navigate("/");
    }
}