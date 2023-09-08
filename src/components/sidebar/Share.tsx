import { useEffect } from "react";

import closeBtn from "assets/svgs/close.svg";
import kakaoLogo from "assets/svgs/kakao.svg";
import linkLogo from "assets/svgs/link.svg";
import twitterLogo from "assets/svgs/twitter.svg";
import { useDialog } from "components";

interface Props {
  setOpenShareModal: (value: React.SetStateAction<boolean>) => void;
}
const { Kakao }: any = window;
export const Share = ({ setOpenShareModal }: Props) => {
  const { Alert } = useDialog();
  const realUrl = "https://www.stile.kr/";

  useEffect(() => {
    Kakao.cleanup();
    Kakao.init(process.env.REACT_APP_SHARE_KAKAO_LINK_KEY);
    console.log(Kakao.isInitialized());
  }, []);

  const shareKakao = () => {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "Stile",
        description:
          "인테리어의 무드를 책임지는 벽과 바닥을 Stile에서 제공하는 서비스를 통해 온라인으로 미리 체험해보세요!",
        imageUrl: "https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg",
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
      await Alert("복사되었습니다.");
    } catch (error) {
      await Alert("복사에 실패했습니다.");
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
      <div className="fixed z-[9999] top-1/2 left-1/2 rounded-[10px] p-10 bg-white translate-x-[-50%] translate-y-[-50%]">
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
        <div className="flex justify-center mt-10 gap-4 mx-[100px]">
          <button onClick={shareTwitter} className="rounded-full w-14 h-14 bg-gray05">
            <img src={twitterLogo} alt="shareTwitter" className="mx-auto" />
          </button>
          <button
            onClick={() => {
              shareKakao();
            }}
            className="rounded-full w-14 h-14 bg-gray05"
          >
            <img src={kakaoLogo} alt="shareTwitter" className="mx-auto" />
          </button>
          <button onClick={handleCopyColorClipBoard} className="rounded-full w-14 h-14 bg-gray05">
            <img src={linkLogo} alt="shareTwitter" className="mx-auto" />
          </button>
        </div>
      </div>
    </>
  );
};
