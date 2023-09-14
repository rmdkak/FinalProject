import { useState, Fragment, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

import { STORAGE_URL } from "api/supabase/supabaseClient";
import { ArrowButton, DateConvertor } from "components";
import { useAdminQuery } from "hooks/useAdminQuery";

interface Props {
  setLength: Dispatch<SetStateAction<number>>;
}

interface Input {
  adminAnswer: string;
}

export const manToManCategory = ["문의", "칭찬", "제안", "불만"];

const ManToMan = ({ setLength }: Props) => {
  const { fetchManToManMutation, deleteManToManMutation, patchManToManMutation } = useAdminQuery();
  const { data: manToManData } = fetchManToManMutation;

  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [isOpenAnswer, setIsOpenAnswer] = useState<string>();

  const { register, handleSubmit, reset } = useForm<Input>();

  useEffect(() => {
    if (manToManData !== undefined) {
      setLength(manToManData?.length);
    }
  }, [manToManData]);

  const onSubmit: SubmitHandler<Input> = (data) => {
    const { adminAnswer } = data;
    const patchData = { id: isOpenAnswer, adminAnswer, isCheck: true };
    patchManToManMutation.mutate(patchData);
    reset();
    setIsOpenAnswer(undefined);
  };

  const toggleHandler = (target: string) => {
    currentCategory === target ? setCurrentCategory("") : setCurrentCategory(target);
  };

  const deleteManToManHandler = (postId: string) => {
    deleteManToManMutation.mutate(postId);
  };

  if (manToManData === undefined) return <p>문의가 없습니다.</p>;

  const inquireLength = manToManData.filter((data) => data.category === manToManCategory[0]).length;
  const praiseLength = manToManData.filter((data) => data.category === manToManCategory[1]).length;
  const proposalLength = manToManData.filter((data) => data.category === manToManCategory[2]).length;
  const discontentLength = manToManData.filter((data) => data.category === manToManCategory[3]).length;

  return (
    <div className="w-full flex-column">
      {manToManCategory.map((category) => {
        return (
          <ul key={category} className="items-center justify-center w-full mb-3 align-middle flex-column">
            <div
              className="flex w-full px-5 border-b border-black cursor-pointer h-14 body-1 contents-center"
              onClick={() => {
                toggleHandler(category);
              }}
            >
              <p className="flex items-center w-full ">{category}</p>
              {manToManCategory[0] === category && <p className="w-10">{inquireLength}</p>}
              {manToManCategory[1] === category && <p className="w-10">{praiseLength}</p>}
              {manToManCategory[2] === category && <p className="w-10">{proposalLength}</p>}
              {manToManCategory[3] === category && <p className="w-10">{discontentLength}</p>}
              <ArrowButton
                isOpen={currentCategory === category}
                openHandler={toggleHandler}
                className="w-10"
                statusToClose={""}
                statusToOpen={category}
              />
            </div>
            {manToManData.map((manToMan) => {
              return (
                <Fragment key={manToMan.id}>
                  {currentCategory === category && manToMan.category === category && (
                    <li className="w-full px-4 py-3 border-b flex-column border-gray05">
                      <div className="flex items-center justify-between">
                        <pre className="w-[750px] my-2 break-words whitespace-pre-wrap">{manToMan.content}</pre>
                        <div className="flex gap-3">
                          {manToMan.isCheck && <p className="px-2 bg-green-300 rounded-md">답변완료</p>}
                          <p>{manToMan.USERS?.name}</p>
                          <DateConvertor datetime={manToMan.created_at} type={"dotDate"} />
                          <button
                            className="px-3 rounded-lg point-button "
                            type="button"
                            onClick={() => {
                              setIsOpenAnswer(manToMan.id);
                            }}
                          >
                            답변하기
                          </button>
                          <button
                            className="px-3 rounded-lg gray-outline-button"
                            type="button"
                            onClick={() => {
                              deleteManToManHandler(manToMan.id);
                            }}
                          >
                            삭제하기
                          </button>
                        </div>
                      </div>
                      {manToMan.inquiryImg !== null && (
                        <img
                          className="self-center h-auto w-[300px] m-3 p-3"
                          src={`${STORAGE_URL}${manToMan.inquiryImg}`}
                          alt="첨부 이미지"
                        />
                      )}
                      {isOpenAnswer === manToMan.id && (
                        <form
                          className="gap-3 p-3 border flex-column border-gray03 rounded-xl"
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          <textarea {...register("adminAnswer")} className="resize-none auth-input h-60" />
                          <button className="auth-button point-button" type="submit">
                            보내기
                          </button>
                          <button
                            className="auth-button gray-outline-button"
                            type="button"
                            onClick={() => {
                              setIsOpenAnswer(undefined);
                            }}
                          >
                            닫기
                          </button>
                        </form>
                      )}
                    </li>
                  )}
                </Fragment>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
};

export default ManToMan;
