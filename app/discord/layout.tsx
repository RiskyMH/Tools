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
    default: "Discord Tools",
    template: "%s | Discord Tools",
  },
  description: "Some tools for Discord"
}

const ContentsForMenu: Contents[] = [
  {
    name: "General",
    subcategory: [
      {
        name: "Snowflake",
        link: "/discord/snowflake",
      },
      {
        name: "Permissions",
        link: "/discord/bitfield",
      }
    ]
  },
  {
    name: "User",
    subcategory: [
      {
        name: "User Info",
        link: "/discord/userinfo",
      },
      {
        name: "Servers",
        link: "/discord/servers",
      },
    ]
  },
  {
    name: "More Things",
    subcategory: [
      {
        name: "Developer",
        link: "/discord/developer",
      },
      {
        name: "Other sites",
        link: "/discord/other-sites",
      },
    ]
  }
]
