import { Link } from "react-router-dom"


export const AuthHeader = ({type}: {type: "signup" | "signin"}) => {

    return (
        <div className="flex justify-center">
            <div>
            <div className="text-center text-5xl font-bold mb-2">
                {type==="signup" ? `Create An Account` : `Login To Your Account`}
                
            </div>
            <div>
                {type === "signup" ? (
                    <div className="text-center text-2xl text-gray-600">
                        Already have an account? 
                        <Link className="ml-1 underline" to={"/signin"}>Login</Link>
                    </div>
                ) : (
                    <div className="text-center text-2xl text-gray-600">
                        Not have an account? 
                        <Link className="ml-1 underline" to={"/signup"}>Sign Up</Link>
                    </div>
                )}
                
            </div>
            </div>
        </div>
    )
}