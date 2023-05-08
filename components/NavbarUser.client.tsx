'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import useUser from "#/requests/getUser";

export default function NavbarUser() {

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

    return discordUser && (
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
    )

}
