import { useEffect } from "react";

import { auth } from "api/supabase";
import Router from "shared/Router";
import { useAuthStore } from "store";

const App = () => {
  const { stayLoggedInStatus, setCurrentSession } = useAuthStore();

  useEffect(() => {
    const getAuthSession = async () => {
      await auth.getSession().then(({ data }) => {
        console.log("getSession 작동");
        setCurrentSession(data.session);
      });
    };

    if (stayLoggedInStatus) {
      getAuthSession().catch((error) => {
        console.log(error);
      });
    }

    auth.onAuthStateChange((event, session) => {
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
