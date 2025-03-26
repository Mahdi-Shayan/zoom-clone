import { sidebarLinks } from "@/constanst";
import Image from "next/image";
import Links from "./Links";

function Sidebar() {
  return (
    <div className="sticky top-0 bg-dark-300 w-[260px] max-md:w-max h-screen">
      <div className="p-5 max-md:px-0">
        <Image
          src="/icons/yoom-logo.svg"
          alt="logo"
          width={125}
          height={45}
          className="max-md:hidden"
        />
        <Image
          src="/icons/logo.svg"
          alt="logo"
          width={40}
          height={40}
          className="md:hidden mx-auto"
        />
      </div>
      <ul className="flex flex-col gap-3 mt-6 px-3">
        {sidebarLinks.map((link) => (
          <Links key={link.route} link={link} />
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
