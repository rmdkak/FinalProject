import { useLocation, useNavigate } from "react-router-dom";

export const useMovePage = () => {
  const navigate = useNavigate();

  const setCurrentPathname = () => {
    const { pathname } = useLocation();
    localStorage.setItem("currentPage", JSON.stringify(pathname));
  };

  const getCurrentPathname = () => {
    const storedData = localStorage.getItem("currentPage");
    const pathname = storedData !== null ? JSON.parse(storedData) : null;
    const detailPostId = pathname?.replace("/detail/", "");

    switch (pathname) {
      case "/":
        navigate("/");
        break;
      case "/interior-preview":
        navigate("/interior-preview");
        break;
      case `/detail/${detailPostId as string}`:
        navigate(`/detail/${detailPostId as string}`);
        break;
      case "/community":
        navigate("/community");
        break;
    }
  };

  return { getCurrentPathname, setCurrentPathname };
};
