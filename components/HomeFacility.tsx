"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  imageUrl: string;
  className?: string;
  title: string;
  description: string;
  handleClick: () => void;
}

const HomeFacility = ({
  description,
  imageUrl,
  title,
  className,
  handleClick,
}: Props) => {
  return (
    <div className={cn("facilitie-card", className)} onClick={handleClick}>
      <div className="relative">
        <Image src={imageUrl} alt={`${title} icon`} fill className="p-2" />
      </div>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default HomeFacility;
