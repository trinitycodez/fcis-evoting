import Image from "next/image";
import logo from "@/assets/images/cissa.png";
import Link from "next/link";
import { LogoPropsType } from "@/types/logo";

const Logo = ({layer}: LogoPropsType) => {
  const {layerImage, layerText, layerWrapper} = layer;
  const toggleWrap = layerWrapper? "flex-col justify-center gap-4 opacity-80 ":"flex-nowrap ";
  const toggleImg = layerImage.border? "xs:w-[30rem] sm:w-[320px]":"rounded-full xs:w-[35px] xs:w-[35px] sm:w-[40px] sm:w-[40px] ";
  const toggleTxt = layerText? "text-app-white xs:text-2xl md:text-3xl tracking-wider ":"text-app-primary xs:text-lg sm:text-xl ml-2";

  return (
    <>
      <Link href={`${layerWrapper? "#":"/"}`} className={`flex items-center ${toggleWrap} `} >
        <Image
          src={logo}
          alt={"cissa logo"}
          height={layerImage.height}
          width={layerImage.width}
          className={`${toggleImg} `}
          priority
        />
        <span className={`xs:font-bold sm:leading-[1.875rem] ${toggleTxt} `}>CISSA</span>
      </Link>
    </>
  );
}

export default Logo