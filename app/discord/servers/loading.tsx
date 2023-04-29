'use client'

import Section from "#/components/Section"
import { GuildInfoSkeleton } from "./@guildInput/page"
import { GuildInfoCardSkeleton } from "./@guilds/GuildInfoCard"

export default function Loading() {
    return (
        <>

            <Section title="Invite Info">
                <form className="flex flex-col" onSubmit={e => e?.preventDefault()}>
                    <label htmlFor="invite-or-id" className="text-gray-700 dark:text-gray-400">Invite URL or Guild ID</label>
                    <input type="text" id="invite-or-id" name="invite-or-id" className="border border-gray-300 rounded-md p-2" />
                    <button type="submit" className="bg-blue-500 text-white rounded-md p-2 mt-2">
                        Get Invite Info
                    </button>
                </form>
                <GuildInfoSkeleton />

            </Section>

            <Section title="Your Servers">
                <GuildsLoading />
            </Section>


        </>
    )
}

export function GuildsLoading() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <GuildInfoCardSkeleton />
            <GuildInfoCardSkeleton />
            <GuildInfoCardSkeleton />
            <GuildInfoCardSkeleton />
            <GuildInfoCardSkeleton />
            <GuildInfoCardSkeleton />
            <GuildInfoCardSkeleton mobile />
            <GuildInfoCardSkeleton mobile />
            <GuildInfoCardSkeleton mobile />
            <GuildInfoCardSkeleton mobile />
        </div>
    )
}
