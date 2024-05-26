import { useNavigate, useParams } from "react-router-dom"
import { useRecoilValueLoadable } from "recoil";
import { FullBlog } from "../components/FullBlog";
import { AppBar } from "../components/AppBar";
import { userAtomSelector } from "../state/UserAtom";
import { AppBarSkeleton } from "../components/AppBarSkeleton";
import { toast } from "react-toastify";
import { SpinnerLoading } from "../components/SpinnerLoader";

export const Blog = () => {

    const navigate = useNavigate();
    const idReadOnly = useParams();
    const id = idReadOnly.id || '';
    
    const userLoadable = useRecoilValueLoadable(userAtomSelector);

    if (userLoadable.state === "loading") {
        return (
            <div>
                <AppBarSkeleton />
                <div className="flex h-screen justify-center items-center">
                    <SpinnerLoading />
                </div>
            </div>
        )
    } else if (userLoadable.state === "hasValue") {
        return (
            <div>
                <AppBar userName={userLoadable.contents.name} loggedIn={true}/>
                <FullBlog id={id}/>
            </div>
        )
    } else {
        toast.error("Unable to get your details", {
            toastId: 'BlogError',
        });
        navigate("/");
    }
    
}