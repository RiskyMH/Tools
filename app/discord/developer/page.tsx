import type { Metadata } from "next";
import DeveloperPage from "./page.client"

export default function Tools() {
    // All the code is in the page.client.tsx file so that metadata can be used
    return <DeveloperPage />;

}


export const metadata: Metadata = {
    title: "Developer",
    description: "Developer tools...",
}
