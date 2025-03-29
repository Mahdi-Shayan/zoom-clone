import { ReactNode } from "react";

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex-center h-screen">
      {children}
    </main>
  );
}

export default AuthLayout;
