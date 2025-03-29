import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";

function Navbar() {
  return (
    <header className="bg-dark-300 h-[70px]">
      <nav className="relative flex gap-5 lg:justify-end justify-between items-center h-full w-full px-10 max-lg:pr-22 max-md:pr-17 max-md:px-6 ">
        <Image
          src="/icons/logo.svg"
          alt="logo"
          width={40}
          height={40}
          className="lg:hidden"
        />
        <div className="flex items-center gap-4">
          <SignedIn>
            <UserButton showName />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
