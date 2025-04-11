import Image from "next/image";

const Loader = ({ size = 50 }: { size?: number }) => {
  return (
    <div className="flex-center h-screen w-full">
      <Image
        src="/icons/loading-circle.svg"
        alt="loading"
        width={size}
        height={size}
      />
    </div>
  );
};

export default Loader;
