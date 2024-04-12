import Image from "next/image";
import logo from "@/assets/images/cissa.png";
import Link from "next/link";
import { LogoPropsType } from "@/types/logo";

const Logo = ({layer}:LogoPropsType) => {
  const {layerImage, layerText, layerWrapper} = layer;
  const toggleWrap = layerWrapper? "flex-col justify-center gap-4 opacity-80 ":"flex-nowrap ";
  const toggleImg = layerImage.border ? "":"rounded-full";
  const toggleTxt = layerText? "text-app-white text-3xl tracking-wider ":"text-app-primary text-xl ml-2";

  return (
    <>
      <Link href={`${layerWrapper? "#":"/"}`} className={`flex ${toggleWrap} items-center`} >
        <Image
          src={logo}
          alt={"cissa logo"}
          height={layerImage.height}
          width={layerImage.width}
          className={`${toggleImg} `}
          priority
        />
        <span className={`${toggleTxt} font-bold leading-[1.875rem] `}>CISSA</span>
      </Link>
    </>
  );
}

export default Logo