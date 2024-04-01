import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import profile from "@/assets/images/bg-placeholder.png";


const links = [
  { path: "/", name: "Dashboard" },
  { path: "/about", name: "About"},
  { path: "/notifications", name: "Notifications"},
  { path: "/past-elections", name: "Previously"},
  { path: "/policies", name: "Policies"},
];

export const HeaderIndex = () => {
  const pathname = usePathname();

  // return to the home modules index
  return (
    <>
      <header className="flex flex-col justify-between border border-red-50 w-[320px] overflow-hidden">
        <div className="p-4 pr-0">
          <Image
            src={profile}
            alt="profile avatar"
            height={40}
            width={40}
            className="rounded-full text-center mb-1"
          />
          <span>OLOWOYORI EMMANUEL TAIWO</span>
          {/* do not forget the ellipsis '...' for username */}
        </div>
        <hr className="text-yellow-700" />
        <div className="flex flex-col justify-between p-4 pr-2">
          <ul className="flex flex-col list-none gap-1">
          {
              links.map((nav, i) => (
                <li key={i} className="hover:border-l-2 hover:rounded-tl-sm hover:rounded-bl-sm hover:bg-yellow-900 hover:text-white hover:border-l-yellow-500 p-1 transition-colors">
                  <Link                    
                    href={nav.path}
                    className={pathname === nav.path ? " ":""}
                  >
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