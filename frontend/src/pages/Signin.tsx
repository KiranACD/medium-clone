import { Quote } from "../components/Quote"
import { SigninComponent } from "../components/SigninComponent"


export const Signin = () => {

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <SigninComponent />
            <div className="invisible lg:visible">
                <Quote />
            </div>
        </div>
    )
}