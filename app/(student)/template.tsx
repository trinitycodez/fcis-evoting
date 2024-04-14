"use client"
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "@/components/logo";
import { HeaderIndex } from "@/components/header";
import FooterIndex from "@/components/footer";
import { ReactNode, useEffect, useState } from "react";
import profile from "@/assets/images/avatar.svg";
import CollapsedMenu from "@/icons/collapsed.icon";
import DashboardIcon from "@/icons/dashboard.icon";
import MessagesIcon from "@/icons/messages.icon";
import PrevElection from "@/icons/prev-elect.icon";
import AboutIcon from "@/icons/about.icon";
import PoliciesIcon from "@/icons/policies.icon";
import Link from "next/link";

export const links = [
  { path: "/", name: "Dashboard", txt: "Dashboard", icon: <DashboardIcon width={27} height={27} />},
  { path: "/messages", name: "Messages", txt: "Messages", icon: <MessagesIcon width={27} height={27} />},
  { path: "/past-elections", name: "Past-elections", txt: "Past Elections", icon: <PrevElection width={27} height={27} />},
  { path: "/policies", name: "Policies", txt: "Terms & Conditions", icon:  <PoliciesIcon width={27} height={27} />},
  { path: "/about", name: "About", txt: "About us", icon: <AboutIcon width={27} height={27} />},
]

const holdObj = {
  layerImage: {
    border: false,
    width: 40,
    height: 40,
  },
  layerText: false,
  layerWrapper: false,
}

// constant component route page === '/**'
const GeneralPage = ({children}: {children: React.ReactNode}) => {
  const [toggle, isToggle] = useState(true); // func
  const [togLayout, isTogLayout] = useState(false); // clicker
  const pathname = usePathname();

  // useEffect(() => {
  //   const holdWindowVal = document.body.clientWidth;
  //   if (holdWindowVal < 768) return isToggle(true);
  //   isToggle(false);

  // }, [])

  const layout = () => {
    const holdVal:ReactNode[] = [];
    holdVal.push(
      <div className="bg-app-white/70 z-30 w-full h-full absolute" onClick={() => clicker(!toggle)}></div>
    )
    return holdVal;
  }
  
  const clicker = (val:boolean) => {
    isToggle(val);
    if (document.body.clientWidth < 768) {
      isTogLayout(!togLayout);
      return;
    }
    isTogLayout(false);
  }

  return (
    <>
      { togLayout && (layout()) }

      <aside className={`${toggle? "app-aside-icons":"app-aside"} ${togLayout? " shadow-app-toggle xs:absolute":"xs:sticky"}
      flex flex-col left-0 top-0 h-screen justify-between gap-8 bg-app-primary text-app-grey-white z-50 ` }>
        {/* toggle just like an hamburger menubar */}
        {
          (toggle) ? <div className="flex flex-col items-center p-[.35rem] py-7 xs:gap-4 lg:gap-7 ">
            <Image src={profile} alt="profile avatar" height={40} width={40} className="rounded-full text-center mb-1" />
            <CollapsedMenu width={27} height={27} onClick={ ()=> clicker(!toggle) } />
            {
              links.map((nav, i) => (
                <Link key={i} title={nav.txt} href={nav.path}>
                  {nav.icon}
                </Link>
              ))
            }
          </div>
          : <>
            <HeaderIndex value={toggle} stateToggle={(val:boolean) => clicker(val) } />
            <FooterIndex />
          </>
        }
      </aside>


      <main className={`${toggle? "app-container-icons":"app-container"} 
      overflow-y-scroll overflow-x-hidden border-app-white border-t-[28px] pr-4 `}>
        <div className={`min-h-screen bg-[url('../assets/images/cissa.png')] ${toggle? "bg-top":"bg-right-top"} md:bg-img-60 lg:bg-img-70 bg-fixed bg-no-repeat bg-app-white/[0.93] bg-blend-color-dodge `}>
          {/* main body content */}
          <header className="flex justify-between items-start bg-app-white w-full h-[5.25rem] sticky top-[-2px] z-20">
            <Logo layer={holdObj} />
            {
              links.map((nav, i) => (
                <>
                  {(pathname === nav.path) && (
                    <div className="flex flex-nowrap items-center h-10">
                      <span className="text-app-yellow">/ </span>&nbsp;<span className="text-app-primary xs:text-sm sm:text-base">{nav.name}</span>
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