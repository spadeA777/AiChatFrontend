import React from 'react';

interface SidebarItemProps {
    text: string,
    isActive: boolean,
    Icon: React.FC<React.SVGProps<SVGSVGElement>>
    onClick: () => void
}

export default function SidebarItem (props: SidebarItemProps): React.JSX.Element {

    return (
        <div className={`flex gap-[1rem] p-3 rounded-[1rem] cursor-pointer ${props.isActive && "bg-[#17181c] text-[#5974ff]"}`}
            onClick={() => props.onClick()}
        >
            <props.Icon style={{ stroke: props.isActive ? '#5974ff' : '#fff' }}/>
            <div>{props.text}</div>
        </div>
    )
}