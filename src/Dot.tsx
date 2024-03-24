const Dot = ({ size }: { size: number }) => {
  return (
    <div
      style={{ height: size, width: size }}
      className="rounded-full bg-green-700"
    ></div>
  );
};

export default Dot;
