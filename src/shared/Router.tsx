import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "components";
import * as Pages from "pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Pages.Home />} />
          <Route path="/interior-preview" element={<Pages.InteriorPreview />} />
          <Route path="/post" element={<Pages.Post />} />
          <Route path="/updatepost/:id" element={<Pages.UpdatePost />} />
          <Route path="/detail/:id" element={<Pages.Detail />} />
          <Route path="/community" element={<Pages.Community />} />
          <Route path="/mypage" element={<Pages.Mypage />} />
          <Route path="/mypage/update" element={<Pages.UpdateUser />} />
          <Route path="/mypage/post" element={<Pages.MyPost />} />
          <Route path="/mypage/comment" element={<Pages.MyComment />} />
          <Route path="/mypage/bookmark" element={<Pages.MyBookmark />} />
          <Route path="/mypage/like" element={<Pages.MyLike />} />
          <Route path="/login" element={<Pages.Login />} />
          <Route path="/find-auth/:focus" element={<Pages.FindAuth />} />
          <Route path="/update-password" element={<Pages.UpdatePassword />} />
          <Route path="/signup" element={<Pages.Signup />} />
          <Route path="/adminpage" element={<Pages.AdminPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
export default Router;
