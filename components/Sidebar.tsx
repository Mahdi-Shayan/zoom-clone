import { sidebarLinks } from "@/constanst";
import Image from "next/image";
import Links from "./Links";

function Sidebar() {
  return (
    <div
      id="sidebar"
      className="sticky top-0 bg-dark-300 w-[260px] h-screen max-lg:fixed max-lg:translate-x-[-100%] z-10"
      style={{ transition: "all 0.3s" }}
    >
      <div className="p-5">
        <Image
          src="/icons/yoom-logo.svg"
          alt="logo"
          width={125}
          height={45}
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
