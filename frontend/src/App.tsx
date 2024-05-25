import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Blog } from "./pages/Blog";
import { Blogs } from "./pages/Blogs";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Landing } from "./pages/Landing";
import { Publish } from "./pages/Publish";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



function App() {

  return (
    <>
      <ToastContainer position="top-right"/>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/publish" element={<Publish />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>      
    </>
  )
}

export default App
