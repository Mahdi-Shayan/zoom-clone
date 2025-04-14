import { cn } from "@/lib/utils";
import Image from "next/image";

const Loader = ({
  size = 50,
  className = "h-screen",
}: {
  size?: number;
  className?: string;
}) => {
  return (
    <div className={cn("flex-center w-full", className)}>
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
