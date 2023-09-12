import { STORAGE_URL } from "api/supabase/supabaseClient";

interface Props {
  leftWallpaperId: string | undefined | null;
  rightWallpaperId: string | undefined | null;
  tileId: string | undefined | null;
}

export const PreviewItem = ({ leftWallpaperId, rightWallpaperId, tileId }: Props) => {
  if (
    leftWallpaperId !== null &&
    leftWallpaperId !== undefined &&
    rightWallpaperId !== null &&
    rightWallpaperId !== undefined &&
    tileId !== null &&
    tileId !== undefined
  ) {
    return (
      <div className="relative flex w-full h-full mx-auto cursor-pointer contents-center">
        <img
          src={`${STORAGE_URL}/wallpaper/${leftWallpaperId}`}
          className={
            "absolute translate-x-[-40%] translate-y-[-30%] w-[96px] h-[96px] border-[4px] border-white rounded-full"
          }
        />
        <img
          src={`${STORAGE_URL}/wallpaper/${rightWallpaperId}`}
          className={
            "absolute translate-x-[40%] translate-y-[-30%] w-[96px] h-[96px] border-[4px] border-white rounded-full"
          }
        />
        <img
          src={`${STORAGE_URL}/tile/${tileId}`}
          className={"absolute translate-y-[30%] w-[96px] h-[96px] border-[4px] border-white rounded-full"}
        />
      </div>
    );
  } else return <></>;
};
