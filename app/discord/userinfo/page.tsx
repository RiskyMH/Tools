import type { Metadata } from "next";
import UserInfo from "./page.client"

export default function Tools() {
    // All the code is in the page.client.tsx file so that metadata can be used
    return <UserInfo />;

}


export const metadata: Metadata = {
    title: "User Info",
    description: "Get information about a user",
}
