import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";

import { logout } from "api/supabase/auth";
import { useAuthStore } from "store";

export const useAuth = () => {
  const navigate = useNavigate();
  const { setStayLoggedInStatus } = useAuthStore();

  const logoutWithMessage = useCallback(async () => {
    navigate("/");
    try {
      await logout();
      setStayLoggedInStatus(false);
      toast("로그아웃 되었습니다.", { theme: "plain", zIndex: 9999 });
    } catch (error) {
      toast("로그아웃에 실패하였습니다.", { theme: "failure", zIndex: 9999 });
      console.error(error);
    }
  }, []);

  return { logoutWithMessage };
};
