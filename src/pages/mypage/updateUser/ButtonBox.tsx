import { useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";

import { deleteImage, deleteUser, logout } from "api/supabase/auth";
import { DeleteConfirmText, useDialog } from "components";
import { useAuthQuery } from "hooks/useAuthQuery";
import Error from "pages/Error";
import { useAuthStore } from "store";

interface Props {
  prevProfileImageId: string;
}

export const ButtonBox = ({ prevProfileImageId }: Props) => {
  const navigate = useNavigate();
  const { Confirm } = useDialog();

  const { patchUserMutation } = useAuthQuery();
  const { currentUserId } = useAuthStore();

  if (currentUserId === undefined) {
    navigate("/");
    return <Error />;
  }

  const userId = currentUserId;

  const deleteAuth = async () => {
    const inputValue = { name: "탈퇴한 유저입니다.", avatar_url: "" };
    if (await Confirm(<DeleteConfirmText />)) {
      await deleteUser(userId);
      patchUserMutation.mutate({ inputValue, userId });
      await logout();
      navigate("/");
      toast("정상적으로 탈퇴되었습니다.", { theme: "plain", zIndex: 9999 });
      if (prevProfileImageId !== "") {
        void deleteImage(prevProfileImageId);
      }
    }
  };

  return (
    <div
      className={
        "flex w-full py-6 lg:flex-column lg:gap-6 md:w-full md:flex-col md:gap-6 sm:w-full sm:flex-col sm:gap-6"
      }
    >
      <div className="flex items-center justify-center w-full gap-4 sm:w-full md:w-full">
        <button
          type="button"
          className="flex w-[192px] h-12 bg-white rounded-lg contents-center gray-outline-button body-3 lg:w-60 sm:w-full md:w-full"
          onClick={() => {
            navigate(-1);
          }}
        >
          이전
        </button>
      </div>

      <div
        className={
          "absolute bottom-0 right-0 flex items-center gap-3 lg:flex-col lg:static lg:contents-center md:flex-col md:static md:contents-center sm:flex-col sm:static sm:contents-center"
        }
      >
        <p className="body-3 text-gray02">더 이상 이용하지 않으시나요?</p>
        <button
          onClick={deleteAuth}
          type="button"
          className="w-[120px] h-12 border body-3 border-gray05 text-gray02 rounded-lg lg:w-60 md:w-full sm:w-full"
        >
          회원탈퇴
        </button>
      </div>
    </div>
  );
};
