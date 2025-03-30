import { Toaster } from "@/components/ui/sonner";
import StreamVideoProvider from "@/providers/streamCloneProvider";
import { ReactNode } from "react";

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
      <Toaster richColors/>
    </main>
  );
}

export default RootLayout;
