import { APIUser } from "discord-api-types/v10";
import useSWR from "swr";
import discordRequest from "./discord";


export const getUser = (async (token?: string): Promise<APIUser> => {
    return discordRequest("https://discord.com/api/v10/users/@me", "GET", token)
})


export default function useUser(token?: string) {

    // getGuilds(token)   
    const { data, error, mutate, isValidating } = useSWR(`/discord/user`, async () => await getUser(token), {
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        shouldRetryOnError: false,
    });

    return {
        user: data || null,
        isLoading: isValidating,
        isError: error,
        isLoggedOut: error?.status === 401,
        mutate,
    };
};
