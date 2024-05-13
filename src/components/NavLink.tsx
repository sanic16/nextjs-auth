'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

const NavLink = (
    {
        children,
        href
    }: {
        children: React.ReactNode,
        href: string
    }
) => {
  const path = usePathname()  
  return (
    <Link 
        href={href}
        className={path === href ? 'active' : ''}
    >
        { children }
    </Link>
  )
}

export default NavLink