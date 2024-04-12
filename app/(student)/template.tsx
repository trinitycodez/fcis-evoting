"use client"
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "@/components/logo";
import { HeaderIndex } from "@/components/header";
import FooterIndex from "@/components/footer";
import { useState } from "react";
import profile from "@/assets/images/avatar.svg";
import CollapsedMenu from "@/icons/collapsed.icon";
import DashboardIcon from "@/icons/dashboard.icon";
import MessagesIcon from "@/icons/messages.icon";
import PrevElection from "@/icons/prev-elect.icon";
import AboutIcon from "@/icons/about.icon";
import PoliciesIcon from "@/icons/policies.icon";
import Link from "next/link";

export const links = [
  { path: "/", name: "Dashboard", txt: "Dashboard", icon: <DashboardIcon width={30} height={30} />},
  { path: "/messages", name: "Messages", txt: "Messages", icon: <MessagesIcon width={30} height={30} />},
  { path: "/past-elections", name: "Previously", txt: "Past Elections", icon: <PrevElection width={30} height={30} />},
  { path: "/policies", name: "Policies", txt: "Terms & Conditions", icon:  <PoliciesIcon width={30} height={30} />},
  { path: "/about", name: "About", txt: "About us", icon: <AboutIcon width={30} height={30} />},
];

// constant component route page === '/**'
const GeneralPage = ({children}: {children: React.ReactNode}) => {
  const [toggle, isToggle] = useState(false);
  const pathname = usePathname();
  const holdObj = {
    layerImage: {
      border: false,
      width: 40,
      height: 40,
    },
    layerText: false,
    layerWrapper: false,
  }

  return (
    <>
      <aside className={`${toggle? "app-aside-icons":"app-aside"}
      flex flex-col sticky left-0 top-0 h-screen justify-between gap-8 bg-app-primary text-app-grey-white transition-all duration-100 `}>
        {/* toggle just like an hamburger menubar */}
        {
          (toggle) ? <div className="flex flex-col items-center p-[.35rem] pt-4 gap-4">
            <Image src={profile} alt="profile avatar" height={40} width={40} className="rounded-full text-center mb-1" />
            <CollapsedMenu width={30} height={30} onClick={()=> isToggle(!toggle)} />
            {
              links.map((nav, i) => (
                <Link key={i} title={nav.txt} href={nav.path}>
                  {nav.icon}
                </Link>
              ))
            }
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
            <Logo layer={holdObj} />
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
