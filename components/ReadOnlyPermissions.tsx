import { correctSentenceCase, toSentenceCase } from "#/util";
import { PermissionFlagsBits } from "discord-api-types/v10";


export default function ReadOnlyPermissionsTable({ permissions }: { permissions: string }) {
    const permissionsArray = Object.entries(PermissionFlagsBits).map(([name, value]) => ({ name: correctSentenceCase(name), value: (BigInt(permissions) & value) === value }));
    // make sure the permissions names have the correct 
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            {permissionsArray.map(({ name, value }) => (
                // the name of the permission, and the value (green tick icon or red cross icon)
                <div key={name} className="flex">
                    {value ? <GreenTickIcon /> : <RedCrossIcon />}
                    <p className="ml-2">{toSentenceCase(name)}</p>
                </div>
            ))}
        </div>
    );
}


function GreenTickIcon() {
    return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M9 16.2L4.8 12L3.6 13.2L9 18.6L20.4 7.19998L19.2 6L9 16.2Z"
                fill="green"
            />
        </svg>
    );
}

function RedCrossIcon() {
    return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M19 6L5 20M5 6L19 20"
                stroke="red"
            />
        </svg>
    );
}

