import Section from "#/components/Section"
import Link from "next/link"
import type { PropsWithChildren } from "react"

export default function Loading() {
    return (
        <>
            <UpdatedSection title="General Tools">
                <ButtonLink url='/discord/snowflake' text='Snowflake' description="Snowflake" />
                <ButtonLink url='/discord/bitfield' text='Permissions' description="Make a permission bitfield make sense" />
            </UpdatedSection>

            <UpdatedSection title="User Tools">
                <ButtonLink url='/discord/userinfo' text='User Info' description="Get information about a user" />
                <ButtonLink url='/discord/servers' text='Servers' description="Look at your servers" />
                <ButtonLink url='/discord/snowflake' text='Snowflake' description="Snowflake" />
            </UpdatedSection>
        </>
    )
}

export const metadata = {
    title: {
        absolute: "Discord Tools"
    }
}

function UpdatedSection({ title, children }: PropsWithChildren<{ title: string }>) {
    return (
        <Section title={title}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {children}
            </div>
        </Section>
    )
}


function ButtonLink({ url, text, description }: { url: string, text: string, description: string }) {
    return (
        <Link href={url} className="flex flex-col items-center justify-center p-4 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300/50 dark:hover:bg-gray-700/50 rounded-md shadow-md hover:shadow-lg  transition-shadow duration-200">
            <h1 className="text-2xl font-bold">{text}</h1>
            <p className="text-gray-400 text-center">{description}</p>
        </Link>
    )
}