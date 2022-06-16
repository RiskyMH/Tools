import type { HTMLInputTypeAttribute } from "react";

export default function ShowData({ title, type, disabled, value }: { title?: string, type: HTMLInputTypeAttribute, disabled?: boolean, value?: string }) {
    return (
        <div className="mb-2">
            {/* use input and show label */}
            <label htmlFor={title} className="block font-medium text-gray-700 dark:text-gray-200">
                {title+':'}
            </label>
            <input
                type={type}
                name={title}
                disabled={disabled}
                className="mt-1 p-2 text-medium focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm  border-gray-300 rounded-md"
                defaultValue={value}
            />
        </div>
    );

}

