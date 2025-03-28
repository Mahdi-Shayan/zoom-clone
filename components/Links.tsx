"use client";

import { cn } from "@/lib/utils";
import { SidebarLinks } from "@/type";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Links({ link }: { link: SidebarLinks }) {
  const pathname = usePathname();

  const isSelected = pathname === link.route;

  return (
    <Link
      href={link.route}
      className={cn(
        "flex gap-3 py-3 px-4 max-lg:p-3 rounded-md text-sky-300 text-lg",
        isSelected && "bg-blue-100 text-white"
      )}
    >
      <Image
        src={link.imgURL}
        alt={`${link.label} icon`}
        width={20}
        height={20}
      />
      <p className="max-lg:hidden">{link.label}</p>
    </Link>
  );
}

export default Links;
