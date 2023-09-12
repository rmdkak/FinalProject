import { type ChangeEvent } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";

import { uploadManToManImg } from "api/supabase/admin";
import { MypageTitle } from "components";
import { useAdminQuery } from "hooks/useAdminQuery";
import { useMovePage } from "hooks/useMovePage";
import { useAuthStore } from "store";

interface Input {
  category: string;
  content: string;
  imgFile: FileList;
}

export const Inquiry = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, reset } = useForm<Input>();
  const { getCurrentPathname } = useMovePage();
  const { addManToManMutation } = useAdminQuery();

  const { currentUserId } = useAuthStore();
  if (currentUserId === undefined) {
    navigate("/");
    return <></>;
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue("category", event.target.value);
  };

  const userId = currentUserId;
  const onSubmit: SubmitHandler<Input> = async (data) => {
    const { category, content } = data;
    const imgFile = data.imgFile[0];
    const UUID = uuid();
    const postValue = {
      category,
      content,
      userId,
      isCheck: false,
      inquiryImg: imgFile === undefined ? null : `/inquiryImg/${UUID}`,
    };

    if (imgFile !== undefined) {
      await uploadManToManImg({ UUID, imgFile });
    }

    addManToManMutation.mutate(postValue);
    reset();
    getCurrentPathname();
  };

  const categoryRadio = { name: "category", type: "radio" };
  return (
    <div className="w-[1280px] mx-auto my-10 pb-10 ">
      <MypageTitle title="1 : 1 문의하기" isBorder={true} />
      <form onSubmit={handleSubmit(onSubmit)} className="gap-5 px-5 flex-column contents-center">
        <div className="flex w-full gap-4 pb-3 mt-5 border-b-2 border-gray03">
          <label className="flex gap-2" htmlFor="inquire">
            문의
            <input
              {...register("category", { onChange })}
              {...categoryRadio}
              defaultChecked
              value="문의"
              id="inquire"
            />
          </label>
          <label className="flex gap-2" htmlFor="praise">
            칭찬
            <input {...register("category", { onChange })} {...categoryRadio} value="칭찬" id="praise" />
          </label>
          <label className="flex gap-2" htmlFor="proposal">
            제안
            <input {...register("category", { onChange })} {...categoryRadio} value="제안" id="proposal" />
          </label>
          <label className="flex gap-2" htmlFor="discontent">
            불만
            <input {...register("category", { onChange })} {...categoryRadio} value="불만" id="discontent" />
          </label>
        </div>
        <div className="w-full">
          <label htmlFor="content">내용</label>
          <textarea {...register("content")} id="content" className="resize-none auth-input h-28" />
        </div>
        <div className="flex items-center justify-center w-full h-16 border-y border-gray06">
          <label htmlFor="img" className="w-32 font-normal body-3">
            첨부파일
          </label>
          <input
            type="file"
            accept="image/png, image/jpeg, image/gif"
            className="w-full body-3 focus:outline-none"
            {...register("imgFile")}
          />
        </div>
        <button className="point-button auth-button">작성하기</button>
      </form>
    </div>
  );
};
