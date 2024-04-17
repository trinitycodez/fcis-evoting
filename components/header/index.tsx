import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import profile from "@/assets/images/avatar.svg";
import HamburgerMenu from "@/icons/hamburger.icon";
import InboxIcon from "@/icons/inbox.icon";
import { propsType } from "@/types/aside-menu";
import EditIcon from "@/icons/edit.icon";

const links = [
  { path: "/", name: "Dashboard" },
  { path: "/messages", name: "Messages"},
  { path: "/past-elections", name: "Past elections"},
  { path: "/policies", name: "Policies"},
  { path: "/about", name: "About us"},
  { path: "/students", name: "Students lists"},
];

// component, return to the home modules index
export const HeaderIndex = ({value, stateToggle}:propsType) => {
  const pathname = usePathname();

  const toggleMenu = () => {
    stateToggle(!value);
  }

  return (
    <>
      <header className="flex flex-col justify-between w-full tracking-[.88px]">
        <div className="px-4 py-6 flex flex-col gap-4 mb-4">
          <div className="flex justify-between items-start">
            <div className="flex relative">
              <Image src={profile} alt="profile avatar" height={40} width={40} className="rounded-full text-center mb-1 xs:h-[35px] xs:w-[35px] sm:h-10 sm:w-10 " />
              <EditIcon width={20} height={20} className="absolute -right-3 bottom-1 xs:w-4 xs:h-4 sm:w-5 sm:h-5 " />
            </div>
            <HamburgerMenu width={35} height={40} onClick={toggleMenu} className="xs:w-[30px] xs:h-[35px] sm:w-[35px] sm:h-[40px] " />
          </div>
          {/* do not forget username should only present maximum of two whitespaces */}
          <span className="inline-flex w-full max-w-[18.5rem] font-bold xs:text-base sm:text-lg leading-6 break-keep">
            OLOWOYORI EMMANUEL TAIWO
          </span>
        </div>
        <div className="px-4 py-6 flex flex-col justify-between border-t border-app-grey ">
          {/* navigations at the side-bar */}
          <ul className="flex flex-col list-none gap-1 font-normal xs:text-base sm:text-lg">
            {
              links.map((nav, i) => (
                <li key={i} className={`flex items-center relative hover:border-l-2 rounded-tl-sm rounded-bl-sm hover:bg-app-green/90 hover:text-app-white hover:border-l-app-yellow hover:font-bold p-1 transition-all duration-75 ${pathname === nav.path ? "font-bold border-l-2 border-l-app-yellow bg-app-green/90 text-app-white":""} `}>
                  <Link href={nav.path}>
                    {nav.name}
                  </Link>
                  {/* new message indicator */}
                  { (nav.name === "Messages") && <InboxIcon /> }
                </li>
              ))
            }
          </ul>
        </div>
      </header>
    </>
  )
}