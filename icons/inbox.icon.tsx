'use client'

const InboxIcon = ({ val }: { val: number }) => {
  console.log("inbox ", val);
  return (
    <span className="absolute right-2 bg-app-yellow border-2 border-app-white px-1 rounded-full text-xs text-app-green">{val}</span>
  )
}

export default InboxIcon