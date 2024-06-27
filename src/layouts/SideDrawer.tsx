import React from 'react';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
    Drawer
} from '@material-tailwind/react'
import SidebarItem from '@/components/SidebarItem';

import ExploreSVG from '@/assets/images/icon/explore.svg';
import UserSVG from '@/assets/images/icon/user.svg';
import ChatSVG from '@/assets/images/icon/chat.svg';
import ToolSVG from '@/assets/images/icon/tool.svg';
import TelegramSVG from '@/assets/images/telegram.svg';
import DiscordSVG from '@/assets/images/discord.svg';
import TwitterSVG from '@/assets/images/twitter.svg';

interface SideDrawerProps {
    open: boolean
    handler: () => void
}

const SideDrawer = (props: SideDrawerProps) => {
    const location = useLocation();
    const navigate = useNavigate()

    // TODO - disable navigation on page loading for live chat
    return (
        <Drawer className="bg-[#0d0d0d] text-[#fff] text-[16px] leading-normal" placeholder={undefined} 
            open={props.open}  onClose={() => {props.handler()}}
        >
            <div className={`h-screen px-8 bg-[#0d0d0d] text-[#fff] text-[16px] leading-normal`}>
                <div className='w-full h-full flex flex-col items-center'>
                    <div className='flex flex-col flex-grow justify-between py-[2rem]'>
                        <div className="flex flex-col gap-[1rem]">
                            <SidebarItem 
                                text="Explore"
                                isActive={location.pathname.includes('/explore')}
                                Icon={ExploreSVG}
                                onClick={() => {
                                    navigate('/explore')
                                    props.handler()
                                }}
                            />
                            <div className=''></div>
                            <SidebarItem 
                                text="Chat"
                                isActive={location.pathname.includes('/chat')}
                                Icon={ChatSVG}
                                onClick={() => {
                                    navigate('/chat')
                                    props.handler()
                                }}
                            />
                            <SidebarItem 
                                text="MyBae"
                                isActive={location.pathname.includes('/mybae')}
                                Icon={ToolSVG}
                                onClick={() => {
                                    navigate('/mybae')
                                    props.handler()
                                }}
                            />
                            {/* <SidebarItem 
                                text="Axie" link="/game"
                                isActive={location.pathname.includes('/game')}
                                Icon={GameSVG}
                            /> */}
                            <SidebarItem 
                                text="Profile"
                                isActive={location.pathname.includes('/profile')}
                                Icon={UserSVG}
                                onClick={() => {
                                    navigate('/profile')
                                    props.handler()
                                }}
                            />
                        </div>
                    </div>

                    <div className='flex gap-[1rem] py-[2rem]'>
                        <NavLink to="https://discord.com/invite/qPbw93b6KK" className="">
                            <DiscordSVG />
                        </NavLink>
                        <NavLink to="https://t.me/mycopilotbae" className="">
                            <TelegramSVG />
                        </NavLink>
                        <NavLink to="https://twitter.com/mycopilotbae" className="">
                            <TwitterSVG />
                        </NavLink>
                    </div>
                </div>
            </div>
        </Drawer>
        
    );
}

export default SideDrawer;