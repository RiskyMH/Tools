import NavbarUser from "./NavbarUser.client";
import NavbarButtons from "./NabvarButtons.client";

export default function Navbar() {

    return (
        <nav className="bg-indigo-600 dark:bg-gray-800">

            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start text-white">
                        <div className="flex-shrink-0 flex items-center font-bold select-none">
                            <img className="block text-2xl h-8 w-8" src="/hammer_and_wrench_color.svg" alt="🛠️" />
                            <p className="text-xl ml-3 tracking-wide">Tools</p>
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                <NavbarButtons />
                            </div>
                        </div>
                    </div>

                    <NavbarUser />
                </div>
            </div>

            {/* Mobile menu, show/hide based on menu state. */}
            {/* animate on open and close */}
            <div className="sm:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 text-center ">
                    <NavbarButtons type="mobile" />
                </div>
            </div>
        </nav>
    )
}


