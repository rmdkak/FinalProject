import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "components";
import { Home, Service, Post, Community, Detail, Mypage, Login, Signup } from "pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service" element={<Service />} />
          <Route path="/post" element={<Post />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="/community" element={<Community />} />
          <Route path="/mypage/:uid" element={<Mypage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
export default Router;
