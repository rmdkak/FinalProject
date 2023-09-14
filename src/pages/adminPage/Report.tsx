import { useState, useEffect, Fragment } from "react";
import type { Dispatch, SetStateAction } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { STORAGE_URL } from "api/supabase/supabaseClient";
import { ArrowButton, DateConvertor } from "components";
import { useAdminQuery } from "hooks/useAdminQuery";
import { useDynamicImport } from "hooks/useDynamicImport";

const reportCategory = [
  "나체 이미지 또는 성적 행위",
  "폭력적인 또는 위험한 발언, 혐오 발언 또는 상징",
  "사기 또는 거짓, 불법 또는 상품 판매",
  "따돌림 또는 괴롭힘",
  "지식재산권 침해",
  "자살 또는 침해",
  "계정이 해킹당했을 수 있음",
  "마음에 들지 않습니다",
];

interface Props {
  setLength: Dispatch<SetStateAction<number>>;
}

interface Input {
  adminAnswer: string;
}

const Report = ({ setLength }: Props) => {
  const { fetchReportMutation, addManToManMutation, deleteReportMutation } = useAdminQuery();
  const { data: reportData } = fetchReportMutation;

  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [isOpenAnswer, setIsOpenAnswer] = useState<string>();

  const { preFetchPageBeforeEnter } = useDynamicImport();

  const { register, handleSubmit, reset } = useForm<Input>();

  useEffect(() => {
    if (reportData !== undefined) {
      setLength(reportData?.length);
    }
  }, [reportData]);

  const onSubmit: SubmitHandler<Input> = (data) => {
    const { adminAnswer } = data;
    const currentData = reportData?.find((data) => data.id === isOpenAnswer);
    if (currentData === undefined) return;

    const { category, content, userId } = currentData;

    const postData = { adminAnswer, category, content, userId };

    addManToManMutation.mutate(postData);
    reset();
  };

  const toggleHandler = (target: string) => {
    currentCategory === target ? setCurrentCategory("") : setCurrentCategory(target);
  };

  const deleteManToManHandler = (postId: string) => {
    deleteReportMutation.mutate(postId);
  };

  if (reportData === undefined) return <p>신고가 없습니다.</p>;

  const reportLength1th = reportData.filter((data) => data.category === reportCategory[0]).length;
  const reportLength2th = reportData.filter((data) => data.category === reportCategory[1]).length;
  const reportLength3th = reportData.filter((data) => data.category === reportCategory[2]).length;
  const reportLength4th = reportData.filter((data) => data.category === reportCategory[3]).length;
  const reportLength5th = reportData.filter((data) => data.category === reportCategory[4]).length;
  const reportLength6th = reportData.filter((data) => data.category === reportCategory[5]).length;
  const reportLength7th = reportData.filter((data) => data.category === reportCategory[6]).length;
  const reportLength8th = reportData.filter((data) => data.category === reportCategory[7]).length;

  return (
    <div className="w-full flex-column">
      {reportCategory.map((category) => {
        return (
          <ul key={category} className="items-center justify-center w-full mb-3 align-middle flex-column">
            <div
              className="flex w-full px-5 border-b border-black cursor-pointer h-14 body-1 contents-center"
              onClick={() => {
                toggleHandler(category);
              }}
            >
              <p className="flex items-center w-full ">{category}</p>
              {reportCategory[0] === category && <p className="w-10">{reportLength1th}</p>}
              {reportCategory[1] === category && <p className="w-10">{reportLength2th}</p>}
              {reportCategory[2] === category && <p className="w-10">{reportLength3th}</p>}
              {reportCategory[3] === category && <p className="w-10">{reportLength4th}</p>}
              {reportCategory[4] === category && <p className="w-10">{reportLength5th}</p>}
              {reportCategory[5] === category && <p className="w-10">{reportLength6th}</p>}
              {reportCategory[6] === category && <p className="w-10">{reportLength7th}</p>}
              {reportCategory[7] === category && <p className="w-10">{reportLength8th}</p>}
              <ArrowButton
                isOpen={currentCategory === category}
                openHandler={toggleHandler}
                className="w-10"
                statusToClose={""}
                statusToOpen={category}
              />
            </div>
            {reportData.map((report) => {
              return (
                <Fragment key={report.id}>
                  {currentCategory === category && report.category === category && (
                    <li className="w-full px-4 py-3 border-b flex-column border-gray05">
                      <div className="flex items-center justify-between">
                        <pre className="w-[600px] my-2 break-words whitespace-pre-wrap">{report.content}</pre>
                        <div className="flex gap-3">
                          {/* {report.isCheck && <p className="px-2 bg-green-300 rounded-md">답변완료</p>} */}
                          <p>{report.USERS?.name}</p>
                          <DateConvertor datetime={report.created_at} type={"dotDate"} />
                          <button
                            className="px-3 rounded-lg point-button "
                            type="button"
                            onClick={() => {
                              setIsOpenAnswer(report.id);
                            }}
                          >
                            답변하기
                          </button>
                          <Link
                            to={`/detail/${report.postId}`}
                            className="px-3 rounded-lg gray-outline-button"
                            onMouseEnter={async () => {
                              await preFetchPageBeforeEnter("detail");
                            }}
                          >
                            해당 페이지 이동
                          </Link>
                          <button
                            className="px-3 rounded-lg gray-outline-button"
                            type="button"
                            onClick={() => {
                              deleteManToManHandler(report.id);
                            }}
                          >
                            신고 삭제
                          </button>
                        </div>
                      </div>
                      {report.postImg !== null && (
                        <img
                          className="self-center h-auto w-[300px] m-3 p-3"
                          src={`${STORAGE_URL}${report.postImg}`}
                          alt="첨부 이미지"
                        />
                      )}
                      {isOpenAnswer === report.id && (
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
export default Report;
