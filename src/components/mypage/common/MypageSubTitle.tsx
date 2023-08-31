type dataType = "post" | "comment" | "bookmark" | "like"

interface Props {
  type: dataType
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