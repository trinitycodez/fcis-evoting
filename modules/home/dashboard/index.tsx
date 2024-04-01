"use client"

import { usePathname } from "next/navigation";
import Logo from "@/components/logo";
import {HeaderIndex} from "@/components/header";
import FooterIndex from "@/components/footer";

const links = [
  { path: "/", name: "Dashboard", style: "mr-4" },
  { path: "/about", name: "About", style: "mr-4" },
  { path: "/notifications", name: "Notifications", style: "mr-16" },
  { path: "/past-elections", name: "Previously", style: "mr-12" },
  { path: "/policies", name: "Policies", style: "mr-[.5rem]" },
];

// this is the home route page === 'username/'
const HomeDashboard = () => {
    const pathname = usePathname();

  return (
    <>
        <aside className={"app-aside flex flex-col sticky left-0 top-0 h-screen justify-between gap-8 overflow-y-scroll "}>
          {/* toggle just like an hamburger menubar */}
          <HeaderIndex />
          <FooterIndex />
        </aside>
        <main className={"app-container overflow-y-scroll border-[#fff] border-t-[16px] pr-4 pb-2"}>
          <div className="h-[50rem] bg-[url('../assets/images/bg-placeholder.png')] bg-cover bg-scroll bg-white/[0.93] bg-blend-color-dodge ">
            {/* main body content */}
            <header className="flex justify-between items-start bg-[#fff] w-full mb-8 h-[5.25rem] sticky top-0">
              <Logo position="up" />
                {
                    links.map((nav, i)=>(
                    <>
                      {(pathname===nav.path) && (
                          <div>
                              <span key={i} className="text-yellow-500">/ </span>&nbsp;<span key={i} className="text-yellow-700">{nav.name}</span>
                          </div>
                      )}
                    </>))
                }
            </header>
            <p>Emmanuel Olowoyori</p>

          </div>
        </main>
    </>
  );
}

export default HomeDashboard
