/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useEffect, useState } from "react";
import { AiOutlineCamera, AiFillCloseCircle } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import uuid from "react-uuid";

import { supabase, storageUrl } from "api/supabase";
import { DateConvertor } from "components/date";
import { useAuthStore } from "store";
import { type Tables } from "types/supabase";

type commentsType = Tables<"COMMENTS", "Row">;
interface CommentWithUser extends commentsType {
  user: {
    avatar_url: string;
    name: string;
  };
}
export const Detail = () => {
  const { currentSession } = useAuthStore();
  const { id: paramsId } = useParams();
  const [comment, setComment] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const textAreaMaxLength = 3000;
  const navigate = useNavigate();
  const [postData, setPostData] = useState<Tables<"POSTS", "Row">>();
  const [commentsData, setCommentsData] = useState<CommentWithUser[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: postData } = await supabase.from("POSTS").select("*").eq("id", paramsId).single();
      const { data: commentsData } = await supabase.from("COMMENTS").select("*").eq("postId", paramsId);
      if (postData !== null) setPostData(postData);

      if (commentsData !== null) {
        const commentsWithUserData = await Promise.all(
          commentsData.map(async (comment) => {
            const userData = await fetchUserById(comment.writtenId);
            if (userData == null) return;
            return { ...comment, user: userData };
          }),
        );
        const filteredCommentsWithUserData = commentsWithUserData.filter(
          (comment): comment is CommentWithUser => comment !== null,
        );
        setCommentsData(filteredCommentsWithUserData);
      }
    };
    fetchData().catch((error) => {
      console.error("Error fetching data:", error.message);
    });
  }, []);

  async function fetchUserById(userId: string) {
    const { data, error } = await supabase.from("USERS").select("avatar_url, name").eq("id", userId).single();
    if (error != null) {
      console.error("Error fetching user data:", error.message);
      return null;
    }
    return data;
  }

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (currentSession == null) {
      alert("로그인 후 이용해주세요.");
      return;
    }
    if (value.length <= textAreaMaxLength) {
      setComment(value);
    } else {
      alert(`글자 수 제한(${textAreaMaxLength}자)을 초과했습니다.`);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file != null) {
      setSelectedImage(file);
    }
  };

  const handleImageCancel = () => {
    setSelectedImage(null);
  };

  const autoResizeTextArea = (element: HTMLTextAreaElement) => {
    element.style.height = "auto";
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    element.style.height = element.scrollHeight + "px";
  };

  const movePageHandler = (moveEvent: string) => {
    switch (moveEvent) {
      case "back":
        navigate(-1);
        break;
      case "community":
        navigate("/community");
        break;
    }
  };
  const createCommentHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const userId = currentSession?.user.id;
    const UUID = uuid();
    const hasCommentImgStatus = selectedImage == null ? null : `/commentImg/${UUID}`;
    try {
      if (selectedImage != null) {
        const { data, error } = await supabase.storage.from("Images").upload(`/commentImg/${UUID}`, selectedImage, {
          cacheControl: "3600",
          upsert: false,
        });
        console.log("error :", error);
        console.log("data :", data);
      }
      if (paramsId == null) return;
      if (userId == null) return;
      await supabase.from("COMMENTS").insert([
        {
          id: UUID,
          writtenId: userId,
          content: comment,
          postId: paramsId,
          commentImg: hasCommentImgStatus,
        },
      ]);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    // 상위 배너 영역
    <div className="w-[1200px] mx-auto mt-[30px]">
      <div className="flex flex-col items-center">
        <p className="font-bold text-[30px]">커뮤니티</p>
        <p className="text-[#888888]">서브 텍스트입니다. 서브 텍스트입니다.</p>
        <div className="w-full border-b-2 border-[#1A1A1A] mt-[40px]"></div>
      </div>
      {/* 게시물 헤더 영역 */}
      <div className="flex justify-between border-b-2 border-[#E5E5E5] mt-5 p-2">
        <div className="w-[1000px]">
          <label htmlFor="title" className="text-[18px] font-semibold">
            {postData?.title}
          </label>
          <div className="flex my-2 gap-2 text-[#888888]">
            <a>{postData?.nickname}</a>
            <DateConvertor datetime={postData?.created_at as string} type="dotDate" />
            <p>북마크: {postData?.bookmark}</p>
          </div>
        </div>
        <button className="bg-[#5D5D5D] h-[48px] px-[24px] text-[#fff]">북마크 버튼</button>
      </div>
      {/* 컨텐츠 영역 */}
      <div className="flex flex-col gap-5 my-[60px]">
        {postData?.postImage !== null && (
          <img src={`${storageUrl}${postData?.postImage}`} alt="postImg" className="w-full" />
        )}
        {postData?.leftWallpaperId !== null && postData?.tileId !== null && (
          <div className="flex">
            <img
              src={`${storageUrl}/wallpaper/${postData?.leftWallpaperId}`}
              alt="벽지"
              className="w-[150px] h-[150px]"
            />
            <img src={`${storageUrl}/tile/${postData?.tileId}`} alt="바닥" className="w-[150px] h-[150px]" />
          </div>
        )}
        <p>{postData?.content}</p>
      </div>
      {/* 댓글영역 */}
      <div className="border-t-2 border-[#E5E5E5]">
        <div className="flex gap-3 my-5">
          <p className="font-semibold text-[20px]">댓글</p>
          <button>등록순</button>
          <button>최신순</button>
        </div>
        <div className="flex flex-col gap-5">
          {commentsData?.map((comment) => {
            return (
              <div key={comment.id}>
                <div className="flex border-b-2 border-[#E5E5E5] pb-[15px]">
                  <img src={comment.user.avatar_url} alt="profileImg" className="w-[50px] h-[50px]" />
                  <div className="flex flex-col gap-1 ml-3">
                    <div className="flex gap-2">
                      <p className="font-semibold">{comment.user.name}</p>
                      {postData?.userId === comment.writtenId && (
                        <div className="px-[5px] text-red-500 border border-red-500 rounded-xl w-[55px]">작성자</div>
                      )}
                    </div>
                    <p>{comment.content}</p>
                    {comment.commentImg != null && (
                      <img src={`${storageUrl}${comment.commentImg}`} className="my-[20px]" />
                    )}
                    <div className="flex gap-2 text-[#888888]">
                      <a>
                        <DateConvertor datetime={comment.created_at} type="timeAgo" />
                      </a>
                      <a>
                        <DateConvertor datetime={comment?.created_at} type="hourMinute" />
                      </a>
                      <button>답글쓰기</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* 댓글 입력 영역 */}
        <div className="w-full border-2 border-[#E5E5E5] p-5">
          <div className="flex justify-between">
            <p className="font-semibold text-[20px]">
              {currentSession != null
                ? currentSession?.user.user_metadata.name
                : "댓글 기능을 이용하시려면 로그인 해주세요."}
            </p>
            <div className="flex justify-end text-gray-400">
              {comment.length}/{textAreaMaxLength}자
            </div>
          </div>
          <form onSubmit={createCommentHandler}>
            <textarea
              value={comment}
              onChange={(e) => {
                handleTextAreaChange(e);
                autoResizeTextArea(e.target);
              }}
              placeholder="댓글을 남겨보세요."
              className="w-full text-[20px] py-[12px] focus:outline-none"
            />
            <div className="flex justify-between">
              {/* 댓글 이미지 */}
              {selectedImage == null && (
                <label htmlFor="imageInput">
                  <AiOutlineCamera className="text-gray-400 cursor-pointer text-[40px]" />
                  <input type="file" id="imageInput" className="hidden" onChange={handleImageChange} />
                </label>
              )}
              {selectedImage != null && (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    className="object-cover cursor-pointer w-[100px] h-[100px]"
                    onClick={handleImageCancel}
                  />
                  <div className="absolute bottom-[70px] left-[70px]">
                    <AiFillCloseCircle
                      className="text-[25px] text-[#727272c5] cursor-pointer"
                      onClick={handleImageCancel}
                    />
                  </div>
                </div>
              )}
              <button type="submit" className="bg-[#DDDDDD] h-[48px] px-[24px] text-[#7c7c7c] rounded-lg">
                등록
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-between mt-[40px]">
        <button
          type="button"
          className="bg-[#DDDDDD] h-[48px] px-[24px] text-[#7c7c7c] mr-5"
          onClick={() => {
            movePageHandler("back");
          }}
        >
          이전으로
        </button>
        <button
          className="bg-[#5D5D5D] h-[48px] px-[24px] text-[#fff]"
          onClick={() => {
            movePageHandler("community");
          }}
        >
          커뮤니티 목록
        </button>
      </div>
    </div>
  );
};
