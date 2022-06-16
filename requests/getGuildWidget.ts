import { APIGuildWidget } from "discord-api-types/v10";
import useSWR from "swr";
import discordRequest from "./discord";


export const getGuildWidget = (async (guild: string): Promise<APIGuildWidget> => {
    return discordRequest("https://discord.com/api/v10/guilds/" + guild + '/widget.json', "GET", false)
})


export default function useGuildWidget(guild: string) {

    const { data, error, mutate, isValidating } = useSWR(guild && `/discord/guild/${guild}/widget`, () => getGuildWidget(guild), {
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        shouldRetryOnError: false,
    });

    return {
        widget: data || null,
        isLoading: isValidating,
        isError: error,
        isNotExist: error?.status === 404 || !guild,
        isDisabled: error?.status === 403,
        mutate,
    };
};

