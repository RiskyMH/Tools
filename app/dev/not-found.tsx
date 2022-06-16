'use client';

import { useEffect } from "react";

export default function NotFound() {
    useEffect(() => {
        document.title = "404 - Not Found";
    })
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-6xl font-bold">404</h1>
            <p className="text-2xl">Page not found</p>
        </div>
    );
}
