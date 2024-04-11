"use client"
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "@/components/logo";
import { HeaderIndex } from "@/components/header";
import FooterIndex from "@/components/footer";
import { useState } from "react";
import profile from "@/assets/images/bg-placeholder.png";
import CollapsedMenu from "@/icons/collapsed.icon";

export const links = [
  { path: "/", name: "Dashboard"},
  { path: "/about", name: "About"},
  { path: "/messages", name: "Messages"},
  { path: "/past-elections", name: "Previously"},
  { path: "/policies", name: "Policies"},
];

// this is the constant route page === '/**'
const GeneralPage = ({children}: {children: React.ReactNode}) => {
  const [toggle, isToggle] = useState(true);
  const pathname = usePathname();

  return (
    <>
      <aside className={`${toggle? "app-aside-icons":"app-aside"}
      flex flex-col sticky left-0 top-0 h-screen justify-between gap-8 bg-app-primary text-app-grey-white transition-all duration-100 `}>
        {/* toggle just like an hamburger menubar */}
        {
          (toggle) ? <div className="flex flex-col items-center p-[.35rem] pt-4 gap-4">
            <Image src={profile} alt="profile avatar" height={40} width={40} className="rounded-full text-center mb-1" />
            <CollapsedMenu width={30} height={30} onClick={()=> isToggle(!toggle)} />
          </div>
          : <>
            <HeaderIndex value={toggle} stateToggle={(val:boolean) => isToggle(val) } />
            <FooterIndex />
          </>
        }
      </aside>
      <main className={`${toggle? "app-container-icons":"app-container"}
      overflow-y-scroll overflow-x-hidden border-app-white border-t-[16px] pr-4 `}>
        <div className={`min-h-screen bg-[url('../assets/images/cissa.png')] ${toggle? "bg-top":"bg-right-top"} bg-fixed bg-no-repeat bg-app-white/[0.93] bg-blend-color-dodge `}>
          {/* main body content */}
          <header className="flex justify-between items-start bg-app-white w-full h-[5.25rem] sticky top-0">
            <Logo />
            {
              links.map((nav, i) => (
                <>
                  {(pathname === nav.path) && (
                    <div key={i} className="flex flex-nowrap items-center h-10">
                      <span key={i} className="text-app-yellow">/ </span>&nbsp;<span key={i} className="text-app-primary text-base">{nav.name}</span>
                    </div>
                  )}
                </>
              ))
            }
          </header>
          {children}
        </div>
      </main>
    </>
  );
}

export default GeneralPage
