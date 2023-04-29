'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useUser from "#/requests/getUser";

export default function Navbar({ mobileMenu }: { mobileMenu?: { mobileMenuOpen: boolean, setMobileMenuOpen: (value: boolean) => void, } }) {

    // get discord user info

    const { user: discordUser, isError, isLoading, isLoggedOut } = useUser()


    // user menu open
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen)

    useEffect(() => {
        function checkClick(event: MouseEvent) {
            if (event.target instanceof HTMLElement) {
                if (!event.target.closest('#user-menu')) {
                    setUserMenuOpen(false)
                }
            }

        }
        if (userMenuOpen) window.addEventListener('click', checkClick)
        return () => window.removeEventListener('click', checkClick)

    }, [userMenuOpen])

    return (
        <nav className="bg-indigo-600 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">


                <div className="relative flex items-center justify-between h-16">
                    {/* <div className={`absolute inset-y-0 left-0 flex items-center sm:hidden ${mobileMenu || true ? '' : 'hidden'}`}>
                        <button type="button" onClick={toggleMobileMenu} id='' className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black dark:focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className={`h-6 w-6 ${!mobileMenuOpen ? 'block' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg className={`h-6 w-6 ${mobileMenuOpen ? 'block' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div> */}
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start text-white">
                        <div className="flex-shrink-0 flex items-center font-bold select-none">
                            {/* <img className="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" /> */}
                            <img className="block text-2xl h-8 w-8" src="/hammer_and_wrench_color.svg" alt="🛠️" />
                            <p className="text-xl ml-3 tracking-wide">Tools</p>
                            {/* <img className="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow" /> */}
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                <NavbarButtons />
                            </div>
                        </div>
                    </div>
                    {
                        discordUser ? (
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {/* Profile dropdown */}
                                <div className="ml-3 relative">
                                    <div>
                                        <button type="button" id='user-menu' onClick={toggleUserMenu} className="bg-gray-800 flex text-sm rounded-full text-white dark:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-expanded="false" aria-haspopup="true">
                                            <span className="sr-only">Open user menu</span>
                                            <img className="h-8 w-8 rounded-full" src={`https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`} alt="" />
                                        </button>
                                    </div>
                                    {/* 
                                        Profile dropdown panel, show/hide based on dropdown state.
                                        Entering: "transition ease-out duration-100"
                                        From: "transform opacity-0 scale-95"
                                        To: "transform opacity-100 scale-100"
                                        Leaving: "transition ease-in duration-75"
                                        From: "transform opacity-100 scale-100"
                                        To: "transform opacity-0 scale-95"
                                    */}

                                    <div className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-600 ring-1 ring-white dark:ring-black ring-opacity-5 ${userMenuOpen ? 'block' : 'hidden'}`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                                        <Link href="/discord/auth" className="block rounded-sm px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500" role="menuitem">{discordUser.username}#{discordUser.discriminator}</Link>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    }
                </div>
            </div>
            {/* Mobile menu, show/hide based on menu state. */}
            {/* animate on open and close */}
            <div className={`sm:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 text-center ">
                    <NavbarButtons type="mobile" />
                    {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                    {/* <a href="#" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Dashboard</a>
                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Team</a>
                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</a>
                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Calendar</a> */}
                </div>
            </div>
        </nav>
    )
}


export function NavbarButtons({ type = 'desktop' }: { type?: 'mobile' | 'desktop' }) {

    const pathname = usePathname()

    let className = "text-gray-300 hover:bg-indigo-500 dark:hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
    if (type === 'desktop') {
        className += " text-sm"
    }
    else if (type === 'mobile') {
        className += " rounded-md text-base text-center"
    }
    let activeStyle = className + ` text-white ${type === 'desktop' ? 'bg-indigo-800 dark:bg-gray-900' : 'font-bold'} `
    return (
        <>
            <Link href="/" className={pathname?.includes("/dashboard") ? activeStyle : className} aria-current="page" >Home</Link>
            <Link href="/discord" className={pathname?.includes("/discord") ? activeStyle : className} aria-current="page" >Discord tools</Link>
            <Link href="/tools" className={pathname?.includes("/tools") ? activeStyle : className} aria-current="page" >Other tools</Link>
        </>
    )

}

