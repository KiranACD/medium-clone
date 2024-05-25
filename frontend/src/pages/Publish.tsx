import { useRecoilValueLoadable } from "recoil"
import { userAtomSelector } from "../state/UserAtom";
import { AppBarSkeleton } from "../components/AppBarSkeleton";
import { useNavigate } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { PublishComponent } from "../components/PublishComponent";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../Config";
import { toast } from "react-toastify";

export const Publish = () => {

    const [title, setTitle] = useState("");
    const [article, setArticle] = useState("");
    const userLoadable = useRecoilValueLoadable(userAtomSelector);
    const navigate = useNavigate();

    const onTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setArticle(e.target.value);
    }

    const handleSubmit = async () => {
        try {
            console.log(article);
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content: article,
            }, {
                headers: {
                    Authorization: localStorage.getItem("blogToken"),
                }
            });
            navigate(`/blog/${response.data.id}`);
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message, {
                    toastId: 'PublishError', 
                })
            }
        }
    }

    if (userLoadable.state === "loading") {
        return (
            <div>
                <AppBarSkeleton />
                <div className="flex justify-center items-center h-screen">
                    Loading...
                </div>
            </div>
        )
    } else if (userLoadable.state === "hasValue") {
        return (
            <div className="flex flex-col gap-10">
                <AppBar userName={userLoadable.contents.name} loggedIn={true} />
                <div className="flex flex-col items-center w-full">
                    <div className="flex flex-col gap-10 items-center w-full">
                        <input type="text" onChange={(e) => setTitle(e.target.value)}placeholder={"Title"} className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-O block w-2/3 p-2.5" />
                        <PublishComponent onTextAreaChange={onTextAreaChange}/>
                    </div>
                    <div className="w-2/3">
                        <button type="submit" onClick={handleSubmit} className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                            Publish post
                        </button>
                    </div>
                </div>
            </div>
        )
    } else {
        alert("Error while loading user details")
        navigate("/");
    }
    
}