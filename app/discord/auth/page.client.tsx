'use client';

import useUser, { getUser } from "#/requests/getUser";
import { discordOauthUrlGenerator } from "#/util";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSWRConfig } from "swr";

export default function Tools() {

    const { isError, isLoading, isLoggedOut, user, mutate } = useUser()
    const router = useRouter()
    const { mutate: mutateGLobal } = useSWRConfig()

    useEffect(() => {
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.substr(1));
        const access_token = params.get('access_token');
        const token_type = params.get('token_type');
        const expires_in = params.get('expires_in');
        const refresh_token = params.get('refresh_token');
        const scope = params.get('scope');
        const state = params.get('state');

        if (access_token) {

            localStorage.setItem('discord_token', 'Bearer ' + access_token);
            // mutate(getUser('Bearer ' + access_token))
            mutate(getUser('Bearer ' + access_token))
            router.replace(state || '/discord');
        }


    }, [router, mutate]);

    const logout = () => {
        localStorage.removeItem('discord_token');
        mutateGLobal(
            () => true,
            undefined,
            { revalidate: false }
        )
        router.refresh();
    }

    return (
        <>
            {!isLoading && user ? (
                <>
                    {!isLoggedOut && <p className="text-green-500">success</p>}
                    <p>Logged in as {user.username}#{user.discriminator}</p>
                    <div>
                        <a onClick={logout} className="text-blue-500 hover:underline" href='#' > logout</a>
                    </div>
                    <div>
                        <a className="text-blue-500 hover:underline" href={discordOauthUrlGenerator('/discord')} >Re-login to Discord</a>
                    </div>
                </>
            ) : (
                <div>
                    <p>
                        Loading...
                    </p>
                    {/* <Link className="text-blue-500 hover:underline" href={discordOauthUrlGenerator(currentPage ?? '/discord')} >Login with Discord</Link> */}
                </div>
            )}
        </>
    )
}
