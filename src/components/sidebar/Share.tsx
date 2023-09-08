import closeBtn from "assets/svgs/close.svg";
import { useDialog } from "components";

interface Props {
  setOpenShareModal: (value: React.SetStateAction<boolean>) => void;
}

export const Share = ({ setOpenShareModal }: Props) => {
  const { Alert } = useDialog();

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
      <div className="fixed z-[9999] top-1/2 left-1/2 rounded-[10px] p-10 bg-white  translate-x-[-50%] translate-y-[-50%]">
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
          <button className="rounded-full w-14 h-14 bg-gray07"></button>
          <button className="rounded-full w-14 h-14 bg-gray07"></button>
          <button onClick={handleCopyColorClipBoard} className="rounded-full w-14 h-14 bg-gray07"></button>
        </div>
      </div>
    </>
  );
};
