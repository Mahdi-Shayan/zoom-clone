import Burger from "@/components/Burger";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen">
      <Sidebar />
      <Burger />
      <div
        id="root-container"
        className="flex-1 flex flex-col"
        style={{ transition: "filter 0.3s" }}
      >
        <Navbar />
        <section className="h-screen flex-1 flex-col p-10 max-md:px-6 max-md:pb-14">
          <div className="w-full h-full">{children}</div>
        </section>
      </div>
    </div>
  );
}

export default HomeLayout;
