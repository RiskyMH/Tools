'use client'

import Section from "#/components/Section"

export default function Loading() {
    return (
        <>
            <Section title="Your User Info">
                <UserInfoLoading />
            </Section>

            <Section title="User Info">
                TODO...
            </Section>

            <Section title="Application Info">
                TODO...
            </Section>
        </>

    )
}

export function UserInfoLoading() {
    return (
        <p>loading...</p>
    )

}