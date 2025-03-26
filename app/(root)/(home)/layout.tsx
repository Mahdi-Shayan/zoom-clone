import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <section className="min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
          <div className="w-full">{children}</div>
        </section>
      </div>
    </div>
  );
}

export default HomeLayout;
