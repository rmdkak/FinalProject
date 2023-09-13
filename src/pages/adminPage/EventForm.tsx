import { type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-simple-toasts";
import uuid from "react-uuid";

import { uploadEventImg } from "api/supabase/admin";
import { useAdminQuery } from "hooks/useAdminQuery";
import { useAuthStore } from "store";

interface Inputs {
  title: string;
  content: string;
  file: FileList;
  minDate: string;
  maxDate: string;
}

const TEXTAREA_PLACEHOLDER = `이벤트 내용 or 서브 타이틀 내용을 입력하세요. 작성 양식을 반드시 따라주세요
예시)
서브타이틀 내용

본문 내용`;

export const EventForm = () => {
  const { currentUserId } = useAuthStore();
  const { addEventMutation } = useAdminQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { title, content, minDate, maxDate } = data;
    const UUID = uuid();
    const eventImgFile = data.file[0];
    const eventImg = `/eventImg/${UUID}`;
    const userId = currentUserId;

    const eventData = {
      title,
      content,
      eventImg,
      userId,
      minDate: minDate === "" ? null : minDate,
      maxDate: maxDate === "" ? null : maxDate,
    };

    if ((data.minDate !== "" && data.maxDate === "") || (data.minDate === "" && data.maxDate !== "")) {
      setError("minDate", { message: "이벤트 날짜는 하나만 들어갈 수 없습니다." });
      toast("이벤트 날짜는 하나만 들어갈 수 없습니다.", { theme: "failure", zIndex: 9999 });
      return;
    }

    try {
      await uploadEventImg({ UUID, eventImgFile });

      addEventMutation.mutate(eventData);
      toast("작성이 완료되었습니다.", { theme: "warning", zIndex: 9999 });
    } catch (error) {
      toast("작성에 실패하였습니다.", { theme: "failure", zIndex: 9999 });
      console.error("onSubmitError", error);
    }
    reset();
  };

  return (
    <>
      <form className="w-full flex-column" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-[24px] font-normal mb-5">이벤트 작성</h1>
        <div className="flex items-center justify-center">
          <input
            placeholder="타이틀 내용을 입력하세요."
            className="w-full h-[48px] text-[18px] px-[24px] py-[12px] border border-gray05 focus:outline-none"
            {...register("title", {
              required: "이벤트 제목을 입력하세요.",
              maxLength: { value: 100, message: "100자를 넘을 수 없습니다." },
            })}
          />
        </div>
        <p className="mb-5 text-error">{errors.title?.message}</p>
        <textarea
          placeholder={TEXTAREA_PLACEHOLDER}
          className="h-[400px] border border-gray05 focus:outline-none p-[20px] text-[18px] resize-none"
          {...register("content", {
            required: "이벤트 내용을 입력하세요.",
            maxLength: { value: 1000, message: "1000자를 넘을 수 없습니다." },
          })}
        />
        <p className="mb-5 text-error">{errors.content?.message}</p>

        <div className="flex w-full border-y border-gray06 h-[72px] justify-center items-center mt-[20px]">
          <label htmlFor="img" className="w-[128px] text-sm font-normal">
            첨부파일
          </label>
          <input
            type="file"
            accept="image/png, image/jpeg, image/gif, image/webp"
            className="w-full text-[14px] focus:outline-none"
            {...register("file", {
              required: "이미지 파일을 넣어주세요.",
            })}
          />
        </div>
        {errors.file != null && <p className="mb-5 text-error">{errors.file.message}</p>}
        <div className="flex items-center gap-[12px] mt-10">
          <label>이벤트 기간:</label>
          <input
            type="date"
            {...register("minDate")}
            className="w-[120px] h-[32px] px-[10px] gray-outline-button rounded-[4px] text-gray02 body-4"
          />
          <p>-</p>
          <input
            type="date"
            {...register("maxDate")}
            className="w-[120px] h-[32px] px-[10px] gray-outline-button rounded-[4px] text-gray02 body-4"
          />
        </div>
        <button type="submit" className="bg-point w-[160px] h-[48px] rounded-[8px] ml-auto mt-5">
          작성하기
        </button>
      </form>
    </>
  );
};
