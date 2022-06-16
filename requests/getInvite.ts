import { APIGuild, APIInvite } from "discord-api-types/v10";
import useSWR from "swr";
import discordRequest from "./discord";


export const getInvite = (async (invite: string, withCounts: boolean): Promise<APIInvite> => {
    return discordRequest("https://discord.com/api/v10/invites/" + invite + (withCounts ? '?with_counts=true': ''), "GET", false)
})


export default function useInvite(invite: string, withCounts = true) {

    const { data, error, mutate, isValidating } = useSWR(invite && `/discord/invite/${invite}`, () => getInvite(invite, withCounts), {
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        shouldRetryOnError: false,
    });

    return {
        invite: data || null,
        isLoading: isValidating,
        isError: error,
        isNotExist: error?.status === 404 || !invite,
        mutate,
    };
};

