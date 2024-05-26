import { Avatar } from "./Avatar"


export const BlogSkeleton = () => {

    return (
        <div role="status" className="w-1/2 animate-pulse">
            <div className="flex items-center gap-2 mb-2.5">
                <Avatar name={""} sizeType={"small"}/>
                <div className="h-2 bg-gray-200 rounded-full w-48"></div>
                
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            
            
            {/* <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div> */}
            {/* <span className="sr-only">Loading...</span> */}
        </div>
    )
}