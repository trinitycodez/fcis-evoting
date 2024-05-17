import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import profile from "@/assets/images/ProfilePic.png";
import HamburgerMenu from "@/icons/hamburger.icon";
import InboxIcon from "@/icons/inbox.icon";
import { propsType } from "@/types/aside-menu";
import EditIcon from "@/icons/edit.icon";
import { ReactNode } from "react";
import { useSomeContext } from "@/app/lib/server/context-provider";
import { useSomeAlert } from "@/app/lib/server/alert-provider";

const links = [
  { path: "/", name: "Dashboard" },
  { path: "/messages", name: "Messages"},
  { path: "/past-elections", name: "Past elections"},
  { path: "/about", name: "About us"},
  { path: "/students", name: "Students lists"},
  { path: "/auth/sign-up", name: "Logout"},
];

// component, return to the home modules index
export const HeaderIndex =  ({value, stateToggle, stateModal}: propsType) => {

  const user = useSomeContext(); // session user admin (object[]) | student (null)
  const userAlert = useSomeAlert(); // session user admin (object[]) | student (null)

  const pathname = usePathname();
  
  const user__DEFF = () => {
    const arr: ReactNode[] = [];
    for (let i = 0; i < links.length; i++) {
      if (i === 4 && (user === 'null')) continue; // user a Student
      arr.push(
        <li key={i+1} className={`flex items-center relative hover:border-l-2 rounded-tl-sm rounded-bl-sm hover:bg-app-light-primary/60 hover:text-app-text-sub hover:border-l-app-yellow hover:font-bold p-1 transition-all duration-75 ${pathname === links[i].path ? "font-bold border-l-2 border-l-app-yellow bg-app-light-primary/60 text-app-text-sub":""} `}>
          <Link href={links[i].path}>
            {links[i].name}
          </Link>
          {/* new message indicator from Admin(s) */}
          { ((links[i].name === "Messages") && userAlert[1] !== 0) && <InboxIcon val={userAlert[1]} /> }
        </li>
      );
    }
    return arr;
  }
  
  const toggleMenu = () => stateToggle(!value);
  const modalFunc = () => stateModal(true);


  return (
    <>
      <header className="flex flex-col justify-between w-full tracking-[.88px]">
        <div className="px-4 py-6 flex flex-col gap-4 mb-4">
          <div className="flex justify-between items-start">
            <div className="flex relative" onClick={modalFunc}>
              <Image src={profile} alt="profile avatar" height={40} width={40} className="rounded-full text-center mb-1 xs:h-[35px] xs:w-[35px] sm:h-10 sm:w-10 border border-app-grey " />
              <EditIcon width={20} height={20} className="absolute -right-3 bottom-1 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
            </div>
            <HamburgerMenu width={35} height={40} onClick={toggleMenu} className="xs:w-[30px] xs:h-[35px] sm:w-[35px] sm:h-[40px] " />
          </div>
          {/* do not forget username should only present maximum of two whitespaces */}
          <div className="flex flex-wrap max-w-[18.5rem]">
            <span className="inline-flex w-full font-bold xs:text-base sm:text-lg leading-6 break-keep">
              OLOWOYORI EMMANUEL TAIWO
            </span>
            <span className="w-full text-app-grey font-normal xs:text-sm` sm:text-base ">(Trinity)</span>
          </div>
        </div>
        <div className="px-4 py-6 flex flex-col justify-between border-t border-app-grey ">
          {/* navigations at the side-bar */}
          <ul className="flex flex-col list-none gap-1 font-normal xs:text-base sm:text-lg">
            {
              user__DEFF()
            }
          </ul>
        </div>
      </header>
    </>
  )
}