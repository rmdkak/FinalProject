import { useEffect } from "react";

import { addUser } from "api/supabase/auth";
import { auth } from "api/supabase/supabaseClient";
import { useAuthQuery } from "hooks/useAuthQuery";
import Router from "shared/Router";
import { useAuthStore } from "store";

import "react-simple-toasts/dist/theme/warning.css";
import "react-simple-toasts/dist/theme/failure.css";
import "react-simple-toasts/dist/theme/plain.css";

const App = () => {
  const { setCurrentSession, stayLoggedInStatus, setCurrentUserId } = useAuthStore();
  const { currentUserResponse } = useAuthQuery();
  const { data: currentUser } = currentUserResponse;

  useEffect(() => {
    const getAuthSession = async () => {
      try {
        const {
          data: { session },
        } = await auth.getSession();
        setCurrentSession(session);
        setCurrentUserId(session?.user.id);
      } catch (error) {
        console.error(error);
      }
    };

    if (stayLoggedInStatus) {
      void getAuthSession();
    }

    auth.onAuthStateChange(async (event, session) => {
      const provider = session?.user.app_metadata.provider;
      const isProvider = provider === "kakao" || provider === "google" || provider === "github";
      if (currentUser !== undefined && isProvider && session !== null) {
        try {
          await addUser({
            id: session.user.id,
            email: session.user.email as string,
            name: session.user.user_metadata.name,
            avatar_url: session.user.user_metadata.avatar_url,
          });
        } catch (error) {
          if (error === `duplicate key value violates unique constraint "USERS_pkey"`) {
            console.info("소셜 재로그인");
          }
        }
      }

      switch (event) {
        case "SIGNED_IN":
          setCurrentSession(session);
          setCurrentUserId(session?.user.id);
          break;
        case "SIGNED_OUT":
          setCurrentSession(null);
          setCurrentUserId(undefined);
          break;
        default:
      }
    });
  }, [setCurrentSession, setCurrentUserId, auth]);

  return <Router />;
};

export default App;
