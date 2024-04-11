import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import profile from "@/assets/images/bg-placeholder.png";
import HamburgerMenu from "@/icons/hamburger.icon";
import MessagesIcon from "@/icons/messages.icon";
import { propsType } from "@/types/aside-menu";

const links = [
  { path: "/", name: "Dashboard" },
  { path: "/messages", name: "Messages"},
  { path: "/past-elections", name: "Previously"},
  { path: "/policies", name: "Policies"},
  { path: "/about", name: "About us"},
];

// component
export const HeaderIndex = ({value, stateToggle}:propsType) => {
  const pathname = usePathname();

  const toggleMenu = () => {
    stateToggle(!value);
  }
  // return to the home modules index
  return (
    <>
      <header className="flex flex-col justify-between w-[320px] tracking-[.88px]">
        <div className="p-4 pr-2 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex">
              <Image
                src={profile}
                alt="profile avatar"
                height={40}
                width={40}
                className="rounded-full text-center mb-1"
              />
              {/* fix edit icon to pop modal */}
            </div>
            <HamburgerMenu
              width={35}
              height={40}
              onClick={toggleMenu}
            />

          </div>
          {/* do not forget username should only present maximum of two whitespaces */}
          <span className="inline-flex w-[18.5rem] font-bold text-xl break-keep">
            OLOWOYORI EMMANUEL TAIWO
          </span>
        </div>
        <div className="p-4 pr-2 flex flex-col justify-between border-t border-app-grey ">
          <ul className="flex flex-col list-none gap-1 font-normal text-lg">
            {/* navigations at the side-bar */}
            {
              links.map((nav, i) => (
                <li key={i} className={`flex items-center relative hover:border-l-2 rounded-tl-sm rounded-bl-sm hover:bg-app-green/90 hover:text-app-white hover:border-l-app-yellow hover:font-bold p-1 transition-all duration-75 ${pathname === nav.path ? "font-bold border-l-2 border-l-app-yellow bg-app-green/90 text-app-white":""} `}>
                  <Link href={nav.path}>
                    {nav.name}
                  </Link>
                  {/* new message indicator */}
                  { (nav.name === "Messages") && <MessagesIcon /> }
                </li>
              ))
            }
          </ul>
        </div>
      </header>
    </>
  )
}