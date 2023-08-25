import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";

import { supabase } from "api/supabase";
import { Modal } from "components/modals";
import { useModalStore } from "store";

interface Inputs {
  title: string;
  textarea: string;
  file: FileList;
}
export const Post = () => {
  const navigate = useNavigate();
  const { onOpenModal } = useModalStore((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();
  const isNotPassTitle = errors.title?.type === "maxLength";
  const isNotPassTextarea = errors.textarea?.type === "maxLength";
  const title = watch("title") ?? 0;
  const textarea = watch("textarea") ?? 0;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const UUID = uuid();
    const title = data.title;
    const content = data.textarea;
    const postImg = data.file[0];

    try {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      await supabase.storage.from("Images").upload(`postImg/${UUID}`, postImg, {
        cacheControl: "3600",
        upsert: false,
      });
      await supabase.from("POSTS").insert({ id: UUID, title, content, bookmark: 0, nickname: "김진수" });
    } catch (error) {
      console.log("error", error);
    }

    navigate("/post");
  };

  const goBackHandler = () => {
    navigate(-1);
  };

  return (
    <div className="w-[1280px] mx-auto mt-[40px]">
      <div className="flex flex-col items-center">
        <p className="font-bold text-[30px]">커뮤니티</p>
        <p className="text-[#888888]">서브 텍스트입니다. 서브 텍스트입니다.</p>
        <div className="w-full border-b-2 border-[#1A1A1A]"></div>
      </div>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full border-b-2 border-[#E5E5E5] h-[72px] justify-center items-center">
          <label htmlFor="title" className="w-[40px] text-[18px] font-[400]">
            제목
          </label>
          <input
            className="w-full text-[20px] px-[24px] py-[12px] focus:outline-none"
            {...register("title", { required: true, maxLength: 50 })}
          />
        </div>
        <div className="flex justify-between mt-2">
          {isNotPassTitle ? (
            <div className="text-red-600">제목은 최대 50자 까지만 입력할 수 있습니다!</div>
          ) : (
            <div></div>
          )}
          <p className={title.length > 50 ? "text-red-600" : "text-gray-400"}>제목 글자 수: {title.length} / 50</p>
        </div>
        <button className="mt-3 ml-auto text-end" onClick={onOpenModal}>
          조합 추가하기+
        </button>
        <Modal title="인테리어 조합">
          <p className="w-[300px]">테스트</p>
        </Modal>
        <div className="w-[1280px]  h-[49px] mt-[24px] bg-[#a7a7a7] border-[2px] border-[#000]"></div>
        <textarea
          placeholder="게시물 내용을 입력하세요"
          className="w-[1280px] h-[449px] border-[2px] border-[#000] focus:outline-none p-[20px] text-[25px]"
          {...register("textarea", { required: true, maxLength: 1000 })}
        />
        <div className="flex justify-between mt-2">
          {isNotPassTextarea ? <div className="text-red-600">내용은 1000자 이내로 작성해 주세요!</div> : <div></div>}
          <p className={textarea.length > 1000 ? "text-red-600" : "text-gray-400"}>
            내용 글자 수: {textarea.length} / 1000
          </p>
        </div>
        <div className="flex w-full border-b-2 border-[#E5E5E5] h-[72px] justify-center items-center">
          <label htmlFor="img" className="w-[128px] text-[18px] font-[400]">
            파일첨부
          </label>
          <input
            type="file"
            className="w-full text-[24px] px-[24px] py-[12px] focus:outline-none"
            {...register("file")}
          />
        </div>
        <div className="flex self-end gap-[24px] mt-[40px]">
          <button type="button" className="bg-[#888888] w-[112px] h-[48px] px-[24px]" onClick={goBackHandler}>
            이전으로
          </button>
          <button type="submit" className="bg-[#5D5D5D] w-[112px] h-[48px] px-[24px]">
            글쓰기
          </button>
        </div>
      </form>
    </div>
  );
};
