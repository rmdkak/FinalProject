const preloadImg = (src: string) => {
  const imgPreload = new Image();
  imgPreload.src = src;
};
const preloadImgs = (src: string[]) => {
  src.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
};

export { preloadImg, preloadImgs };
