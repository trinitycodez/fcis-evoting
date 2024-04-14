import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Home | FCIS-Evoting",
  description: "Home-page for FCIS E-voting",
  keywords: "FCIS, CIS, CISSA, E-voting, Internet voting, CISSA online voting",
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <html lang="en">
      <body className="flex justify-end min-w-[320px] max-w-[1440px] h-screen overflow-y-scroll font-App-Inter text-base text-app-text-sub z-10 relative ">
        {children}
      </body>
    </html>
  );
}

export default RootLayout