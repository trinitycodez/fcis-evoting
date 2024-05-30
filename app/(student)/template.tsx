"use client"
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "@/components/logo";
import { HeaderIndex } from "@/components/header";
import FooterIndex from "@/components/footer";
import { ReactNode, createContext, useEffect, useState } from "react";
import profile from "@/assets/images/ProfilePic.png";
import CollapsedMenu from "@/icons/collapsed.icon";
import DashboardIcon from "@/icons/dashboard.icon";
import MessagesIcon from "@/icons/messages.icon";
import PrevElection from "@/icons/prev-elect.icon";
import AboutIcon from "@/icons/about.icon";
import LogoutIcon from "@/icons/logout.icon";
import Link from "next/link";
import StudentsList from "@/icons/list-stds.icon";
import ModalIndex from "../lib/ui";
import { modalPropsType } from "@/types/modal";
import { useSomeContext } from "../lib/server/context-provider";
import { AlertProvider } from "../lib/server/alert-provider";
import { jsonObj } from "@/types/all-user";

export const UserContext = createContext<modalPropsType>({value: false, setValue(val) {return}});
// do not forget to remove the list of students for it is meant for admins only

export const links = [
  { path: "/", name: "Dashboard", txt: "Dashboard", icon: <DashboardIcon width={26} height={26} />},
  { path: "/messages", name: "Messages", txt: "Messages", icon: <MessagesIcon width={26} height={26} />},
  { path: "/past-elections", name: "Past-elections", txt: "Past Elections", icon: <PrevElection width={27} height={27} />},
  { path: "/about", name: "About", txt: "About us", icon: <AboutIcon width={27} height={27} />},
  { path: "/students", name: "Students", txt: "Students list", icon: <StudentsList width={27} height={27} />},
  { path: "/auth/sign-up", name: "Logout", txt: "Logout", icon:  <LogoutIcon width={27} height={27} />},
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

// constant Template component page === '/**'
const GeneralPage = ({ children }: { children: React.ReactNode }) => {
  const [toggle, isToggle] = useState(true); // func
  const [togLayout, isTogLayout] = useState(false); // clicker
  const [modal, isModal] = useState(false); // modal overlay
  
  const pathname = usePathname();
  
  const user = useSomeContext(); // session user admin (object[]) | student (null) string of json
  const { admin_stds }: jsonObj = JSON.parse(user); // together

  const layout = () => {
    const holdVal: ReactNode[] = [];
    holdVal.push(
      <div className="bg-app-white/70 z-30 w-full h-full absolute" onClick={() => clicker(!toggle)}></div>
    )
    return holdVal;
  }
  
  const clicker = (val: boolean) => {
    isToggle(val);
    if (document.body.clientWidth < 768) {
      isTogLayout(!togLayout);
      return;
    }
    isTogLayout(false);
  }

  const user__DEF = () => {
    const arr: ReactNode[] = [];
    for (let i = 0; i < links.length; i++) {
      // if (i === 4 && (user === 'null')) continue;
      if (i === 4 && (admin_stds.matricNumber === 'null')) continue; // user a Student
      arr.push(
        <Link key={i+1} title={links[i].txt} href={links[i].path}>
          {links[i].icon}
        </Link>
      )
    }
    return arr;
  }

  useEffect(() => {
    // localStorage on register for received messages
    const checker = localStorage.getItem('_alert_msg')
    if (checker === null) localStorage.setItem('_alert_msg', '0');
  }, [])
  

  return (
    <>
      {togLayout && (layout()) }
      {modal && (
        <UserContext.Provider value={{value: modal, setValue: (val: boolean)=> isModal(val)}}>
          <ModalIndex />
        </UserContext.Provider>
      )}
      <aside className={`${toggle? "app-aside-icons":"app-aside"} ${togLayout? " shadow-app-toggle xs:absolute":"xs:sticky"}
      flex flex-col left-0 top-0 h-screen justify-between gap-8 bg-app-primary text-app-grey-white z-50`}>
        {/* toggle just like an hamburger menu-bar */}
        {
          (toggle) ? 
          <div className="flex flex-col items-center p-[.35rem] py-7 xs:gap-4 lg:gap-7 ">
            <Image src={profile} alt="profile avatar" height={40} width={40} className="rounded-full text-center mb-1 xs:h-[35px] xs:w-[35px] sm:h-10 sm:w-10 border border-app-grey" onClick={() => isModal(!modal)} />
            <CollapsedMenu width={27} height={27} onClick={() => clicker(!toggle) } />
            {
              user__DEF()
            }
          </div> :
          <>
            <AlertProvider>
              <HeaderIndex value={toggle} stateToggle={(val: boolean) => clicker(val)} stateModal={(val: boolean) => isModal(val)} />
            </AlertProvider>
            <FooterIndex />
          </>
        }
      </aside>

      <main className={`${toggle? "app-container-icons":"app-container"} 
      overflow-y-scroll overflow-x-hidden border-app-white border-t-[28px] pr-4 `}>
        <div className={`min-h-screen sm:bg-[url('../assets/images/cissa.png')] ${toggle? "bg-top":"bg-right-top"} sm:bg-img-70 sm:bg-sm md:bg-md lg:bg-lg bg-fixed bg-no-repeat bg-app-white/[0.93] bg-blend-color-dodge `}>
          {/* main body content */}
          <header className="flex justify-between items-start bg-app-white w-full h-[5.25rem] sticky top-[-2px] z-20">
            <Logo layer={holdObj} />
            {
              links.map((nav, i) => (
                <>
                  {(pathname === nav.path) && (
                    <div key={i} className="flex flex-nowrap items-center h-10">
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