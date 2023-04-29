'use client';

import Close from "#/icons/Close";
import Hamburger from "#/icons/Hamburger";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactComponentElement, useEffect, useState } from "react";


export interface Contents {
    /** The name of the subcategory */
    name: string;
    subcategory: {
        /** The name of the link */
        name: string;
        /** The link */
        link: string;
        /** The icon */
        // icon?: ReactComponentElement<"svg">;
    }[];
}


export default function LeftMenu({ contents, ...props }: { contents: Contents[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const close = () => setIsOpen(false);


    const pathname = usePathname();

    useEffect(() => {
        close();
    }, [pathname]);

    useEffect(() => {
        // Make the main content hidden when the menu is open
        const element = document.querySelector("main");

        if (isOpen) {
            (element as HTMLElement).style.display = "none";
        } else {
            (element as HTMLElement).style.display = "";
        }

        // on screen size change, close the menu
        const mediaQuery = window.matchMedia("(min-width: 640px)");

        const handleScreenChange = (e: MediaQueryListEvent) => {
            if (e.matches) {
                close();
            }
        };

        mediaQuery.addEventListener("change", handleScreenChange);

        return () => {
            (element as HTMLElement).style.display = "";
            mediaQuery.removeEventListener("change", handleScreenChange);
        };

    }, [isOpen])

    return (
        <>
            <button type="button"
                className="absolute left-0 top-0 flex items-center p-2 m-2 mt-3 sm:hidden rounded-md hover:text-black text-gray-300 dark:hover:text-white hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black dark:focus:ring-white"
                onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? (
                    <Close />
                ) : (
                    <Hamburger />
                )}
            </button>
            {/* <div className=""> */}
            {/* <aside className={`w-4/5 sm:w-[6.5rem] md:w-[10rem] lg:w-[15rem] fixed h-screen bg-gray-900 text-white block ${mobileShow? '' : 'sm:block hidden'}`}> */}
            <aside className={`overflow-y-auto h-full w-full bg-gray-200 dark:bg-gray-900 sm:border-gray-300 dark:sm:border-gray-800 z-50 lg:bottom-0 lg:z-auto lg:w-22 md:w-44 lg:border-r block sm:block ${isOpen ? 'fixed inset-x-0 top-28 -mt-1' : 'hidden'}`}>
                <nav className="relative space-y-6 px-2 py-5 w-full h-full">
                    {contents.map((content) => (
                        <div key={content.name}>
                            <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-600">
                                {content.name}
                            </h3>
                            <div className="space-y-1">
                                {content.subcategory.map((subcategory) => (
                                    <Link
                                        // prefetch={false}
                                        key={subcategory.name}
                                        href={subcategory.link}
                                        onClick={() => pathname?.startsWith(subcategory.link) && close()}
                                        className={`block rounded-md px-3 py-2 text-sm font-medium hover:text-gray-800 dark:hover:text-gray-300 ${pathname?.startsWith(subcategory.link) ? "text-gray-900 dark:text-gray-200" : "text-gray-600 hover:bg-gray-300 dark:text-gray-500 dark:hover:bg-gray-800"}`}
                                    >
                                        {/* {subcategory.icon} */}
                                        {subcategory.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>
            </aside>
            {/* </div> */}
        </>
    );

}



// {/* <div className={`absolute inset-y-0 left-0 flex items-center sm:hidden ${mobileMenu ? '' : 'hidden'}`}>
//     {/* Mobile menu button*/}
//     <button type="button" onClick={toggleMobileMenu} id='' className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black dark:focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
//         <span className="sr-only">Open main menu</span>
//         {/* Icon when menu is closed. */}
//         {/* Menu open: "hidden", Menu closed: "block" */}
//         <svg className={`h-6 w-6 ${!mobileMenuOpen ? 'block' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//         </svg>
//         {/* Icon when menu is open. */}
//         {/* Menu open: "block", Menu closed: "hidden" */}
//         <svg className={`h-6 w-6 ${mobileMenuOpen ? 'block' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//         </svg>
//     </button>
// </div> */}
