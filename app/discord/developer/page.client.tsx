'use client'

import { useEffect, useState } from "react";
import Section from "#/components/Section";
import { discordOauthUrlGenerator } from "#/util";

export default function DeveloperPage() {

    const [token, setToken] = useState<string | null>(null)
    const [noToken, setNoToken] = useState<boolean | null>(null)

    useEffect(() => {
        const token = localStorage.getItem('discord_token')
        if (token) {
            setToken(token)
            setNoToken(false)
        } else {
            setNoToken(true)
        }
    }, [])


    return (

        noToken === true ? (
            <Section title="Basic developer tools">
                Not logged in, token not found. <a className="text-blue-500 hover:underline" href={discordOauthUrlGenerator('/discord/developer')}>Re-login to Discord</a>
            </Section>

        ) : token ? (
            <Section title="Basic developer tools">
                {/* <div className="group">
                    <div className="group-hover:hidden block">
                        <p>Hover for token</p>
                    </div>
                    <div className="hidden group-hover:block">
                        <ShowData title="Token" disabled type="text" value={token} />
                    </div>
                </div> */}

                {/* button onclick save token to clipboard */}
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-2 py-2 px-4 rounded"
                    onClick={(e) => {
                        navigator.clipboard.writeText(token)
                        e.currentTarget.innerText = "Copied!"
                        const eTarget = e.currentTarget
                        setTimeout(() => {
                            eTarget.innerText = "Copy token"
                        }, 250)
                    }}
                >
                    Click for token
                </button>

            </Section>

        ) : (
            <Section title="Basic developer tools">
                <p>Loading...</p>
            </Section>

        )

    )
}
