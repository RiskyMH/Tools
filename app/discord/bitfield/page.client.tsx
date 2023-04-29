'use client';

import Section from "#/components/Section";
import { toSentenceCase } from "#/util";
import { PermissionFlagsBits } from "discord-api-types/v10";
import { useEffect, useState } from "react";


export default function BitfieldPage() {

    const [bitfield, setBitfield] = useState(BigInt(0));


    useEffect(() => {

        if (sessionStorage.getItem('permissions')) {
            setBitfield(BigInt(sessionStorage.getItem('permissions') || 0));
            sessionStorage.removeItem('permissions');
        }

    }, []);


    function updateBitfield(e: React.ChangeEvent<HTMLInputElement>) {
        const num = (Number(e.target.value) ? BigInt(e.target.value) : null) || BigInt(0);
        setBitfield(num);
    }

    const clickCheckbox = (num: bigint) => () => setBitfield(bitfield ^ num);


    function Permission({ permissions }: { permissions: PermissionList[] }) {
        return (
                <>
                    {
                    permissions.map((permission) => (
                        <div key={permission.bitfield.toString()} onClick={clickCheckbox(permission.bitfield)} id={permission.bitfield.toString()} className='cursor-pointer p-0.5 m-1 pl-0 items-center'>
                            <input type="checkbox" className="w-5 h-5" id={permission.name} defaultChecked={(bitfield & permission.bitfield) === permission.bitfield} />
                            <label htmlFor={permission.name} className="ml-1 cursor-pointer text-gray-800 dark:text-gray-300">{permission.name}</label>
                        </div>
                    ))
                }
            </>
        )
    }

    return (
        <>
            <Section title="Permissions">
                {/* lots of checkboxes and an input box for permission bitfield */}
                <div className="p-4 bg-gray-200 dark:bg-gray-800 m-2 rounded-xl">
                    <label htmlFor="bitfield" className="text-gray-700 dark:text-gray-400">Bitfield:</label>
                    {/* <br /> */}
                    <input type="text" id='bitfield' value={bitfield.toString()} className='mt-1 lg:mt-0 lg:ml-2 w-full lg:w-auto bg-gray-100 dark:bg-gray-900 p-1 pl-2 rounded-lg focus:ring-white focus:ring-2 ring-blue-500' onChange={updateBitfield} />
                </div>
                <div className="mt-5 lg:flex lg:col">
                    {/* <div className=""> */}
                    {/* {   // map over permission flags and create a checkbox for each
                        Object.entries(PermissionFlagsBits).map(([key, value]) => (
                            <div key={value.toString()} onClick={clickCheckbox(value)} id={key} className='cursor-pointer'>
                                <input type="checkbox" checked={(bitfield & value) === value} />
                                <label htmlFor={key} className="ml-1">{toSentenceCase(key)}</label>
                            </div>
                        ))

                    } */}
                    <div className="lg:w-1/3 mt-4 p-4 bg-gray-200 dark:bg-gray-800 m-2 rounded-xl">
                        <h3 className="text-lg font-bold">General Permissions</h3>
                        <Permission permissions={generalPermissions} />
                    </div>

                    <div className="lg:w-1/3 mt-4 p-4 bg-gray-200 dark:bg-gray-800 m-2 rounded-xl">
                        <h3 className="text-lg font-bold">Text Permissions</h3>
                        <Permission permissions={textPermissions} />
                    </div>

                    <div className="lg:w-1/3 mt-4 p-4 bg-gray-200 dark:bg-gray-800 m-2 rounded-xl">
                        <h3 className="text-lg font-bold">Voice Permissions</h3>
                        <Permission permissions={voicePermissions} />
                    </div>
                    {
                        otherPermissions.length > 0 &&
                        <div className="lg:w-1/3 mt-4 p-4 bg-gray-200 dark:bg-gray-800 m-2 rounded-xl">
                            <h3 className="text-lg font-bold">Other Permissions</h3>
                            <Permission permissions={otherPermissions} />
                        </div>
                    }
                    {/* </div> */}
                </div>



            </Section>

            <Section title="Badges">
                {/* Like permissions, make an easy to customize user badges */}
                TODO...

            </Section>
        </>

    )
}

type PermissionList = {
    name: string;
    bitfield: bigint;
    description?: string;
}


