
export default function Tooltip({ children, title, small }: { children: any, title: string, small?: boolean }) {
    // Show a tooltip when hovering over the child element (with an arrow on bottom of tooltip)
    // ONLY SHOW ON HOVER

    return (
        <div className="relative group">
            {children}
            <div className={`select-none z-50 hidden group-hover:block absolute w-max ${small ? '-top-8' : '-top-12'} left-1/2 -translate-x-1/2`}>
                <div className={`bg-gray-600 ${small ? 'py-1 px-2 text-base' : 'py-1 px-4 text-lg'} rounded-md whitespace-nowrap text-gray-300`}>

                    {title}
                    <svg className="absolute text-gray-600 h-3 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve">
                        <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
                    </svg>

                </div>
            </div>
        </div>
    )


}