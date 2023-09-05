import { storageUrl } from "api/supabase";

interface Props {
  leftWallpaperId: string;
  rightWallpaperId: string;
  tileId: string;
}

export const BookmarkItem = ({ leftWallpaperId, rightWallpaperId, tileId }: Props) => {
  return (
    <div className="relative flex contents-center w-full h-full mx-auto cursor-pointer">
      <img
        src={`${storageUrl}/wallpaper/${leftWallpaperId}`}
        className={
          "absolute translate-x-[-40%] translate-y-[-30%] w-[96px] h-[96px] border-[4px] border-white rounded-full"
        }
      />
      <img
        src={`${storageUrl}/wallpaper/${rightWallpaperId}`}
        className={
          "absolute translate-x-[40%] translate-y-[-30%] w-[96px] h-[96px] border-[4px] border-white rounded-full"
        }
      />
      <img
        src={`${storageUrl}/tile/${tileId}`}
        className={"absolute translate-y-[30%] w-[96px] h-[96px] border-[4px] border-white rounded-full"}
      />
    </div>
  );
};
