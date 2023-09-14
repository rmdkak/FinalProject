import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DotLoader } from "react-spinners";

const Layout = lazy(async () => await import("../components/layout/Layout"));
const ResourcesCalculator = lazy(async () => await import("../components/service/ResourcesCalculator"));
const Home = lazy(async () => await import("../pages/Home"));
const InteriorPreview = lazy(async () => await import("../pages/InteriorPreview"));
const Post = lazy(async () => await import("../pages/Post"));
const UpdatePost = lazy(async () => await import("../pages/UpdatePost"));
const Detail = lazy(async () => await import("../pages/Detail"));
const Community = lazy(async () => await import("../pages/Community"));
const Inquiry = lazy(async () => await import("../pages/Inquiry"));
const Mypage = lazy(async () => await import("../pages/mypage/Mypage"));
const UpdateUser = lazy(async () => await import("../pages/mypage/UpdateUser"));
const MyBookmark = lazy(async () => await import("../pages/mypage/MyBookmark"));
const MyComment = lazy(async () => await import("../pages/mypage/MyComment"));
const MyLike = lazy(async () => await import("../pages/mypage/MyLike"));
const MyInquiry = lazy(async () => await import("../pages/mypage/MyInquiry"));
const Login = lazy(async () => await import("../pages/Login"));
const FindAuth = lazy(async () => await import("../pages/FindAuth"));
const UpdatePassword = lazy(async () => await import("../pages/UpdatePassword"));
const AdminPage = lazy(async () => await import("../pages/adminPage/AdminPage"));
const Signup = lazy(async () => await import("../pages/Signup"));
const Error = lazy(async () => await import("../pages/Error"));
const MyPost = lazy(async () => await import("../pages/mypage/MyPost"));
const Event = lazy(async () => await import("../pages/Event"));
const EventList = lazy(async () => await import("../pages/EventList"));
const Router = () => {
  return (
    <Suspense fallback={<DotLoader color="#ffd75e" className="absolute mx-auto top-[300px]" size={200} />}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/interior-preview" element={<InteriorPreview />} />
            <Route path="/interior-preview/calculator" element={<ResourcesCalculator />} />
            <Route path="/post" element={<Post />} />
            <Route path="/updatepost/:id" element={<UpdatePost />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/community" element={<Community />} />
            <Route path="/inquire" element={<Inquiry />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/mypage/update" element={<UpdateUser />} />
            <Route path="/mypage/post" element={<MyPost />} />
            <Route path="/mypage/comment" element={<MyComment />} />
            <Route path="/mypage/bookmark" element={<MyBookmark />} />
            <Route path="/mypage/like" element={<MyLike />} />
            <Route path="/mypage/inquiry" element={<MyInquiry />} />
            <Route path="/login" element={<Login />} />
            <Route path="/find-auth/:focus" element={<FindAuth />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/adminpage" element={<AdminPage />} />
            <Route path="/*" element={<Error />} />
            <Route path="/event/:id" element={<Event />} />
            <Route path="/eventlist" element={<EventList />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Suspense>
  );
};
export default Router;
