import { useEffect } from "react";
import toast from "react-simple-toasts";

import closeBtn from "assets/svgs/close.svg";
import kakaoLogo from "assets/svgs/kakao.svg";
import linkLogo from "assets/svgs/link.svg";
import twitterLogo from "assets/svgs/twitter.svg";

interface Props {
  setOpenShareModal: (value: React.SetStateAction<boolean>) => void;
}
const { Kakao }: any = window;
export const Share = ({ setOpenShareModal }: Props) => {
  const realUrl = "https://www.stile.kr/";

  useEffect(() => {
    Kakao.cleanup();
    Kakao.init(process.env.REACT_APP_SHARE_KAKAO_LINK_KEY);
  }, []);

  const shareKakao = () => {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "Stile",
        description:
          "인테리어의 무드를 책임지는 벽과 바닥을 Stile에서 제공하는 서비스를 통해 온라인으로 미리 체험해보세요!",
        imageUrl: "https://aiqrtjdvdlzhtyadyqnh.supabase.co/storage/v1/object/public/Images/etc/ogImage.png",
        link: {
          webUrl: realUrl,
        },
      },
    });
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${realUrl}`);
  };

  const handleCopyColorClipBoard = async () => {
    try {
      await navigator.clipboard.writeText("https://www.stile.kr/");
      toast("복사되었습니다.", { theme: "warning", zIndex: 9999 });
    } catch (error) {
      toast("실패했습니다.", { theme: "failure", zIndex: 9999 });
      console.error("복사 실패", error);
    }
  };

  return (
    <>
      {/* 뒷배경 */}
      <div
        onMouseDown={() => {
          setOpenShareModal(false);
        }}
        className="fixed top-0 bottom-0 left-0 right-0 block w-full h-full bg-[#00000040] z-[9998]"
      ></div>
      {/* 모달 */}
      <div className="fixed z-[9999] top-1/2 left-1/2 rounded-[10px] p-10 bg-white translate-x-[-50%] translate-y-[-50%] sm:p-5">
        {/* 모달 헤더 */}
        <div className={`flex items-center justify-center pb-3 mb-8 border-b border-black`}>
          <h2 className="text-2xl font-semibold">공유하기</h2>
          <button
            className="absolute top-4 right-4"
            onClick={() => {
              setOpenShareModal(false);
            }}
          >
            <img src={closeBtn} alt="닫기 버튼" className="w-[18px] h-[18px]" />
          </button>
        </div>
        <div className="flex justify-center mt-10 gap-4 mx-[100px] sm:mx-10 sm:mt-5">
          <button onClick={shareTwitter} className="bg-black rounded-full w-14 h-14">
            <img src={twitterLogo} alt="shareTwitter" className="mx-auto" />
          </button>
          <button
            onClick={() => {
              shareKakao();
            }}
            className="rounded-full w-14 h-14 bg-[#F8E049]"
          >
            <img src={kakaoLogo} alt="shareKakao" className="mx-auto" />
          </button>
          <button onClick={handleCopyColorClipBoard} className="rounded-full w-14 h-14 bg-gray05">
            <img src={linkLogo} alt="shareLink" className="mx-auto" />
          </button>
        </div>
      </div>
    </>
  );
};
