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
      <body className="flex min-w-[320px] max-w-[1440px] h-screen overflow-y-scroll">
        {children}
      </body>
    </html>
  );
}

export default RootLayout