import {  ReactNode } from "react";

export default function Layout({ children, guildInput, guilds }: Record<string, ReactNode>) {
    return (
        <>
            {children}
            {guildInput}
            {guilds}
        </>
    );
}

