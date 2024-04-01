import { logotypes } from "@/types/logo";
import { FC } from "react";
import Image from "next/image";
import avatar from "@/assets/images/bg-placeholder.png";

const Logo:FC<logotypes> = ({position}) => {
  return (
    <>
      <Image
        src={avatar}
        alt={"logo"}
        height={40}
        width={40}
        className={`${(position==="up")?"":""} rounded-full`}
      />
    </>
  );
}

export default Logo