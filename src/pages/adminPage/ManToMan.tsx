import { useState, Fragment } from "react";
// 테스트 데이터
const manToManCategory = ["커뮤니티 이용", "인테리어 조합 이용"];

const manToManData = [
  {
    id: "asdfasdfasdfasdf",
    created_at: "2023-09-08",
    category: "커뮤니티 이용",
    content: "커뮤니티 문의 글입니다1111111.",
    inquiryImg: "asdfasdf",
    userId: "asdflajsdlfj",
    isCheck: false,
    adminAnswer: "저렇게 사용하면 됩니다.",
  },
  {
    id: "asdfasdfasdfas2123df",
    created_at: "2023-09-08",
    category: "커뮤니티 이용",
    content: "커뮤니티 문의 글입니다222222.",
    inquiryImg: "asdfasadsf",
    userId: "asdflajsdlfassdasj",
    isCheck: false,
    adminAnswer: "저1111렇게 사용하면 됩니다.",
  },
  {
    id: "asdfasdfasdfasdf123123",
    created_at: "2023-09-08",
    category: "인테리어 조합 이용",
    content: "인테리어 문의 글입니다.1111111111.",
    inquiryImg: "asdfasdasdasdasff",
    userId: "asdflajsaddlf12123j",
    isCheck: false,
    adminAnswer: "이렇게 사용하면 됩니다.",
  },
];

export const ManToMan = () => {
  const [currentCategory, setCurrentCategory] = useState<string>();

  return (
    <div className="w-full flex-column">
      {manToManCategory.map((category) => {
        return (
          <ul
            key={category}
            className="items-center justify-center w-full gap-3 mb-3 align-middle flex-column"
            onClick={() => {
              setCurrentCategory(category);
            }}
          >
            <p className="w-full border-b-2 border-black cursor-pointer h-14 body-1">{category}</p>
            {manToManData.map((manToMan) => {
              return (
                <Fragment key={manToMan.id}>
                  {currentCategory === category && manToMan.category === category && (
                    <li className="flex items-center justify-between w-full h-10 px-4 py-1 border-b border-gray03">
                      <p className="">{manToMan.content}</p>
                      <div className="flex gap-3">
                        <button className="px-3 rounded-lg point-button ">답변하기</button>
                        <button className="px-3 rounded-lg ">삭제하기</button>
                      </div>
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
