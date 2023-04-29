import type { Metadata } from "next";
import ToolsPage from "./page.client"

export default function Tools() {
    // All the code is in the page.client.tsx file so that metadata can be used
    return <ToolsPage />;

}


export const metadata: Metadata = {
    title: {
        absolute: 'Login in...'
    },
    robots: {
        // this page should not be indexed
        index: false
    }
}
