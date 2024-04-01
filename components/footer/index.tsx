import Link from "next/link"

const FooterIndex = () => {
  return (
    <div className="pl-4 pb-2 ">
      <span>By</span><br />      
      <span><Link href={"https://github.com/trinitycodez"}>TrinityCodez</Link> &copy;2024</span>
    </div>
  )
}

export default FooterIndex