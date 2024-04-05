import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import profile from "@/assets/images/bg-placeholder.png";


const links = [
  { path: "/", name: "Dashboard" },
  { path: "/notifications", name: "Notifications"},
  { path: "/past-elections", name: "Previously"},
  { path: "/policies", name: "Policies"},
  { path: "/about", name: "About us"},
];

export const HeaderIndex = () => {
  const pathname = usePathname();

  // return to the home modules index
  return (
    <>
      <header className="flex flex-col justify-between w-[320px] overflow-hidden tracking-[.88px]">
        <div className="p-4 pr-2">
          <Image
            src={profile}
            alt="profile avatar"
            height={40}
            width={40}
            className="rounded-full text-center mb-1"
          />
          <span className="inline-flex w-[18.5rem] font-bold text-xl break-keep">
            OLOWOYORI EMMANUEL TAIWO
          </span>
          {/* do not forget username should not be more than two whitespaces */}
        </div>
        <div className="flex flex-col justify-between p-4 pr-2 border-t border-app-grey ">
          <ul className="flex flex-col list-none gap-1 font-normal text-lg">
            {/* navigations at the side-bar */}
            {
              links.map((nav, i) => (
                <li key={i} className={`hover:border-l-2 rounded-tl-sm rounded-bl-sm hover:bg-app-green/90 hover:text-app-white hover:border-l-app-yellow hover:font-bold p-1 transition-all duration-75 ${pathname === nav.path ? "font-bold border-l-2 border-l-app-yellow bg-app-green/90 text-app-white":""}`}>
                  <Link href={nav.path}>
                    {nav.name}
                  </Link>                
                </li>
              ))
            }
          </ul>
        </div>
      </header>
    </>
  )
}