import { useEffect, useState } from "react";

import { addUser, fetchUserCheckData } from "api/supabase/auth";
import { auth } from "api/supabase/supabaseClient";
import Router from "shared/Router";
import { useAuthStore } from "store";

const App = () => {
  const { setCurrentSession, stayLoggedInStatus, setCurrentUserId } = useAuthStore();
  const [userData, setUserData] = useState<Array<{ email: string; name: string }>>();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await fetchUserCheckData();
        setUserData(user);
      } catch (error) {
        console.error(error);
      }
    };
    void getUserData();
  }, [fetchUserCheckData]);

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
      if (provider === "kakao" || provider === "google" || provider === "github") {
        const matchUser = userData?.filter((user) => user.email === session?.user.email);

        if (matchUser == null || matchUser.length === 0) {
          try {
            await addUser({
              id: session?.user.id as string,
              email: session?.user.email as string,
              name: session?.user.user_metadata.name as string,
              avatar_url: session?.user.user_metadata.avatar_url as string,
            });
          } catch (error) {
            if (error === `duplicate key value violates unique constraint "USERS_pkey"`) {
              console.info("소셜 재로그인");
            }
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
