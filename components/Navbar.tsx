import { avatarImages } from "@/constanst";
import Image from "next/image";

function Navbar() {
  const user: string = avatarImages[0];

  return (
    <header className="bg-dark-300 h-[70px]">
      <nav className="flex gap-5 justify-end items-center h-full w-full px-15">
        <p className="relative hover:text-red-400 cursor-pointer transition-all logout-after">
          logout
        </p>
        <Image
          src={user}
          alt="user porofile"
          width={40}
          height={40}
          className="rounded-full"
        />
      </nav>
    </header>
  );
}

export default Navbar;
