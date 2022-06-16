'use client'
import { GuildsLoading } from "./loading";
import Section from "#/components/Section";
import GuildInfoCard from "#/app/discord/servers/GuildInfoCard";
import useGuilds from "#/requests/getGuilds";
import { UnauthorizedError } from "#/components/Errors";
import GuildInfo from "./GuildInfo";


export default function Tools() {

    const { guilds, isError, isLoading, isLoggedOut } = useGuilds()

    return (
        <>
            <Section title="Server Info">
                <GuildInfo />
            </Section>

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


// function permissionToName(permission: Permissions) {
//     const has = []
//     const keyPerms = []
//     const perm = BigInt(permission)

//     if (perm & BigInt(PermissionFlagsBits.Administrator)) {
//         has.push('Administrator')
//         keyPerms.push('*Administrator*')
//         return "*Administrator*"
//     }

//     if (perm & BigInt(PermissionFlagsBits.AddReactions)) {
//         has.push('Add Reactions')
//     }

//     if (perm & BigInt(PermissionFlagsBits.AttachFiles)) {
//         has.push('Attach Files')
//     }

//     if (perm & BigInt(PermissionFlagsBits.BanMembers)) {
//         has.push('Ban Members')
//     }

//     if (perm & BigInt(PermissionFlagsBits.ChangeNickname)) {
//         has.push('Change Nickname')
//     }

//     if (perm & BigInt(PermissionFlagsBits.Connect)) {
//         has.push('Connect')
//     }

//     if (perm & BigInt(PermissionFlagsBits.CreateInstantInvite)) {
//         has.push('Create Instant Invite')
//     }

//     if (perm & BigInt(PermissionFlagsBits.DeafenMembers)) {
//         has.push('Deafen Members')
//     }

//     if (perm & BigInt(PermissionFlagsBits.EmbedLinks)) {
//         has.push('Embed Links')
//         keyPerms.push('Send Messages')
//     }

//     if (perm & BigInt(PermissionFlagsBits.KickMembers)) {
//         has.push('Kick Members')
//     }

//     if (perm & BigInt(PermissionFlagsBits.ManageChannels)) {
//         has.push('Manage Channels')
//     }

//     if (perm & BigInt(PermissionFlagsBits.ManageEmojisAndStickers)) {
//         has.push('Manage Emojis')
//     }

//     if (perm & BigInt(PermissionFlagsBits.ManageGuild)) {
//         has.push('Manage Guild')
//     }

//     if (perm & BigInt(PermissionFlagsBits.ManageMessages)) {
//         has.push('Manage Messages')
//     }

//     if (perm & BigInt(PermissionFlagsBits.ManageNicknames)) {
//         has.push('Manage Nicknames')
//     }

//     if (perm & BigInt(PermissionFlagsBits.ManageRoles)) {
//         has.push('Manage Roles')
//     }

//     if (perm & BigInt(PermissionFlagsBits.ManageWebhooks)) {
//         has.push('Manage Webhooks')
//     }

//     if (perm & BigInt(PermissionFlagsBits.MentionEveryone)) {
//         has.push('Mention Everyone')
//     }

//     if (perm & BigInt(PermissionFlagsBits.MoveMembers)) {
//         has.push('Move Members')
//     }

//     if (perm & BigInt(PermissionFlagsBits.MuteMembers)) {
//         has.push('Mute Members')
//     }

//     if (perm & BigInt(PermissionFlagsBits.PrioritySpeaker)) {
//         has.push('Priority Speaker')
//     }

//     if (perm & BigInt(PermissionFlagsBits.ReadMessageHistory)) {
//         has.push('Read Message History')
//     }

//     if (perm & BigInt(PermissionFlagsBits.ReadMessageHistory)) {
//         has.push('Read Messages')
//     }

//     if (perm & BigInt(PermissionFlagsBits.RequestToSpeak)) {
//         has.push('Request To Speak')
//     }

//     // if (keyPerms.length){
//     //     keyPerms.unshift('(key permissions) ')
//     //     return keyPerms.join(', ')
//     // }

//     if (!has.length) {
//         return 'None'
//     }

//     return has.join(', ')
// }

