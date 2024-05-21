import { Quote } from "../components/Quote"
import { SignupComponent } from "../components/SignupComponent"

export const Signup = () => {

     return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <SignupComponent />
            <div className="invisible lg:visible">
                <Quote />
            </div>
        </div>
     )
}