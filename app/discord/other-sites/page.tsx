import Section from "#/components/Section";
import type { Metadata } from "next";

export default function Tools() {

    return (
        <Section title="Some useful websites">
            <ol className="list-disc list-inside ">
                <li>
                    <Link url="https://flags.lewisakura.moe/" title="Discord flags" extra="(includes undocumented)" />
                </li>
                <li>
                    <Link url="https://libs.advaith.io/" title="Discord Library Comparisons" />
                </li>
                <li>
                    <Link url="https://discordresources.com/" title="Even more tools" extra="(another list of useful things)" />
                </li>
            </ol>
        </Section>
    )
}

export const metadata: Metadata = {
    title: 'Other Useful Websites',
    description: 'Some useful websites for Discord bots and more',
}

function Link({ url, title, extra }: { url: string, title: string, extra?: string }) {
    return (
        <>
            <a href={url} className="text-blue-400 hover:underline" target="_blank" rel="noreferrer" >
                {title}
            </a>
            {extra && <span className="text-gray-400"> {extra}</span>}
        </>
    )
}