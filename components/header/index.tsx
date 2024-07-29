import { usePathname } from "next/navigation";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import avatar from "@/assets/images/avatar.svg";
import HamburgerMenu from "@/icons/hamburger.icon";
import InboxIcon from "@/icons/inbox.icon";
import { propsType } from "@/types/aside-menu";
import EditIcon from "@/icons/edit.icon";
import { ReactNode, useEffect, useState } from "react";
import { useSomeContext } from "@/app/lib/server/context-provider";
import { useSomeAlert } from "@/app/lib/server/alert-provider";
import { APIMsg } from "@/types/api-msg";
import { jsonObj } from "@/types/all-user";

const links = [
  { path: "/", name: "Dashboard" },
  { path: "/messages", name: "Messages"},
  { path: "/past-elections", name: "Past elections"},
  { path: "/about", name: "About us"},
  { path: "/students", name: "Students lists"},
  { path: "/auth/sign-up", name: "Logout"},
  { path: "/reset-password", name: "Change password"},
];

// Component, returned to the home modules index
export const HeaderIndex =  ({value, stateToggle, stateModal}: propsType) => {
  const user = useSomeContext(); // session user admin (object[]) | student (null)
  const { admin_stds, others }: jsonObj = JSON.parse(user); // together
  const { Name, PostalName, Passport } = others;
  const userName = Name.replace(',', '').toLocaleUpperCase()
  
  const userAlert = useSomeAlert();
  const [isState, setState] = useState<[APIMsg, number]>(); // prompt icon
  
  const [userImage, setUserImage] = useState<string | StaticImageData>(avatar)
  const pathname = usePathname();
  
  const user__DEFF = (res: [APIMsg, number]) => {
    const arr: ReactNode[] = [];
    for (let i = 0; i < links.length; i++) {
      // if (i === 4 && (user === 'null')) continue; // user a Student
      if (i === 4 && (admin_stds.matricNumber === 'null')) continue; // user a Student
      arr.push(
        <li key={i+1} className={`flex items-center relative hover:border-l-2 rounded-tl-sm rounded-bl-sm hover:bg-app-light-primary/60 hover:text-app-text-sub hover:border-l-app-yellow hover:font-bold p-1 transition-all duration-75 ${pathname === links[i].path ? "font-bold border-l-2 border-l-app-yellow bg-app-light-primary/60 text-app-text-sub":""} `}>
          <Link href={links[i].path}>
            {links[i].name}
          </Link>
          {/* new message indicator from Admin(s) */}
          { ((links[i].name === "Messages") && res[1] !== 0) && <InboxIcon val={res[1]} /> }
        </li>
      );
    }
    return arr;
  }
  
  const toggleMenu = () => stateToggle(!value);
  const modalFunc = () => stateModal(true, '0');

  useEffect(() => {
    setState(userAlert);
    if (typeof(Passport) === 'string') setUserImage(Passport);
  }, [])
  

  return (
    <>
      <header className="flex flex-col justify-between w-full tracking-[.88px]">
        <div className="px-4 py-6 flex flex-col gap-4 mb-4">
          <div className="flex justify-between items-start">
            <div className="flex relative" onClick={modalFunc}>
              <Image src={userImage} alt="Avatar" height={40} width={40} className="rounded-full text-center mb-1 xs:h-[35px] xs:w-[35px] sm:h-10 sm:w-10 border border-app-grey " />
              <EditIcon width={20} height={20} className="absolute -right-3 bottom-1 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
            </div>
            <HamburgerMenu width={35} height={40} onClick={toggleMenu} className="xs:w-[30px] xs:h-[35px] sm:w-[35px] sm:h-[40px] " />
          </div>
          {/* do not forget username should only present maximum of two whitespaces */}
          <div className="flex flex-wrap max-w-[18.5rem]">
            <span className="inline-flex w-full font-bold xs:text-base sm:text-lg leading-6 break-keep">
              {userName}
            </span>
            <span className="w-full text-app-grey font-normal xs:text-sm sm:text-base ">({ PostalName })</span>
          </div>
        </div>
        <div className="px-4 py-6 flex flex-col justify-between border-t border-app-grey ">
          {/* navigations at the side-bar */}
          <ul className="flex flex-col list-none gap-1 font-normal xs:text-base sm:text-lg">
            {
              (isState) && user__DEFF(isState)
            }
          </ul>
        </div>
      </header>
    </>
  )
}