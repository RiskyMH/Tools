import LeftMenu, { Contents } from "#/components/LeftMenu.client";
import type { Metadata } from "next";

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

export const metadata: Metadata = {
  title: {
    default: "Developing Tools",
    template: "%s | Tools",
  },
  description: "Not really tools, just some stuff with testing the website",
  robots: {
    index: false
  }
}

const ContentsForMenu: Contents[] = [
  {
    name: "General",
    subcategory: [
      {
        name: "Components",
        link: "/dev/components",
      },
    ]
  },
]
