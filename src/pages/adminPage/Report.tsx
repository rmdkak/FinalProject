import { useState } from "react";

// 테스트 데이터
const reportData = [
  {
    id: "asdfasdfasdfasdf",
    created_at: "2023-09-08",
    category: "커뮤니티 이용",
    title: "커뮤니티 어떻게 이용하나요?.",
    content: "사용방법을 모르겠어요.",
    userId: "asdflajsdlfj",
    isCheck: false,
  },
  {
    id: "asdfasdfasd123",
    created_at: "2023-09-08",
    category: "인테리어 조합 이용",
    title: "인테리어 조합 어떻게 이용하나요?.",
    content: "사용방법을 모르겠어요.",
    userId: "asdflajsdlf123j",
    isCheck: false,
  },
];

export const Report = () => {
  const [currentReport, setCurrentReport] = useState<string>();

  return (
    <ul className="w-full">
      {reportData.map((report) => {
        return (
          <li
            key={report.id}
            className="p-1 px-3 border-b border-gray02 flex-column"
            onClick={() => {
              setCurrentReport(report.id);
            }}
          >
            <p className={`${currentReport === report.id ? "border-b border-gray04" : ""} p-1 cursor-pointer`}>
              {report.title}
            </p>
            {currentReport === report.id && (
              <div className="flex items-center justify-between p-4">
                <p>{report.content}</p>
                <div className="flex gap-4">
                  <button type="button" className="px-6 py-1 rounded-lg point-button">
                    답변하기
                  </button>
                  <button type="button" className="px-6 py-1 rounded-lg gray-outline-button">
                    삭제하기
                  </button>
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};
