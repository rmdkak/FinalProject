import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { type Tables } from "types/supabase";

import { FindEmail } from "./FindEmail";
import { FindPassword } from "./FindPassword";
import { FoundEmail } from "./FoundEmail";
import { Tab } from "./Tab";

export interface FocusTab {
  focusEmail: boolean;
  focusPassword: boolean;
}

const FindAuth = () => {
  const param = useParams();

  const initialFocus =
    param.focus === "email" ? { focusEmail: true, focusPassword: false } : { focusEmail: false, focusPassword: true };

  const [focusTab, setFocusTab] = useState<FocusTab>(initialFocus);
  const [isDoneFind, setIsDoneFind] = useState(false);
  const [findUser, setFindUser] = useState<Tables<"USERS", "Row">>();

  const changeTabHandler = (type: "email" | "password") => {
    failedFind();

    type === "email"
      ? setFocusTab({ focusEmail: true, focusPassword: false })
      : setFocusTab({ focusEmail: false, focusPassword: true });
  };

  const failedFind = () => {
    setIsDoneFind(false);
  };

  const successFind = (data: Tables<"USERS", "Row">) => {
    setIsDoneFind(true);
    setFindUser(data);
  };

  useEffect(() => {
    return () => {
      setFindUser(undefined);
    };
  }, []);

  return (
    <div className="box-border items-center max-w-[560px] min-w-[360px] w-full gap-6 mx-auto my-20  flex-column body-4 sm:mt-6 sm:px-6">
      <h2 className="w-full pb-6 text-center title-3 sm:hidden ">회원정보 찾기</h2>
      <Tab changeTabHandler={changeTabHandler} focusTab={focusTab} />

      {focusTab.focusEmail && !isDoneFind && <FindEmail failedFind={failedFind} successFind={successFind} />}

      {focusTab.focusEmail && isDoneFind && <FoundEmail findUser={findUser} />}

      {focusTab.focusPassword && !isDoneFind && <FindPassword />}
    </div>
  );
};
export default FindAuth;
