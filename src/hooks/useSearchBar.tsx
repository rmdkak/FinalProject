import { useState, type ChangeEvent } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

interface Props {
  dataList: any[] | undefined;
  type: "comment" | "post" | "like";
  isUseMypage?: boolean;
}

interface Input {
  searchKeyword?: string;
  min: string | undefined;
  max?: string | undefined;
}

export const useSearchBar = ({ dataList, type, isUseMypage = false }: Props) => {
  const [selectedOption, setSelectedOption] = useState("선택하세요");

  const [conditionWord, setConditionWord] = useState<string>();
  const [searchCategory, setSearchCategory] = useState<string>("title");

  const { register, handleSubmit } = useForm<Input>();

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1);

  switch (selectedOption) {
    case "선택하세요":
      currentDate.setFullYear(currentDate.getFullYear() - 10);
      break;
    case "1일":
      currentDate.setDate(currentDate.getDate() - 1);
      break;
    case "1주일":
      currentDate.setDate(currentDate.getDate() - 7);
      break;
    case "1개월":
      currentDate.setMonth(currentDate.getMonth() - 1);
      break;
    case "3개월":
      currentDate.setMonth(currentDate.getMonth() - 3);
      break;
    case "6개월":
      currentDate.setMonth(currentDate.getMonth() - 6);
      break;
    case "1년":
      currentDate.setFullYear(currentDate.getFullYear() - 1);
      break;
    default:
      break;
  }

  // const dataDate = new Date(data.created_at);
  const timeFilteredData =
    dataList === undefined ? [] : dataList.filter((data) => new Date(data.created_at) >= currentDate);

  // 검색 조건 필터링
  const filteredData = timeFilteredData.filter((data) => {
    if (conditionWord === undefined) return data;
    switch (type) {
      case "post":
        return data[searchCategory].includes(conditionWord);
      case "comment":
        if (searchCategory === "content") return data[searchCategory].includes(conditionWord);
        else return data.POSTS[searchCategory].includes(conditionWord);
      case "like":
        return data.POSTS[searchCategory].includes(conditionWord);
      default:
        return data;
    }
  });

  const changMonthOption = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const changeSearchCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchCategory(event.target.value);
  };

  const searchOnKeywordHandler: SubmitHandler<Input> = (data) => {
    setConditionWord(data.searchKeyword);
  };

  const SearchBar = () => {
    return (
      <div className="flex gap-[22px]">
        <form onSubmit={handleSubmit(searchOnKeywordHandler)} className="flex items-center gap-3">
          <select
            value={selectedOption}
            onChange={changMonthOption}
            name="month"
            className="w-[100px] h-8 px-[10px] gray-outline-button rounded-md text-gray02 body-4"
          >
            <option value={"선택하세요"}>선택하세요</option>
            <option value={"1일"}>1일</option>
            <option value={"1주일"}>1주일</option>
            <option value={"1개월"}>1개월</option>
            <option value={"3개월"}>3개월</option>
            <option value={"6개월"}>6개월</option>
            <option value={"1년"}>1년</option>
          </select>

          <select
            value={searchCategory}
            onChange={changeSearchCategory}
            className="w-[100px] h-8 px-[10px] gray-outline-button rounded-md text-gray02 body-4"
          >
            <option value={"title"}>제목</option>

            {type === "post" && isUseMypage ? null : <option value={"nickname"}>글 작성자</option>}

            {type === "comment" ? (
              <option value={"content"}>댓글 내용</option>
            ) : (
              <option value={"content"}>내용</option>
            )}
          </select>
          <input
            {...register("searchKeyword")}
            type="text"
            className="w-[180px] h-8 px-2 gray-outline-button rounded-md text-gray02 body-4"
          />
          <button className="w-16 h-8 rounded-md gray-outline-button text-gray02 body-4">검색</button>
        </form>
      </div>
    );
  };

  return { SearchBar, filteredData };
};
