export const ServiceItemSkeleton = () => {
  const fakeArr = Array.from({ length: 12 });

  return (
    <>
      {fakeArr.map((_, idx) => (
        <div key={idx} className="interior-item skeleton-effect" />
      ))}
    </>
  );
};
