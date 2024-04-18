import Link from "next/link"

const FooterIndex = () => {
  return (
    <div className="pl-4 pb-2 pr-2 pt-1 text-app-yellow border-t border-app-grey text-sm ">
      <span>By</span><br />      
      <span><Link href={"https://github.com/trinitycodez"} className="underline underline-offset-2">TrinityCodez</Link> &copy; 2024</span>
    </div>
  )
}

export default FooterIndex