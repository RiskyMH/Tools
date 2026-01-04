
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


export default async function discordRequest(url: string, method = 'GET', token?: string | false, body?: string): Promise<any> {
    if (typeof window !== 'undefined' && token !== false) {
        const newToken = localStorage.getItem("discord_token") || undefined;
        if (newToken) {
            token = newToken;
        }
    }

    if (!token && token !== false) {
        // a 401 error will be thrown
        const error = new Error(`Discord 401: Unauthorized (no token provided)`);
        // @ts-expect-error
        error.status = 401;
        throw error
    }


    const res = await fetch(url, {
        headers: {
            authorization: token || '',
        },
        method,
        body,
    });

    if (res.status === 429) {
        const retryAfter = res.headers.get("retry-after");
        await wait(retryAfter ? parseInt(retryAfter) * 1000 : 1000);
        return discordRequest(url, method, token, body);
    }

    if (!res.ok) {
        const error = new Error(`Discord ${res.status}: ${await res.text()}`);
        // @ts-expect-error
        error.status = res.status;
        throw error
    }

    return res.json();

}