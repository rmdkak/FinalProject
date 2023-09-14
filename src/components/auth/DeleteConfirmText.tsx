export const DeleteConfirmText = () => {
  return (
    <div className="flex-column contents-center">
      <p className="w-[400px] pb-6 border-b border-black title-4 font-medium">회원탈퇴</p>
      <p className="mt-4 text-black body-2">그동안 Stile을 이용해주셔서 감사합니다.</p>
      <p className="mt-3 body-3 text-gray02 sm:w-1/2 sm:break-keep">
        게시글 및 댓글은 탈퇴시 자동삭제 되지 않고 남아있습니다.
      </p>
      <p className="body-3 text-gray02 sm:w-1/2 sm:break-keep sm:mt-2">
        삭제를 원하시는 게시글이 있다면 탈퇴전에 삭제하시기 바랍니다.
      </p>
    </div>
  );
};
