// import { useRecoilValueLoadable } from "recoil"
import { Quote } from "../components/Quote"
import { SigninComponent } from "../components/SigninComponent"
// import { userAtomSelector } from "../state/UserAtom"
// import { useNavigate } from "react-router-dom"


export const Signin = () => {

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <SigninComponent />
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
    //             <SigninComponent />
    //             <div className="invisible lg:visible">
    //                 <Quote />
    //             </div>
    //         </div>
    //     );
    // } else {
    //     return (
    //         <div className="grid grid-cols-1 lg:grid-cols-2">
    //             <SigninComponent />
    //             <div className="invisible lg:visible">
    //                 <Quote />
    //             </div>
    //         </div>
    //     );
    // }

    
}