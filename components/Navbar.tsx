import { SignedIn, UserButton } from "@clerk/nextjs";

function Navbar() {
  return (
    <header className="bg-dark-300 h-[70px]">
      <nav className="flex gap-5 justify-end items-center h-full w-full px-15 max-lg:px-10 max-md:px-5">
        <SignedIn>
          <UserButton showName />
        </SignedIn>
      </nav>
    </header>
  );
}

export default Navbar;
