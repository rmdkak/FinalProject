import { useState } from "react";

import { type Tables } from "types/supabase";

interface Props {
  data: Array<Tables<"REPORT", "Row">> | undefined;
}

export const Report = ({ data: reportData }: Props) => {
  const [currentReport, setCurrentReport] = useState<string>();

  if (reportData === undefined) return <p>신고가 없습니다.</p>;

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
