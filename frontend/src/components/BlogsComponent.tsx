import { useRecoilValueLoadable } from "recoil"
import { blogsAtom } from "../state/BlogAtom"
import { BlogCard } from "./BlogCard";
import { toast } from "react-toastify";
import { BlogSkeleton } from "./BlogSkeleton";

interface blogInterface {
    content: string;
    title: string;
    id: string;
    publishedOn: string;
    author: {
        name: string;
        tagline: string;
    }
}

export const BlogsComponent = () => {

    const blogsLoadable = useRecoilValueLoadable(blogsAtom);

    // return (
    //     <div className="flex flex-col items-center gap-10 border-b pt-5 pb-10 ">
    //         <BlogSkeleton />
    //         <BlogSkeleton />
    //         <BlogSkeleton />
    //         <BlogSkeleton />
    //         <BlogSkeleton />
    //         <BlogSkeleton />
    //     </div>
    // );
    if (blogsLoadable.state === "loading") {
        return (
            <div className="flex flex-col items-center gap-10 border-b pt-5 pb-10 ">
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
        </div>
        );
    } else if (blogsLoadable.state === "hasValue") {
        return (
            <div>
                <div className="flex flex-col items-center">
                {blogsLoadable.contents.map((blog: blogInterface) => (
                    <BlogCard 
                        id={blog.id}
                        authorName={blog.author.name}
                        title={blog.title}
                        content={blog.content}
                        publishedDate={blog.publishedOn.split("T")[0]}
                    />
                ))}
                </div>
            </div>
        );
    } else {
        toast.error("Unable to fetch blogs",  {
            toastId: 'BlogsComponentError',
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