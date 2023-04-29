import type { Metadata } from "next";
import WordCounter from "./page.client"

export default function Tools() {
    // All the code is in the page.client.tsx file so that metadata can be used
    return <WordCounter />;

}


export const metadata: Metadata = {
    title: "Word Counter",
    description: "Count the number of words in a text",
}
