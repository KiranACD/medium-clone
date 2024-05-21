import { Avatar } from "./Avatar";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {

    return (
        <div className="flex flex-col gap-1 border-b pt-5 pb-10 w-1/2">
            <div className="flex items-center">
                <div className="flex">
                    <Avatar name={authorName} sizeType={"small"}/>
                </div>
                <div className="ml-2">    
                    {authorName}  
                </div>
                <div className="ml-2 text-2xl">
                    ·
                </div>
                <div className="text-gray-600 ml-2">
                    {publishedDate}
                </div>
            </div>
            <div className="text-2xl font-semibold mt-2">
                {title}
            </div>
            <div className="text-gray-800">
                {content.length > 100 ? (content.slice(0, 100) + "...") : (content)}
            </div>
            <div className="mt-2 ml-2 text-gray-500 text-sm">
                {content.length > 100 ? (`${Math.ceil(content.length / 100)} minutes read`) : "1 minute read"}
            </div>
        </div>
    )
}