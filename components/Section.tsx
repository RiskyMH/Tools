import { PropsWithChildren } from "react";

export default function Section({ title, children }: PropsWithChildren<{ title?: string }>) {
    return (
        <section about={title}>
            {title && (
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-4 px-4 py-4">
                    {title}
                </h3>
            )}
            <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-xl border-gray-300 dark:border-gray-800 border-solid border ">
                {children}
            </div>
        </section>
    );
}