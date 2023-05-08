'use client';

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavbarButtons({ type = 'desktop' }: { type?: 'mobile' | 'desktop' }) {

    const pathname = usePathname()

    let className = "text-gray-300 hover:bg-indigo-500 dark:hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
    if (type === 'desktop') className += " text-sm"
    else if (type === 'mobile') className += " rounded-md text-base text-center"

    let activeStyle = `${className} text-white ${type === 'desktop' ? 'bg-indigo-800 dark:bg-gray-900' : 'font-bold'} `
    return <>{
        links.map(({ href, label, noHighlight }) =>
            <Link key={href} href={href} className={!noHighlight && pathname?.includes(href) ? activeStyle : className} aria-current="page" >{label}</Link>
        )
    }</>

}


const links = [
    { href: '/', label: 'Home', noHighlight: true },
    { href: '/discord', label: 'Discord tools' },
    { href: '/tools', label: 'Other tools' },

]