import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "components";
import * as pages from "pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<pages.Home />} />
          <Route path="/service" element={<pages.Service />} />
          <Route path="/post" element={<pages.Post />} />
          <Route path="/updatepost/:id" element={<pages.UpdatePost />} />
          <Route path="detail/:id" element={<pages.Detail />} />
          <Route path="/community" element={<pages.Community />} />
          <Route path="/mypage" element={<pages.Mypage />} />
          <Route path="/mypage/update" element={<pages.UpdateUser />} />
          <Route path="/mypage/post" element={<pages.MyPost />} />
          <Route path="/mypage/comment" element={<pages.MyComment />} />
          <Route path="/mypage/bookmark" element={<pages.MyBookmark />} />
          <Route path="/mypage/like" element={<pages.MyLike />} />
          <Route path="/login" element={<pages.Login />} />
          <Route path="/find-auth/:focus" element={<pages.FindAuth />} />
          <Route path="/update-password" element={<pages.UpdatePassword />} />
          <Route path="/signup" element={<pages.Signup />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
export default Router;
