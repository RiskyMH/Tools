'use client'
import Loading, { UserInfoLoading } from "./loading";
import Section from "#/components/Section";
import ShowData from "#/components/ShowData";
import { UnauthorizedError } from "#/components/Errors";
import useUser from "#/requests/getUser";


export default function Tools() {

    const { user, isError, isLoading, isLoggedOut } = useUser()

    return (
        <>
            <Section title="Your User Info">
                {isLoggedOut ? (
                    <UnauthorizedError type="discord" />

                ) : user ? (
                    <>
                        <ShowData title="Username" disabled type="string" value={`${user.username}#${user.discriminator}`} />
                        <p><em>Username: </em>{user.username}#{user.discriminator}</p>
                        <p><em>Avatar: </em>{user.avatar && <img src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} alt="User avatar" />}</p>
                        <p><em>Bot: </em>{user.bot ? "Yes" : "No"}</p>
                        <p><em>MFA: </em>{user.mfa_enabled ? "Yes" : "No"}</p>
                        <p><em>Verified: </em>{user.verified ? "Yes" : "No"}</p>
                        {/* <p><em>Email: </em>{user.email}</p> */}
                        {/* <div><p><em>Flags: </em>{user.flags}</p> <Tooltip text="Flags are...">?</Tooltip></div> */}
                        <p><em>Flags: </em>{user.flags}</p>
                        <p><em>Locale: </em>{user.locale}</p>

                    </>

                ) : (
                    isError
                        ? <p>Unknown error {isError}</p>
                        : <UserInfoLoading />
                )
                }
            </Section>

            <Section title="User Info">
                {/* User provides a user id and the user data will be returned */}
                TODO...
            </Section>

            <Section title="Application Info">
                {/* User provides an application id and the application data will be returned */}
                TODO...
            </Section>

        </>
    )
}
