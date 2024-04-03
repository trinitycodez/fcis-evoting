import { FC } from "react";
import Image from "next/image";
import logo from "@/assets/images/cissa.png";

const Logo:FC = () => {
  return (
    <div className="flex flex-nowrap items-center">
      <Image
        src={logo}
        alt={"cissa logo"}
        height={40}
        width={40}
        className="rounded-full"
      />
      <span className="ml-2 text-app-primary font-bold text-xl leading-[1.875rem]">CISSA</span>
    </div>
  );
}

export default Logo