import { useState } from "react";
import toast from "react-simple-toasts";

import { Select } from "components";
import { useAdminQuery } from "hooks/useAdminQuery";
import { useModalStore } from "store";
import { type Tables } from "types/supabase";

interface ReportProps {
  currentUserId: string | undefined;
  postData: Tables<"POSTS", "Row">;
}

export const ReportForm = ({ currentUserId, postData }: ReportProps) => {
  const [reportSelected, setReportSelected] = useState<string | undefined>();
  const [reportComment, setReportComment] = useState<string>("");

  const { onCloseModal } = useModalStore();
  const { addReportMutation } = useAdminQuery();

  const autoResizeTextArea = (element: HTMLTextAreaElement) => {
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
    setReportComment(element.value);
  };

  const updateCommentHandler = () => {
    if (currentUserId === undefined) return;
    if (reportSelected === undefined) {
      toast("신고 항목을 선택해주세요.", { theme: "failure", zIndex: 9999 });
      return;
    }
    if (reportComment === "") {
      toast("댓글은 1글자 이상 입력해주세요.", { theme: "failure", zIndex: 9999 });
      return;
    }
    const reportData = {
      category: reportSelected,
      content: reportComment,
      postTitle: postData.title,
      postContent: postData.content,
      postImg: postData.postImage,
      postId: postData.id,
      userId: currentUserId,
    };

    addReportMutation.mutate(reportData);
    onCloseModal();
    toast("신고가 접수되었습니다.", { theme: "plain", zIndex: 9999 });
  };

  return (
    <div className="flex-column w-[600px] gap-5">
      <Select
        option={[
          "나체 이미지 또는 성적 행위",
          "폭력적인 또는 위험한 발언, 혐오 발언 또는 상징",
          "사기 또는 거짓, 불법 또는 상품 판매",
          "따돌림 또는 괴롭힘",
          "지식재산권 침해",
          "자살 또는 침해",
          "계정이 해킹당했을 수 있음",
          "마음에 들지 않습니다",
        ]}
        placeholder={"신고 사유 항목을 선택해주세요."}
        selfEnterOption={false}
        selectedValue={reportSelected}
        setSelectedValue={setReportSelected}
      />
      <textarea
        rows={5}
        maxLength={500}
        onChange={(e) => {
          autoResizeTextArea(e.target);
        }}
        className="py-1 px-2 w-full rounded-lg border border-gray05 text-[14px] outline-none resize-none"
      />
      <button
        onClick={() => {
          updateCommentHandler();
        }}
        className="py-2 text-black rounded-lg bg-point"
      >
        신고
      </button>
    </div>
  );
};
