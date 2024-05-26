import { useRecoilValueLoadable } from "recoil";
import { Avatar } from "./Avatar";
import { blogAtomFamily } from "../state/BlogAtom";
import { toast } from "react-toastify";
import { SpinnerLoading } from "./SpinnerLoader";


export const FullBlog = ({id}: {id: string}) => {

    const blogLoadable = useRecoilValueLoadable(blogAtomFamily(id));

    if (blogLoadable.state === "loading") {
        return (
            <div>
                <div className="flex justify-center items-center h-screen">
                    <SpinnerLoading />
                </div>
            </div>
        )
    } else if (blogLoadable.state === "hasValue") {
        console.log(blogLoadable.contents.content);
        return (
            <div className="grid grid-cols-12 px-20 pt-20 w-full">
                <div className="col-span-8 flex flex-col gap-5">
                    <div className="text-5xl font-bold">
                        {blogLoadable.contents.title}
                    </div>
                    <div className="text-gray-500 text-lg">
                        {`Posted on ${blogLoadable.contents.publishedOn.split("T")[0]}`}
                    </div>
                    <div className="text-gray-800 text-lg whitespace-pre-line">
                        {blogLoadable.contents.content}
                    </div>
                </div>
                <div className="col-span-4 pl-20">
                    <div className="text-xl mb-5">Author</div>
                    <div className="flex items-center gap-5">
                        <div>
                            <Avatar name={blogLoadable.contents.author.name} sizeType={"large"}/>
                        </div>
                        <div>
                            <div className="text-3xl font-semibold">{blogLoadable.contents.author.name}</div>
                            <div className="text-xl text-gray-600 mt-3">{blogLoadable.contents.author.tagline || `Master of mirth, purveryor of puns, and the funniest person in the kingdom.`}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        toast.error("Unable to fetch blog",  {
            toastId: 'BlogComponentError',
        });
        
        return (
            <div>
                <div className="flex items-center justify-center h-screen">
                    ERROR!
                </div>
            </div>
        )
    }
    
}