// This is for guild info
// It allows for an invite or guild id to be passed in
// It will fetch the guild info and display it
// - if it is an invite, it will fetch the data from the invite (invite api)
// - if it is a guild id, it will fetch the data from the guild id (widget api)
// They will ues each other to get the data
// - if invite, uses guild id for widget api
// - if guild id, uses instant invite for invite api
// But they might have both or none...

import useGuildWidget from "#/requests/getGuildWidget"
import useInvite from "#/requests/getInvite"
import { defaultAvatar, guildIcon } from "#/util"
import { FormEvent, useEffect, useState } from "react"


function getInviteCode(str: string): string | null {
    const inviteRegex = /^(?:https?:\/\/)?(?:www\.)?(?:discord\.(?:gg|com\/invite)\/|discord\.com\/api\/v\d\/invite\/)([a-zA-Z0-9-]{2,})$/
    const inviteMatch = str.match(inviteRegex)
    return inviteMatch ? inviteMatch[1] : null
}

function getInviteOrId(str: string): { code: string | null, id: string | null } {
    const idRegex = /(^\d{17,19}$)/

    const idMatch = str.match(idRegex)

    return {
        code: getInviteCode(str),
        id: idMatch ? idMatch[1] : null,
    }

}

export default function GuildInfo() {
    // input for guild id
    // - xxx

    const [guildId, setGuildId] = useState<string | null | undefined>(null)
    const { widget, isError: widgetError, isLoading: isWidgetLoading, isNotExist: isWidgetNotExist, mutate: mutateWidget, isDisabled: isWidgetDisabled } = useGuildWidget(guildId || '')
    const [inviteCode, setInviteCode] = useState<string | null | undefined>(null)
    const { invite, isError: inviteError, isLoading: isInviteLoading, isNotExist: isInviteNotExist, mutate: mutateInvite } = useInvite(inviteCode || '', true)

    const [whichFirst, setWhichFirst] = useState<'widget' | 'invite' | 'invalid' | null>(null)

    function setInput(event?: FormEvent<HTMLFormElement>) {
        event?.preventDefault()

        // @ts-expect-error
        const input = document.getElementById('invite-or-id')?.value
        const { code, id } = getInviteOrId(input)

        if (code === inviteCode || id === guildId) {
            // mutate and set both to null
            mutateInvite(null as any)
            mutateWidget(null as any)

            setInviteCode(null)
            setGuildId(null)
        }

        // try to get invite first
        if (id) {
            setGuildId(id)
            setInviteCode(null)
            setWhichFirst('widget')
        } else if (code) {
            setInviteCode(code)
            setGuildId(null)
            setWhichFirst('invite')
        } else {
            setInviteCode(null)
            setGuildId(null)
            setWhichFirst('invalid')
        }
    }


    useEffect(() => {
        if (invite?.guild?.id && whichFirst === 'invite') {
            setGuildId(invite.guild.id)
        }

        if (widget?.instant_invite && whichFirst === 'widget') {
            setInviteCode(getInviteCode(widget.instant_invite))
        }

    }, [invite, widget, whichFirst])

    const inviteUrl = () => `discord.gg/${invite?.code || getInviteCode(widget?.instant_invite ?? '')}`

    const [currentInput, setCurrentInput] = useState('')

    return (
        <>
            <form className="flex flex-col" onSubmit={setInput}>
                <label htmlFor="invite-or-id" className="text-gray-700 dark:text-gray-400">Invite URL or Guild ID</label>
                <input type="text" id="invite-or-id" name="invite-or-id" className="border border-gray-300 rounded-md p-2" onChange={(a) => setCurrentInput(a.target.value)} />
                <button type="submit" className="bg-blue-500 text-white rounded-md p-2 mt-2">{
                    (isInviteLoading || isWidgetLoading) ? 'Loading...' :
                        // currentInput === '' ? 'Get Guild Info' :
                        getInviteOrId(currentInput).code ? 'Get Invite Info' :
                            getInviteOrId(currentInput).id ? 'Get Guild Info (ID)' :
                                'Get Guild Info'
                }</button>
            </form>

            {/* Use both data (the user shouldn't know where the data is sourced from) */}
            {/* But it can still be only from one */}

            {/* The guild (name and icon and avatar) */}
            {/* - if invite, use invite guild data */}
            {/* - if guild id, use guild id data (but preferred invite)*/}

            {(invite || widget) ? (
                <div className="flex flex-col p-5">
                    <>
                        <div className="flex flex-row">
                            <img src={invite?.guild ? guildIcon(invite.guild, { animated: true }) : defaultAvatar(0)} alt="guild icon" className="w-10 h-10 rounded-md" />
                            <div className="flex flex-col ml-2">
                                <h1 className="text-xl font-bold">{invite?.guild?.name ?? widget?.name}</h1>
                                <p className="text-gray-500 dark:text-gray-400">{invite?.guild?.description}</p>
                            </div>
                        </div>

                        <div className="flex flex-row">
                            {invite?.approximate_member_count &&
                                <div className="flex flex-col">
                                    <p className="text-gray-500 dark:text-gray-400">Members</p>
                                    <p className="text-gray-700 dark:text-gray-300">{invite.approximate_member_count}</p>
                                </div>
                            }
                            {(invite?.approximate_presence_count || widget?.presence_count) &&
                                <div className="flex flex-col ml-4">
                                    <p className="text-gray-500 dark:text-gray-400">Online</p>
                                    <p className="text-gray-700 dark:text-gray-300">{invite?.approximate_presence_count ?? widget?.presence_count}</p>

                                </div>
                            }
                            {(invite?.code || widget?.instant_invite) &&
                                <div className="flex flex-col ml-4">
                                    <p className="text-gray-500 dark:text-gray-400">{invite?.code === invite?.guild?.vanity_url_code ? "Vanity Invite" : "Invite"}</p>
                                    <a className="text-blue-500 hover:underline" href={`https://${inviteUrl()}`} target='_blank'>{inviteUrl()}</a>
                                </div>
                            }

                            {invite?.expires_at &&
                                <div className="flex flex-col ml-4">
                                    <p className="text-gray-500 dark:text-gray-400">Invite Expires</p>
                                    <p className="text-gray-700 dark:text-gray-300">{new Date(invite.expires_at).toLocaleString()}</p>
                                </div>
                            }

                            {/* vanity invite code (only if the normal isn't it) */}
                            {invite?.guild?.vanity_url_code && invite?.code !== invite.guild.vanity_url_code &&
                                <div className="flex flex-col ml-4">
                                    <p className="text-gray-500 dark:text-gray-400">Vanity</p>
                                    <a className="text-blue-500 hover:underline" href={`https://discord.gg/${invite?.guild?.vanity_url_code}`} target='_blank'>{invite?.guild?.vanity_url_code}</a>
                                </div>
                            }

                            {/* server ID */}
                            <div className="flex flex-col ml-4">
                                <p className="text-gray-500 dark:text-gray-400">Server ID</p>
                                <p className="text-gray-700 dark:text-gray-300">{invite?.guild?.id ?? widget?.id}</p>
                            </div>


                        </div>
                        {/* the top 100 users' icon  */}
                        {widget?.members?.length &&
                            <div className="flex flex-row flex-wrap ">
                                {widget.members.map(member => (
                                    <img src={member.avatar_url} key={member.id} alt="user icon" title={`${member.username} (${member.status})`} className="w-10 h-10 rounded-full m-1" />
                                ))}

                            </div>
                        }
                    </>
                </div>
            ) : ((whichFirst === 'invite' && isInviteLoading) || (whichFirst === 'widget' && isWidgetLoading) || (isWidgetLoading && isInviteLoading)) ? (
                <GuildInfoSkeleton />
            ) : (whichFirst === 'invite' && isInviteNotExist) ? (
                <p>Invite not Found</p>
            ) : (whichFirst === 'widget' && isWidgetNotExist) ? (
                <p>Widget not Found</p>
            ) : (whichFirst === 'widget' && isWidgetDisabled) ? (
                <p>Widget not Enabled</p>
            ) : (whichFirst === 'invite' && inviteError) ? (
                <p>Invite Error</p>
            ) : (whichFirst === 'widget' && widgetError) ? (
                <p>Widget Error</p>
            ) : (
                <p>Enter an invite or guild id</p>
            )

            }
        </>
    )
}



// Skeleton for the guild info (one with input and one with the data - input contains the data)

export function GuildInfoSkeleton() {
    return (
        <div className="flex flex-col p-5">
            <div className="flex flex-row">
                <div className="w-10 h-10 rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse" />
                <div className="flex flex-col ml-2">
                    <div className="w-64 h-6 rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse" />
                    <div className="w-40 h-4 rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse mt-1" />
                </div>
            </div>

            <div className="flex flex-row mt-2">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex flex-col">
                        <div className="w-24 h-4 rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse" />
                        <div className="w-12 h-4 rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse mt-1" />
                    </div>
                ))}
            </div>
            {/* the top 100 users' icon  */}
            <div className="flex flex-row flex-wrap mt-2">
                {[...Array(100)].map((_, i) => (
                    <div key={i} className="w-10 h-10 rounded-full m-1 bg-gray-300 dark:bg-gray-700 animate-pulse" />
                ))}
            </div>
        </div>
    )
}