import { useRecoilValueLoadable } from "recoil"
import { BlogCard } from "../components/BlogCard"
import { blogsAtom } from "../state/BlogAtom"
import { AppBar } from "../components/AppBar";


export const Blogs = () => {

    const blogsLoadable = useRecoilValueLoadable(blogsAtom);
    
    return (
        <div>
            <AppBar />
            <div className="flex flex-col items-center">
                <BlogCard 
                    authorName={"Kiran"}
                    title={"Title of Blog"}
                    content={"Content of Blog"}
                    publishedDate={"2nd Feb 2024"}
                />
            </div>
        </div>
    )
}