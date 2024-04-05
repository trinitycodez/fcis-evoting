"use client"
import { usePathname } from "next/navigation";
import Logo from "@/components/logo";
import {HeaderIndex} from "@/components/header";
import FooterIndex from "@/components/footer";

export const links = [
  { path: "/", name: "Dashboard"},
  { path: "/about", name: "About"},
  { path: "/notifications", name: "Notifications"},
  { path: "/past-elections", name: "Previously"},
  { path: "/policies", name: "Policies"},
];

// this is the constant route page === '/**'
const GeneralPage = ({children}: {children: React.ReactNode}) => {
  const pathname = usePathname();

  return (
    <>
      <aside className={"app-aside flex flex-col sticky left-0 top-0 h-screen justify-between gap-8 overflow-y-scroll bg-app-primary text-app-grey-white "}>
        {/* toggle just like an hamburger menubar */}
        <HeaderIndex />
        <FooterIndex />
      </aside>
      <main className={"app-container overflow-y-scroll overflow-x-hidden border-app-white border-t-[16px] pr-4"}>
        <div className="h-[50rem] bg-[url('../assets/images/cissa.png')] bg-right-top bg-fixed bg-no-repeat bg-app-white/[0.93] bg-blend-color-dodge ">
          {/* main body content */}
          <header className="flex justify-between items-start bg-app-white w-full h-[5.25rem] sticky top-0">
            <Logo />
            {
              links.map((nav, i)=>(
              <>
                {(pathname===nav.path) && (
                    <div key={i} className="flex flex-nowrap items-center h-10">
                        <span key={i} className="text-app-yellow">/ </span>&nbsp;<span key={i} className="text-app-primary text-base">{nav.name}</span>
                    </div>
                )}
              </>))
            }
          </header>
          {children}
        </div>
      </main>
    </>
  );
}

export default GeneralPage
