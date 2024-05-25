// import { useRecoilValueLoadable } from "recoil";
import { Quote } from "../components/Quote"
import { SignupComponent } from "../components/SignupComponent"
// import { userAtomSelector } from "../state/UserAtom";
// import { useNavigate } from "react-router-dom";

export const Signup = () => {

    // const userLoadable = useRecoilValueLoadable(userAtomSelector);
    // const navigate = useNavigate();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <SignupComponent />
            <div className="invisible lg:visible">
                <Quote />
            </div>
        </div>
    );

    // if (userLoadable.state === "loading") {
    //     return (
    //         <div className="flex items-center justify-center h-screen">
    //             loading...
    //         </div>
    //     )
    // } else if (userLoadable.state === "hasValue") {

    //     if (userLoadable.contents.loggedIn) {
    //         navigate("/blogs");
    //     }

    //     return (
    //         <div className="grid grid-cols-1 lg:grid-cols-2">
    //             <SignupComponent />
    //             <div className="invisible lg:visible">
    //                 <Quote />
    //             </div>
    //         </div>
    //     );
    // } else {
    //     return (
    //         <div className="grid grid-cols-1 lg:grid-cols-2">
    //             <SignupComponent />
    //             <div className="invisible lg:visible">
    //                 <Quote />
    //             </div>
    //         </div>
    //     );
    // } 
}