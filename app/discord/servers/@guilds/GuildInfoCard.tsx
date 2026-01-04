'use client';

import ReadOnlyPermissionsTable from "#/components/ReadOnlyPermissions";
import Tooltip from "#/components/Tooltip";
import { ServerOwnerIcon, ServerPartneredIcon, ServerVerifiedIcon, StaffIcon } from "#/icons/discord-badges";
import { guildIcon, hasBitFlag } from "#/util";
import { APIGuild, GuildFeature, PermissionFlagsBits } from "discord-api-types/v10";
import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";

export default function GuildInfoCard({ guild }: { guild: APIGuild }) {
    // Make a clickable guild info card, onclick more info is shown
    const collapseElement = useRef<any>(null);

    const collapseCommand = useCallback(() => {
        const elem = collapseElement.current;
        if (elem.clientHeight) {
            elem.style.height = 0;
        } else {
            elem.style.height = elem.scrollHeight + "px";
        }
    }, []);

    const router = useRouter()


    // make a rectangle, left has icon and name, onclick (underneath) shows more info
    return (
        <div key={guild.id} className="shadow-none hover:shadow-inner hover:dark:shadow-gray-700 transition-shadow duration-200 bg-gray-200 dark:bg-gray-800 m-1 rounded-xl">
            <div onClick={collapseCommand} className="cursor-pointer flex bg-dark-3 p-3 pr-5 rounded-md items-center">
                {/* <div className=""> */}
                <img
                    src={guildIcon(guild, { size: 128 })}
                    alt="icon"
                    // className="flex-shrink-0 mr-3 rounded-full w-16 h-16"
                    className="rounded-[50%] w-16 h-16 hover:rounded-[35%] transition-[border-radius] duration-200 ease-in-out"
                    // style={{ transition: 'border-radius .2s ease-in-out' }}
                    // style={{ transition: 'border-radius 1s, border-top-left-radius 1s, border-top-right-radius 1s, border-bottom-left-radius 1s, border-bottom-right-radius 1s' }}
                    onMouseOver={(e) => e.currentTarget.src = guildIcon(guild, { size: 128, animated: true })}
                    onMouseOut={(e) => e.currentTarget.src = guildIcon(guild, { size: 128 })}
                />
                {/* </div> */}
                <div className="overflow-hidden flex-auto ml-3">
                    <div className="text-xl truncate">{guild.name}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">{guild.id}</div>
                </div>
                <div className="flex-shrink-0 flex items-center space-x-3">
                    {guild.owner && (
                        <Tooltip title="Owner">
                            <ServerOwnerIcon className="w-5 h-5" />
                        </Tooltip>
                    )}
                    {!guild.owner && guild.permissions && hasBitFlag(guild.permissions, PermissionFlagsBits.Administrator) && (
                        <Tooltip title="Administrator">
                            <StaffIcon className="w-5 h-5" />
                        </Tooltip>
                    )}
                    {guild.features.includes(GuildFeature.Partnered) && (
                        <Tooltip title="Partnered">
                            <ServerPartneredIcon className="w-5 h-5" />
                        </Tooltip>
                    )}
                    {guild.features.includes(GuildFeature.Verified) && (
                        <Tooltip title="Verified">
                            <ServerVerifiedIcon className="w-5 h-5" />
                        </Tooltip>
                    )}
                </div>
            </div>
            <div
                className="h-0 overflow-hidden transition-[height] duration-300"
                ref={collapseElement}>
                <div className="border-t-2 p-4 pt-2 border-gray-400 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                    {/* <div> */}
                    {guild.approximate_member_count && (
                        // green dot icon
                        <div className="ml-auto text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1 mb-3">
                            <span className="w-2 h-2 bg-green-500/80 rounded-full inline-block" />
                            {(guild.approximate_presence_count ?? 0).toLocaleString()} online
                            <span />
                            <span className="w-2 h-2 bg-gray-500/80 rounded-full inline-block" />
                            {guild.approximate_member_count.toLocaleString()} members
                        </div>
                    )}
                    {/* {guild.vanity_url_code ? <a href={`https://discord.gg/${guild.vanity_url_code}`} target="_blank" rel="noopener noreferrer">{`https://discord.gg/${guild.vanity_url_code}`}</a> : null} */}
                    <h3 className="font-semibold">Your Permissions:</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300" >
                        Permission bitfield:{' '}
                        {/* <Link href={{pathname: '/discord/bitfield', hash: guild.permissions}} draggable={false} > */}
                        <code className='cursor-pointer' onClick={() => {
                            router.push('/discord/bitfield');
                            sessionStorage.setItem('permissions', guild.permissions?.toString() ?? '0');
                        }}>
                            {guild.permissions}
                        </code>
                        {/* </Link> */}
                    </p>
                    {/* </div> */}
                    {guild.permissions &&
                        <div className="mt-2 text-sm font-normal flex">
                            <ReadOnlyPermissionsTable permissions={guild.permissions} />
                        </div>
                    }
                    {/* guild features list */}
                    {guild.features.length > 0 &&
                        <>
                            <div className="mt-8">
                                <h3 className="font-semibold">Features:</h3>
                            </div>
                            <div className="mt-2 text-sm font-normal flex">
                                <ul className={`list-disc list-inside ${guild.features.length > 1 ? 'md:columns-2' : 'columns-1'}  md:col-span-1 w-full`}>
                                    {guild.features.map(feature =>

                                        guildHasKnownFeature(feature)
                                            ? <li key={feature} id={feature} className='select-all w-fit ' onCopy={() => navigator.clipboard.writeText(feature)}>
                                                {toTitleCase(feature)}
                                            </li>

                                            : <span key={feature} title='Not documented' id={feature} className='select-all' onCopy={() => navigator.clipboard.writeText(feature)} >
                                                <Tooltip small title="Unknown feature">
                                                    <li id={feature} className="text-gray-500 dark:text-gray-400"  >
                                                        {toTitleCase(feature)}
                                                    </li>
                                                </Tooltip>
                                            </span>
                                    )}
                                    {/* {guild.features.map(feature =>

                                    <Tooltip small key={feature} title={knownFeatures[feature]?.alt ?? "Unknown feature"}>
                                        <li key={feature}>
                                            <span className={`${!knownFeatures[feature] && 'text-gray-500 dark:text-gray-400'}`}>
                                                {
                                                    knownFeatures[feature]?.url
                                                        ? <a className="hover:underline" href={knownFeatures[feature]?.url}>{knownFeatures[feature]?.name}</a>
                                                        : knownFeatures[feature]?.name || toTitleCase(feature.replaceAll('_', ' '))
                                                }
                                            </span>
                                        </li>
                                    </Tooltip>
                                )} */}

                                </ul>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div >

    )
}

function guildHasKnownFeature(feature: GuildFeature) {
    return Object.entries(GuildFeature).map(a => a[1]).includes(feature);
}


function toTitleCase(str: string) {
    return str.replaceAll('_', ' ').replace(
        /\w\S*/g,
        function (txt: string) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

export function GuildInfoCardSkeleton({ mobile = false }: { mobile?: boolean }) {
    return (
        <div className={`bg-gray-200 dark:bg-gray-800 m-1 rounded-xl ${mobile && 'hidden sm:block'}`}>
            <div className="cursor-pointer flex bg-dark-3 p-3 pr-5 rounded-md items-center">
                <div className="flex-shrink-0 mr-3">
                    <div className="rounded-full w-16 h-16 bg-gray-300 dark:bg-gray-700 animate-pulse" />
                </div>
                <div className="overflow-hidden flex-auto">
                    <div className="text-xl truncate bg-gray-300 dark:bg-gray-700 animate-pulse w-2/3 sm:w-1/2 h-5" />
                    <div className="text-gray-500 dark:text-gray-400 text-sm bg-gray-300 dark:bg-gray-700 animate-pulse w-1/2 sm:w-1/4 h-3" />
                </div>
                <div className="flex-shrink-0 flex items-center space-x-3">
                    <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-full" />
                    <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-full hidden sm:block" />
                    <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-full hidden sm:block" />
                </div>
            </div>
        </div>

    )
}


// const knownFeatures: Record<GuildFeature, { name: string, url?: string, alt?: string }> = {
//     [GuildFeature.AnimatedBanner]: {
//         name: 'Animated Banner',
//         alt: 'Guild has access to set an animated guild banner image (boost lv3)',
//     },

//     [GuildFeature.AnimatedIcon]: {
//         name: 'Animated Icon',
//         alt: 'Guild has access to set an animated guild icon image (boost lv1)',
//     },

//     [GuildFeature.AutoModeration]: {
//         name: 'Auto Moderation',
//         alt: 'Guild has set up auto moderation rules',
//         url: 'https://support.discord.com/hc/en-us/articles/4421269296535-AutoMod-FAQ'
//     },

//     [GuildFeature.Banner]: {
//         name: 'Banner',
//         alt: 'Guild has access to set a guild banner image (boost lv2)',
//     },

//     [GuildFeature.Community]: {
//         name: 'Community',
//         alt: 'Guild is a community server',
//         url: 'https://support.discord.com/hc/en-us/articles/360047132851-Enabling-Your-Community-Server'
//     },

//     [GuildFeature.DeveloperSupportServer]: {
//         name: 'Developer Support Server',
//         alt: 'Guild has been set as a support server on the App Directory',
//         url: 'https://support.discord.com/hc/en-us/articles/9360431966359-Welcome-to-the-App-Directory'
//     },

//     [GuildFeature.Discoverable]: {
//         name: 'Discoverable',
//         alt: 'Guild is able to be discovered in the directory',
//         // url: 'https://support.discord.com/hc/en-us/articles/360023968311-Server-Discovery'
//         url: 'https://discord.com/servers'
//     },

//     [GuildFeature.Featurable]: {
//         name: 'Featurable',
//         alt: 'Guild is able to be featured in the directory'
//     },

//     [GuildFeature.HasDirectoryEntry]: {
//         name: 'Has Directory Entry',
//         alt: 'Guild is listed in a directory channel',
//         url: 'https://support.discord.com/hc/en-us/articles/4406046651927-Discord-School-Hubs-FAQ'
//     },

//     [GuildFeature.Hub]: {
//         name: 'Student Hub',
//         alt: 'Guild is a Student Hub (This feature is currently not documented by Discord, but has known value)',
//         url: 'https://support.discord.com/hc/en-us/articles/4406046651927-Discord-School-Hubs-FAQ'
//     },

//     [GuildFeature.InviteSplash]: {
//         name: 'Invite Splash',
//         alt: 'Guild has access to set a guild invite splash image (boost lv1)',
//     },

//     [GuildFeature.InvitesDisabled]: {
//         name: 'Invites Disabled',
//         alt: 'Guild has disabled invite usage, preventing users from joining',
//         url: 'https://support.discord.com/hc/en-us/articles/8458903738647-Pause-Invites-FAQ'
//     },

//     [GuildFeature.LinkedToHub]: {
//         name: 'Linked to a Student Hub',
//         alt: 'Guild is in a Student Hub (This feature is currently not documented by Discord, but has known value)',
//         url: 'https://support.discord.com/hc/en-us/articles/4406046651927-Discord-School-Hubs-FAQ'
//     },

//     [GuildFeature.MemberVerificationGateEnabled]: {
//         name: 'Member Verification Gate Enabled',
//         alt: 'Guild has enabled Membership Screening',
//         url: 'https://support.discord.com/hc/en-us/articles/1500000466882-Rules-Screening-FAQ'
//     },

//     [GuildFeature.MonetizationEnabled]: {
//         name: 'Monetization Enabled?',
//         alt: 'Guild has enabled monetization?',
//     },

//     [GuildFeature.MoreStickers]: {
//         name: 'More Stickers',
//         alt: 'Guild has increased custom sticker slots (without boosts)',
//     },

//     [GuildFeature.News]: {
//         name: 'News',
//         alt: 'Guild has access to create news channels',
//         url: 'https://support.discord.com/hc/en-us/articles/360032008192-Announcement-Channels'
//     },

//     [GuildFeature.Partnered]: {
//         name: 'Partnered',
//         alt: 'Guild is partnered',
//         url: 'https://discord.com/partners'
//     },

//     [GuildFeature.PreviewEnabled]: {
//         name: 'Preview Enabled',
//         alt: 'Guild can be previewed before joining via Membership Screening or the directory',
//     },

//     [GuildFeature.PrivateThreads]: {
//         name: 'Private Threads',
//         alt: 'Guild has access to create private threads',
//         url: 'https://support.discord.com/hc/en-us/articles/4403205878423-Threads-FAQ'
//     },

//     [GuildFeature.RelayEnabled]: {
//         name: 'Relay Enabled',
//         alt: 'Relays guild information between different nodes to improve performance for bigger servers',
//     },

//     [GuildFeature.RoleIcons]: {
//         name: 'Role Icons',
//         alt: 'Guild is able to set role icons',
//         url: 'https://support.discord.com/hc/en-us/articles/4409571023639-Custom-Role-Icons-FAQ'
//     },

//     [GuildFeature.TicketedEventsEnabled]: {
//         name: 'Ticketed Events Enabled',
//         alt: 'Guild has enabled ticketed events',
//     },

//     [GuildFeature.VIPRegions]: {
//         name: 'VIP Regions',
//         alt: 'Guild has access to set 384kbps bitrate in voice (previously VIP voice servers)',
//     },

//     [GuildFeature.VanityURL]: {
//         name: 'Vanity URL',
//         alt: 'Guild has access to set a vanity URL (boost lv3)',
//     },

//     [GuildFeature.Verified]: {
//         name: 'Verified',
//         alt: 'Guild is verified',
//         url: 'https://discord.com/verification'
//     },

//     [GuildFeature.WelcomeScreenEnabled]: {
//         name: 'Welcome Screen Enabled',
//         alt: 'Guild has enabled a welcome screen',
//         url: 'https://support.discord.com/hc/en-us/articles/1500000466882-Rules-Screening-FAQ'
//     },

// }