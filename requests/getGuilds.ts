import { APIGuild } from "discord-api-types/v10";
import useSWR from "swr";
import discordRequest from "./discord";


export const getGuilds = (async (token?: string): Promise<APIGuild[]> => {
    return discordRequest("https://discord.com/api/v10/users/@me/guilds?with_counts=true", "GET", token)
})


export default function useGuilds(token?: string) {

    // getGuilds(token)   
    const { data, error, mutate, isValidating } = useSWR(`/discord/guilds`, () => getGuilds(token), {
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        shouldRetryOnError: false,
    });

    return {
        guilds: data || null,
        isLoading: isValidating,
        isError: error,
        isLoggedOut: error?.status === 401,
        mutate,
    };
};

