import { APIApplication, APIGuild, APIInviteGuild, APIUser } from "discord-api-types/v10"

const DISCORD_CDN = 'https://cdn.discordapp.com'


export function discordOauthUrlGenerator(currentPage = '/discord') {
    const clientId = '1040416004272050256'
    let currentUrl = 'http://localhost:3000'
    // const currentUrl = 'https://tools-dev-tunnel.riskymh.dev'
    if (process.env.VERCEL_ENV === 'production') currentUrl = 'https://tools.riskymh.dev'
    else if (process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_URL) currentUrl = process.env.VERCEL_URL
    
    const redirectUri = `${currentUrl}/discord/auth`
    const scopes = 'identify guilds'

    return `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${scopes}${currentPage && `&state=${encodeURIComponent(currentPage)}`}`

}


export function userAvatar({ id, discriminator, avatar }: APIUser, { size = 512 }) {
    if (avatar) {
        if (avatar.startsWith('a_')) {
            return `${DISCORD_CDN}/avatars/${id}/${avatar}.gif?size=${size}`
        } else {
            return `${DISCORD_CDN}/avatars/${id}/${avatar}.webp?size=${size}`
        }
    } else {
        return `${DISCORD_CDN}/embed/avatars/${parseInt(discriminator) % 5}.png?size=${size}`
    }
}

export function userBanner({ id, banner }: APIUser) {
    if (!banner) return null

    if (banner.startsWith('a_')) {
        return `${DISCORD_CDN}/banners/${id}/${banner}.gif?size=1024`
    } else {
        return `${DISCORD_CDN}/banners/${id}/${banner}.webp?size=1024`
    }
}

export function guildIcon({ id, icon }: APIGuild | APIInviteGuild, { size = 512, animated = false }) {
    if (icon) {
        if (animated && icon.startsWith('a_')) {
            return `${DISCORD_CDN}/icons/${id}/${icon}.gif?size=${size}`
        }
        return `${DISCORD_CDN}/icons/${id}/${icon}.webp?size=${size}`
    }
    
    return `${DISCORD_CDN}/embed/avatars/1.png?size=${size}`
}

export const defaultAvatar = (discriminator: string | number) => `${DISCORD_CDN}/embed/avatars/${parseInt(discriminator.toString()) % 5}.png`

export function applicationIcon({ id, icon }: APIApplication, { size = 128 }) {
    if (icon) {
        return `${DISCORD_CDN}/app-icons/${id}/${icon}.webp?size=${size}`
    } else {
        return `${DISCORD_CDN}/embed/avatars/1.png?size=${size}`
    }
}

export function hasBitFlag(value: number | string | bigint, bit: number | string | bigint) {
    if (!value) return false

    return (BigInt(value) & BigInt(bit)) === BigInt(bit)
}

export function formatDateTime(date: Date) {
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}

export function formatTimestamp(timestamp: number) {
    const date = new Date(timestamp * 1000)
    return formatDateTime(date)
}


export function intToHexColor(int: number) {
    if (!int) return null

    var hex = Number(int).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return `#${hex}`;
}

export function snowlfakeTimestamp(snowflake: number) {
    if (!snowflake) return null

    const epoch = 1420070400000;
    const timestamp = new Date(snowflake / 4194304 + epoch);
    if (!timestamp || isNaN(timestamp.getTime())) {
        return null
    } else {
        return timestamp
    }
}

export function toTitleCase(str: string) {
    return str.replace(
        /\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()

    );
}
/**
 * Converts a camelCase string to a sentence case string
 * @param camelCase The camelCase string to convert
 */
export const toSentenceCase = (camelCase: string) => {
    if (camelCase) {
        const result = camelCase.replace(/([A-Z])/g, ' $1');
        const newRes = result[0] + result.substring(1);

        // if there is an uppercase 3 times (eg U R L) then we want to merge into 1 words (eg URL)
        const finalRes = newRes.replace(/([A-Z])\s([A-Z])\s([A-Z])/g, '$1$2$3');

        // return correctSentenceCase(finalRes)
        return finalRes;
    }
    return '';
};


export function correctSentenceCase(string: string){
    if (string === "") return string;
    return string.split(" ").map((word, index) => {
        if (index === 0) return word[0].toUpperCase() + word.slice(1);
        if (alwaysLowerCaseWords.includes(word)) return word;
        return word[0].toUpperCase() + word.slice(1);
    }).join(" ");
}

// Not including the start of a sentence
const alwaysLowerCaseWords = [
    "in",
    "of",
    "to",
    "for",
    "on",
    "with",
    "at",
    "by",
    "from",
    "up",
]
