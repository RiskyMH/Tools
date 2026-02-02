import { APIGuild } from "discord-api-types/v10";
import useSWR from "swr";
import discordRequest from "./discord";


export const getGuilds = (async (token?: string, with_counts = true, after?: string): Promise<APIGuild[]> => {
    const res: APIGuild[] = await discordRequest(`https://discord.com/api/v10/users/@me/guilds?with_counts=${with_counts}&${after ? `after=${after}` : ``}`, "GET", token)
    if (res.length === 200) {
        return res.concat(await getGuilds(token, with_counts, res[res.length - 1].id));
    }
    return res;
})


export default function useGuilds(token?: string, with_counts = true) {

    // getGuilds(token)   
    const { data, error, mutate, isValidating } = useSWR(`/discord/guilds`, () => getGuilds(token, with_counts), {
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

