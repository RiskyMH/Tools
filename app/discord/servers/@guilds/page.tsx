'use client'

import Section from "#/components/Section";
import GuildInfoCard, { GuildInfoCardSkeleton } from "./GuildInfoCard";
import useGuilds from "#/requests/getGuilds";
import { UnauthorizedError } from "#/components/Errors.client";


export default function Tools() {

    const { guilds, isError, isLoading, isLoggedOut } = useGuilds()

    return (
        <>
            <Section title={guilds ? `Your Servers (${guilds.length})` : "Your Servers"}>

                {isLoggedOut ? (
                    <UnauthorizedError type="discord" />

                ) : guilds ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        {guilds?.map((guild) => <GuildInfoCard key={guild.id} guild={guild} />)}
                    </div>
                ) : (
                    isError
                        ? <p>Unknown error: {isError}</p>
                        : <GuildsLoading />
                )}

            </Section>

        </>
        // isLoggedOut ? (
        //     <UnauthorizedError type="discord" />
        // ) : guilds ? (
        //     <Section title="Servers">
        //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        //             {guilds?.map((guild) => <GuildInfoCard key={guild.id} guild={guild} />)}
        //         </div>
        //     </Section>
        // ) : (
        //     isError 
        //         ? <p>Unknown error {isError}</p> 
        //         : <Loading />
        // )

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