const generalPermissions = [
    {
        name: 'Administrator',
        bitfield: PermissionFlagsBits.Administrator,
        description: 'Members with this permission will have every permission and will also bypass all channel specific permissions or restrictions (for example, these members would get access to all private channels). **This is a dangerous permission to grant**'
    },
    {
        name: 'View Audit Log',
        bitfield: PermissionFlagsBits.ViewAuditLog,
        description: 'Allows members to view a record of who made which changes in this server.'
    },
    {
        name: 'Manage Server',
        bitfield: PermissionFlagsBits.ManageGuild,
        description: "Allow members to change this server's name, switch regions, view all invites, add bots to this server and create and update AutoMod rules."
    },
    {
        name: 'Manage Roles',
        bitfield: PermissionFlagsBits.ManageRoles,
        description: 'Allows members to create new roles and edit or delete roles lower than their highest role. Also allows members to change permissions of individual channels that they have access to.'
    },
    {
        name: 'Manage Channels',
        bitfield: PermissionFlagsBits.ManageChannels,
        description: 'Allows members to create, edit, or delete channels.'
    },
    {
        name: 'Kick Members',
        bitfield: PermissionFlagsBits.KickMembers,
        description: 'Allows members to remove other members from this server. Kicked members will be able to rejoin if they have another invite.'
    },
    {
        name: 'Ban Members',
        bitfield: PermissionFlagsBits.BanMembers,
        description: 'Allows members to permanently ban other members from this server.'
    },
    {
        name: 'Create Instant Invite',
        bitfield: PermissionFlagsBits.CreateInstantInvite,
        description: 'Allows members to invite new people to this server.'
    },
    {
        name: 'Change Nickname',
        bitfield: PermissionFlagsBits.ChangeNickname,
        description: 'Allows members to change their own nickname, a custom name for just this server.'
    },
    {
        name: 'Manage Nicknames',
        bitfield: PermissionFlagsBits.ManageNicknames,
        description: 'Allows members to change the nicknames of other members.'
    },
    {
        name: 'Manage Emojis and Stickers',
        bitfield: PermissionFlagsBits.ManageEmojisAndStickers,
        description: 'Allows members to add or remove custom emoji and stickers in this server.'
    },
    {
        name: 'Manage Webhooks',
        bitfield: PermissionFlagsBits.ManageWebhooks,
        description: 'Allows members to create, edit, or delete webhooks, which can post messages from other apps or sites into this server.'
    },
    {
        name: 'Read Messages/View Channels',
        bitfield: PermissionFlagsBits.ViewChannel,
        description: 'Allows members to view channels by default (excluding private channels).'
    },
    {
        name: 'Manage Events',
        bitfield: PermissionFlagsBits.ManageEvents,
        description: 'Allows members to create, edit, and cancel events.'
    },
    {
        name: 'Moderate Members',
        bitfield: PermissionFlagsBits.ModerateMembers,
        description: 'When you put a user in timeout they will not be able to send messages in chat, reply within threads, react to messages, or speak in voice or Stage channels.'
    },
    {
        name: 'View Server Insights',
        bitfield: PermissionFlagsBits.ViewGuildInsights,
        description: 'Allows members to view Server Insights, which shows data on community growth, engagement, and more.'
    },
    // {
    //     name: 'View Creator Monetization Insights',
    //     bitfield: PermissionFlagsBits,
    // }

]

