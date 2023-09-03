import { useState, type ChangeEvent } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

interface Props {
  dataList: any[];
  type: "comment" | "post" | "like";
  isUseMypage?: boolean;
}

interface Input {
  searchKeyword?: string;
  min: string | undefined;
  max?: string | undefined;
}

const date = new Date();
const nowYear = `${date.getFullYear()}`;
const nowMonth = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
const nowDay = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;

export const useSearchBar = ({ dataList, type, isUseMypage = false }: Props) => {
  // 시간 조건 State
  const [selectDate, setSelectDate] = useState<number>(0);
  // 키워드 검색 조건 State
  const [conditionWord, setConditionWord] = useState<string>();
  // 키워드 검색 카테고리 State
  const [category, setCategory] = useState<string>("title");
  const { register, watch, handleSubmit, resetField } = useForm<Input>();

  // 날짜 가공 함수
  const refactorDate = (date: string | undefined) => {
    if (date === undefined) return;
    const prevYear = Number(date.slice(0, 4));
    const prevMonth = Number(date.slice(5, 7));
    const prevDay = Number(date.slice(8, 10));
    return Number(
      `${prevYear}${prevMonth < 10 ? `0${prevMonth}` : prevMonth}${prevDay < 10 ? `0${prevDay}` : prevDay}`,
    );
  };

  // 현재 날짜 가공 결과
  const nowDate = refactorDate(`${nowYear}-${nowMonth}-${nowDay}`);
  const minDate = refactorDate(watch("min"));
  const maxDate = refactorDate(watch("max"));

  // 시간 조건 필터링
  const timeFilteredData =
    dataList === undefined
      ? undefined
      : dataList.filter((data) => {
          const dataDate = refactorDate(data.created_at);

          if (dataDate === undefined || nowDate === undefined || minDate === undefined || maxDate === undefined)
            return data;

          if (minDate !== 0 && maxDate !== 0) return minDate <= dataDate && dataDate <= maxDate;
          else return selectDate <= dataDate && dataDate <= nowDate;
        });

  // 검색 조건 필터링
  const filteredData =
    timeFilteredData === undefined
      ? undefined
      : timeFilteredData.filter((data) => {
          if (conditionWord === undefined) return data;
          switch (type) {
            case "post":
              return data[category].includes(conditionWord);
            case "comment":
              if (category === "content") return data[category].includes(conditionWord);
              else return data.POSTS[category].includes(conditionWord);
            case "like":
              return data.POSTS[category].includes(conditionWord);
            default:
              return data;
          }
        });

  const changMonthOption = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectMonth = Number(event.target.value);
    const refactorMonth = Number(nowMonth) - selectMonth < 10 ? `0${Number(nowMonth) - selectMonth}` : selectMonth;

    const conditionDate = refactorDate(`${nowYear}-${refactorMonth}-${nowDay}`);

    if (conditionDate === undefined) return;
    setSelectDate(conditionDate);
  };

  const changeCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const onSubmit: SubmitHandler<Input> = (data) => {
    const { searchKeyword } = data;
    setConditionWord(searchKeyword);
  };

  const resetFilter = () => {
    setSelectDate(0);
    setConditionWord(undefined);
    resetField("searchKeyword");
    setCategory("title");
  };

  const SearchBar = () => {
    return (
      <div className="flex gap-[16px]">
        <div className="flex items-center gap-[8px]">
          <select
            onChange={changMonthOption}
            name="month"
            className="w-[100px] h-[32px] px-[10px] border border-gray05 rounded-[4px] text-gray02 text-[12px] font-normal leading-[150%]"
          >
            <option value={1}>1개월</option>
            <option value={3}>3개월</option>
            <option value={6}>6개월</option>
          </select>
          <p className="flex contents-center w-[80px] h-[32px] px-[10px] py-auto border border-gray05 rounded-[4px] text-gray02 text-[12px] font-normal leading-[150%]">
            직접설정
          </p>
          <input
            type="date"
            {...register("min")}
            className="w-[120px] h-[32px] px-[10px] border border-gray05 rounded-[4px] text-gray02 text-[12px] font-normal leading-[150%]"
          />
          <p>-</p>
          <input
            type="date"
            {...register("max")}
            className="w-[120px] h-[32px] px-[10px] border border-gray05 rounded-[4px] text-gray02 text-[12px] font-normal leading-[150%]"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-[8px]">
          <select
            onChange={changeCategory}
            value={category}
            className="w-[100px] h-[32px] px-[10px] border border-gray05 rounded-[4px] text-gray02 text-[12px] font-normal leading-[150%]"
          >
            <option value={"title"}>제목</option>
            {/* {type === "post" ? <option value={"title"}>제목</option> : <option value={"title"}>글 제목</option>} */}

            {type === "post" && isUseMypage ? null : <option value={"nickname"}>작성자</option>}

            {type === "comment" ? (
              <option value={"content"}>댓글 내용</option>
            ) : (
              <option value={"content"}>내용</option>
            )}
          </select>
          <input
            {...register("searchKeyword")}
            type="text"
            className="w-[180px] h-[32px] border border-gray05 rounded-[4px] text-gray02 text-[12px] font-normal leading-[150%]"
          />
          <button className="w-[64px] h-[32px] border border-gray05 rounded-[4px] text-gray02 text-[12px] font-normal leading-[150%]">
            검색
          </button>
          <button
            onClick={resetFilter}
            className="w-[64px] h-[32px] border border-gray05 rounded-[4px] text-gray02 text-[12px] font-normal leading-[150%]"
          >
            초기화
          </button>
        </form>
      </div>
    );
  };

  return { SearchBar, filteredData };
};
