interface CustomSelf {
  image: string;
  id: string;
}

interface FetchItemBookmark {
  id: string;
  userId: string;
  tileId: string;
  leftWallpaperId: string;
  rightWallpaperId: string;
}

export type { CustomSelf, FetchItemBookmark };