const textPermissions: PermissionList[] = [
    {
        name: 'Send Messages',
        bitfield: PermissionFlagsBits.SendMessages,
        description: 'Allow members to send messages in text channels and create posts in forum channels.'
    },
    {
        name: 'Create Public Threads',
        bitfield: PermissionFlagsBits.CreatePublicThreads,
        description: 'Allow members to create threads that everyone in a channel can view.'
    },
    {
        name: 'Create Private Threads',
        bitfield: PermissionFlagsBits.CreatePrivateThreads,
        description: 'Allow members to create invite-only threads.'
    },
    {
        name: 'Send Messages in Threads',
        bitfield: PermissionFlagsBits.SendMessagesInThreads,
        description: 'Allow members to send messages in threads and in posts on forum channels.'
    },
    {
        name: 'Send TTS Messages',
        bitfield: PermissionFlagsBits.SendTTSMessages,
        description: 'Allows members to send text-to-speech messages by starting a message with /tts. These messages can be heard by anyone focused on the channel.'
    },
    {
        name: 'Manage Messages',
        bitfield: PermissionFlagsBits.ManageMessages,
        description: 'Allows members to delete messages by other members or pin any message.'
    },
    {
        name: 'Manage Threads',
        bitfield: PermissionFlagsBits.ManageThreads,
        description: 'Allows members to rename, delete, close, and turn on slow mode for threads and posts. They can also view private threads.'
    },
    {
        name: 'Embed Links',
        bitfield: PermissionFlagsBits.EmbedLinks,
        description: 'Allows links that members share to show embedded content in text channels.'
    },
    {
        name: 'Attach Files',
        bitfield: PermissionFlagsBits.AttachFiles,
        description: 'Allows members to upload files or media in text channels.'
    },
    {
        name: 'Read Message History',
        bitfield: PermissionFlagsBits.ReadMessageHistory,
        description: 'Allows members to read previous messages sent in channels. If this permission is disabled, members only see messages sent when they are online and focused on that channel.'
    },
    {
        name: 'Mention Everyone',
        bitfield: PermissionFlagsBits.MentionEveryone,
        description: 'Allows members to use @everyone (everyone in the server) or @here (only online members in that channel). They can also @mention all roles, even if the role’s “Allow anyone to mention this role” permission is disabled.'
    },
    {
        name: 'Use External Emojis',
        bitfield: PermissionFlagsBits.UseExternalEmojis,
        description: 'Allows members to use emoji from other servers, if they’re a Discord Nitro member.'
    },
    {
        name: 'Use External Stickers',
        bitfield: PermissionFlagsBits.UseExternalStickers,
        description: 'Allows members to use stickers from other servers, if they’re a Discord Nitro member.'
    },
    {
        name: 'Add Reactions',
        bitfield: PermissionFlagsBits.AddReactions,
        description: 'Allows members to add new emoji reactions to a message. If this permission is disabled, members can still react using any existing reactions on a message.'
    },
    {
        name: 'Use Slash Commands',
        bitfield: PermissionFlagsBits.UseApplicationCommands,
        description: 'Allows members to use commands from applications, including slash commands and context menu commands.'
    },

]

const voicePermissions: PermissionList[] = [
    {
        name: 'Connect',
        bitfield: PermissionFlagsBits.Connect,
        description: 'Allows members to join voice channels and hear others.'
    },
    {
        name: 'Speak',
        bitfield: PermissionFlagsBits.Speak,
        description: 'Allows members to talk in voice channels. If this permission is disabled, members are default muted until somebody with the “Mute Members” permission un-mutes them.'
    },
    {
        name: 'Video',
        bitfield: PermissionFlagsBits.Stream,
        description: 'Allows members to share their video, screen share, or stream a game in this server.'
    },
    {
        name: 'Mute Members',
        bitfield: PermissionFlagsBits.MuteMembers,
        description: 'Allows members to mute other members in voice channels for everyone.'
    },
    {
        name: 'Deafen Members',
        bitfield: PermissionFlagsBits.DeafenMembers,
        description: 'Allows members to deafen other members in voice channels, which means they won’t be able to speak or hear others.'
    },
    {
        name: 'Move Members',
        bitfield: PermissionFlagsBits.MoveMembers,
        description: 'Allows members to move other members between voice channels that the member with this permission has access to.'
    },
    {
        name: 'Use Voice Activity',
        bitfield: PermissionFlagsBits.UseVAD,
        description: 'Allows members to speak in voice channels by simply talking. If this permission is disabled, members are required to use Push-to-talk. Good for controlling background noise or noisy members.'
    },
    {
        name: 'Priority Speaker',
        bitfield: PermissionFlagsBits.PrioritySpeaker,
        description: 'Allows members to be more easily heard in voice channels. When activated, the volume of others without this permission will be automatically lowered. Priority Speaker is activated by using the **Push to Talk (Priority)**  keybind.'
    },
    {
        name: 'Request to Speak',
        bitfield: PermissionFlagsBits.RequestToSpeak,
        description: 'Allow requests to speak in Stage channels. Stage moderators manually approve or deny each request.'
    },
    {
        name: 'Use Embedded Activities',
        bitfield: PermissionFlagsBits.UseEmbeddedActivities,
        description: 'Allows members to use Activities in this server.'
    }
]

const otherPermissions: PermissionList[] = []

// Go through the PermissionFlagsBits and if not in the above lists, add to otherPermissions
for (const [key, value] of Object.entries(PermissionFlagsBits)) {
    if (![...generalPermissions, ...textPermissions, ...voicePermissions].some(p => p.bitfield === value)) {
        otherPermissions.push({
            name: toSentenceCase(key),
            bitfield: value,
            description: ''
        })
    }
}
