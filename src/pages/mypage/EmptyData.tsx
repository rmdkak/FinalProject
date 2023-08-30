import { Link } from "react-router-dom"

type dataType = "post" | "comment" | "bookmark" | "like"

interface Props {
  type: dataType
}

export const EmptyData = ({ type }: Props) => {

  const infoText = (type: dataType) => {
    switch (type) {
      case "post":
        return "현재 작성된 게시물이 없습니다."
      case "comment":
        return "현재 작성된 댓글이 없습니다."
      case "bookmark":
        return "현재 추가된 북마크가 없습니다."
      case "like":
        return "현재 좋아요한 게시물이 없습니다."
    }
  }

  const linkSwitch = (type: dataType) => {
    switch (type) {
      case "post":
        return "/post"
      case "comment":
        return "/community"
      case "bookmark":
        return "/service"
      case "like":
        return "/community"
    }
  }

  const buttonText = (type: dataType) => {
    switch (type) {
      case "post":
        return "글 작성하기"
      case "comment":
        return "게시물 보러가기"
      case "bookmark":
        return "추가하기"
      case "like":
        return "추가하기"
    }
  }

  return (
    <>
      <p className="text-[24px] my-[30px]">{infoText(type)}</p>
      <div className="flex gap-[24px]">
        <Link to={linkSwitch(type)} className="flex contents-center w-[130px] h-[48px] rounded-full bg-point">
          {buttonText(type)}
        </Link>
        <Link to="/mypage" className="flex contents-center w-[130px] h-[48px] rounded-full bg-gray07 border">
          마이페이지
        </Link>
      </div>
    </>
  )
}