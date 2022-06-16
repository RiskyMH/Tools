'use client';

import LeftMenu, { Contents } from "#/components/LeftMenu";
import { VerifiedBotIcon } from "#/icons/discord-badges";

export default function DashboardLayout({ children }: { children: React.ReactNode, }) {

  return (
    <>
      {/* <Navbar mobileMenu={{ mobileMenuOpen, setMobileMenuOpen }} /> */}
      <div className="sm:grid sm:grid-cols-10 sm:gap-2 h-full min-h-[calc(100vh-8rem)] lg:min-h-[calc(100vh-4rem)]">
        <div className="sm:col-span-2 md:col-span-1 w-full">
          <LeftMenu contents={ContentsForMenu} />
        </div>
        <main className="sm:col-span-8 p-4 sm:ml-16 md:ml-36 ">
          {children}
        </main>
      </div>
    </>
  );
}


const ContentsForMenu: Contents[] = [
  {
    name: "General",
    subcategory: [
      {
        name: "Word Counter",
        link: "/tools/words",
      },
    ]
  },
]
