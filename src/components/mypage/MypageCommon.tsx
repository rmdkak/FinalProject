type dataType = "post" | "comment" | "bookmark" | "like"

interface Props {
  type: dataType
}

export const MypageTitle = () => {
  return (
    <div className="w-full  text-center pb-[24px]">
      <h3 className="text-[32px] font-normal leading-[130%]">마이페이지</h3>
    </div>
  )
}
export const MypageSubTitle = ({ type }: Props) => {
  const titleText = (type: dataType) => {
    switch (type) {
      case "post":
        return "내가 쓴 글"
      case "comment":
        return "내가 쓴 댓글"
      case "bookmark":
        return "북마크"
      case "like":
        return "좋아요 누른 글"
    }
  }
  return (
    <div className="w-full border-b border-b-black pb-[24px]">
      <p>{titleText(type)}</p>
    </div>
  )
}

export const SearchBar = () => {
  return (
    <div className="flex gap-[16px]">
      <div className="flex items-center gap-[8px]">
        <select className="w-[80px] h-[32px] px-[10px] border border-gray05 rounded-[4px] text-gray02 text-[12px] font-normal leading-[150%]">
          <option>1개월</option>
          <option>3개월</option>
          <option>6개월</option>
        </select>
        <p className="flex contents-center w-[80px] h-[32px] px-[10px] py-auto border border-gray05 rounded-[4px] text-gray02 text-[12px] font-normal leading-[150%]">
          직접설정
        </p>
        <input
          type="date"
          className="w-[120px] h-[32px] px-[10px] border border-gray05 rounded-[4px] text-gray02 text-[12px] font-normal leading-[150%]"
        />
        <p>-</p>
        <input
          type="date"
          className="w-[120px] h-[32px] px-[10px] border border-gray05 rounded-[4px] text-gray02 text-[12px] font-normal leading-[150%]"
        />
      </div>
      <div className="flex items-center gap-[8px]">
        <select className="w-[100px] h-[32px] px-[10px] border border-gray05 rounded-[4px] text-gray02 text-[12px] font-normal leading-[150%]">
          <option>제목</option>
          <option>작성자</option>
          <option>내용</option>
        </select>
        <input
          type="text"
          className="w-[180px] h-[32px] border border-gray05 rounded-[4px] text-gray02 text-[12px] font-normal leading-[150%]"
        />
        <button className="w-[64px] h-[32px] border border-gray05 rounded-[4px] text-gray02 text-[12px] font-normal leading-[150%]">
          검색
        </button>
      </div>
    </div>
  )
}