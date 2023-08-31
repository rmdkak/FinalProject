import { useEffect, useState } from "react";

import { addUser, auth, fetchUserCheckData } from "api/supabase";
import Router from "shared/Router";
import { useAuthStore } from "store";

const App = () => {
  const { setCurrentSession, stayLoggedInStatus } = useAuthStore();

  const [userData, setUserData] = useState<Array<{ email: string; name: string }>>();

  useEffect(() => {
    const getUserData = async () => {
      await fetchUserCheckData().then((data) => {
        setUserData(data);
      });
    };
    void getUserData();
  }, [fetchUserCheckData]);

  useEffect(() => {
    const getAuthSession = async () => {
      await auth.getSession().then(({ data: { session } }) => {
        setCurrentSession(session);
      });
    };

    if (stayLoggedInStatus) {
      void getAuthSession();
    }

    auth.onAuthStateChange(async (event, session) => {
      // 소셜 로그인일 때 USER DATA 저장
      const provider = session?.user.app_metadata.provider;
      if (provider === "kakao" || provider === "google" || provider === "github") {
        const matchUser = userData?.filter((user) => user.email === session?.user.email);

        if (matchUser == null || matchUser.length === 0) {
          await addUser({
            id: session?.user.id as string,
            email: session?.user.email as string,
            phone: session?.user.phone as string,
            name: session?.user.user_metadata.name as string,
            avatar_url: session?.user.user_metadata.avatar_url as string,
          }).catch((error) => {
            if (error.message === `duplicate key value violates unique constraint "USERS_pkey"`) {
              console.info("소셜 재로그인");
            }
          });
        }
      }

      switch (event) {
        case "SIGNED_IN":
          setCurrentSession(session);
          break;
        case "SIGNED_OUT":
          setCurrentSession(null);
          break;
        default:
      }
    });
  }, [setCurrentSession]);

  return <Router />;
};

export default App;
