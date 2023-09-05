import { useServiceStore } from "store";

interface Props {
  data: string[];
}

const TextureTitle = ({ data }: Props): JSX.Element => {
  const { interiorSelecteIndex, setInteriorSelecteIndex } = useServiceStore((state) => state);

  const onTextureTitleHandler = (index: number) => {
    if (interiorSelecteIndex !== index) {
      setInteriorSelecteIndex(index);
      return;
    }
    setInteriorSelecteIndex(0);
  };
  return (
    <div className="flex">
      {data.map((item, index) => (
        <span
          onClick={() => {
            onTextureTitleHandler(index);
          }}
          key={item}
          className={`hover:cursor-pointer ${
            interiorSelecteIndex === index ? "px-6 pb-3 text-black border-b border-black" : "px-6 pb-3 text-gray03"
          }`}
        >
          {item}
        </span>
      ))}
    </div>
  );
};

export default TextureTitle;
