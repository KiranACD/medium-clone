import { Avatar } from "./Avatar"


export const AppBarSkeleton = () => {

    return (
        <div className="border-b flex justify-between px-10 py-5">
            <div className="text-3xl font-bold cursor-pointer">
                Medium
            </div>
            <div className="cursor-pointer relative">
                <Avatar name={""} sizeType={"large"}/>                
            </div>
        </div>
    )
}