const workingAreaCalculator = (width: number, height: number) => {
  const resultArea = (width / 100) * (height / 100);
  return resultArea;
};

const resultConsumpTionCalculate = (resultArea: number, width: number, height: number, selectItem: number) => {
  if (selectItem === 0) return Math.ceil(+resultArea / (+width * +height) + +resultArea / (+width * +height) / 10);
  if (selectItem === 1)
    return Math.ceil((+resultArea * 10000) / (+width * +height) + (+resultArea * 10000) / (+width * +height) / 10);
};

const threeDigitComma = (number: string | number): string => {
  return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

export { workingAreaCalculator, resultConsumpTionCalculate, threeDigitComma };
