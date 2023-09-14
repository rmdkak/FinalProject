export type PathName =
  | "resourcesCalculator"
  | "interior-preview"
  | "post"
  | "updatepost"
  | "detail"
  | "community"
  | "inquire"
  | "mypage"
  | "/mypage/update"
  | "/mypage/bookmark"
  | "/mypage/comment"
  | "/mypage/like"
  | "/mypage/inquiry"
  | "login"
  | "find-auth"
  | "update-password"
  | "adminpage"
  | "signup"
  | "/mypage/post"
  | "event"
  | "eventlist";

export const useDynamicImport = () => {
  const preFetchPageBeforeEnter = async (type: PathName) => {
    switch (type) {
      case "resourcesCalculator":
        return await import("../components/service/ResourcesCalculator");
      case "interior-preview":
        return await import("../pages/InteriorPreview");
      case "post":
        return await import("../pages/Post");
      case "updatepost":
        return await import("../pages/UpdatePost");
      case "detail":
        return await import("../pages/Detail");
      case "community":
        return await import("../pages/Community");
      case "inquire":
        return await import("../pages/Inquiry");
      case "mypage":
        return await import("../pages/mypage/Mypage");
      case "/mypage/update":
        return await import("../pages/mypage/UpdateUser");
      case "/mypage/bookmark":
        return await import("../pages/mypage/MyBookmark");
      case "/mypage/comment":
        return await import("../pages/mypage/MyComment");
      case "/mypage/like":
        return await import("../pages/mypage/MyLike");
      case "/mypage/inquiry":
        return await import("../pages/mypage/MyInquiry");
      case "login":
        return await import("../pages/Login");
      case "find-auth":
        return await import("../pages/FindAuth");
      case "update-password":
        return await import("../pages/UpdatePassword");
      case "adminpage":
        return await import("../pages/adminPage/AdminPage");
      case "signup":
        return await import("../pages/Signup");
      case "/mypage/post":
        return await import("../pages/mypage/MyPost");
      case "event":
        return await import("../pages/Event");
      case "eventlist":
        return await import("../pages/EventList");
    }
  };

  return { preFetchPageBeforeEnter };
};
