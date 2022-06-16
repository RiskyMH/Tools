import { discordOauthUrlGenerator } from "#/util";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

export default function FullScreenError({ error, color = 'red', children }: PropsWithChildren<{ error: string, color: string }>) {
    // make a full screen error with dotted border (using color) and error message
    return (
        <div className="flex flex-col items-center justify-center m-8 h-full min-h-[calc(100vh-16rem)] lg:min-h-[calc(100vh-8.5rem)] border-4 border-dashed rounded-3xl" style={{ borderColor: color }}>
            <h1 className="text-3xl md:text-6xl font-bold">{error}</h1>
            <div>
                {children}
            </div>
        </div>
    )
}

export function UnauthorizedError({ type }: { type: "discord" }) {
    const currentPage = usePathname();
    return (
        // <FullScreenError error="Unauthorized" color="orange" >
        <>
            <div className="flex flex-col items-center justify-center m-2 h-72 md:h-80 border-4 rounded-2xl border-orange-500" >
                <h1 className="text-3xl md:text-4xl font-bold">Unauthorized</h1>
                <p className="text-lg md:text-2xl text-center pl-4 pr-4">You are not authorized to view this content.</p>
                {/* reauthenticate button */}
                {type === "discord" &&
                    <a href={discordOauthUrlGenerator(currentPage ?? '/discord')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-2 py-2 px-4 rounded">
                        Login to Discord
                    </a>
                }

            </div>
        </>

        // </FullScreenError>
    );
}