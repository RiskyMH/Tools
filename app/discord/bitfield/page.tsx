import type { Metadata } from "next";
import BitfieldPage from "./page.client"

export default function Tools() {
    // All the code is in the page.client.tsx file so that metadata can be used
    return <BitfieldPage />;

}


export const metadata: Metadata = {
    title: "Bitfield",
    description: "Bitfield tools (discord permissions)",
}
