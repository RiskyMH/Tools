'use client'

import Section from "#/components/Section"
import Link from "next/link"
import { PropsWithChildren, useEffect } from "react"

export default function Loading() {
    useEffect(() => {
        document.title = "Discord Tools"
    })
    return (
        <>
            <UpdatedSection title="General">
                <ButtonLink url='/tools/words' text='Word Counter' description="Find out how many words is in your paragraph" />
            </UpdatedSection>
        </>
    )
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