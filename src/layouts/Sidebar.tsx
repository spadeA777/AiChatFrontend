import React, { useState, useEffect, useContext } from 'react';
import { useDisconnect, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import SidebarItem from '@/components/SidebarItem';

import AppContext from '@/contexts/AppContext';
import { login } from '@/utils/axios';

import ExploreSVG from '@/assets/images/icon/explore.svg';
import UserSVG from '@/assets/images/icon/user.svg';
import ChatSVG from '@/assets/images/icon/chat.svg';
import ToolSVG from '@/assets/images/icon/tool.svg';
import TelegramSVG from '@/assets/images/telegram.svg';
import DiscordSVG from '@/assets/images/discord.svg';
import TwitterSVG from '@/assets/images/twitter.svg';
// import WalletSVG from '@/assets/images/icon/wallet.svg'

const logoURL = 'https://res.cloudinary.com/dtysxszqe/image/upload/v1702964717/ylt3yueyrhxd1vobi5qc.png';

interface SidebarProps {
    openWalletModal: () => void
}

const Sidebar = (props: SidebarProps) => {
    const location = useLocation();
    const navigate = useNavigate();

    const { auth } = useContext(AppContext)
    const { address, chainId, isConnected } = useWeb3ModalAccount()
    const { disconnect } = useDisconnect()
    const [balance, setBalance] = useState<any>(auth.state.balance)
    const [selectedToken, setSelectedToken] = useState('BNB')

    function roundShowingBalance(val: number) { 
        return val.toFixed(3).toString()
    }

    useEffect(() => {

        if(chainId && address) {
            auth.setConfig({
                ...auth.state,
                address: address.toString(),
                chainId: chainId,
                isConnected: isConnected
            })

            const data = {
                address: address,
                chainId: chainId
            }
            login(data).then( res => {
                if(res.status != 200) {
                    disconnect()
                } else {
                    auth.setConfig({
                        ...auth.state,
                        balance: res.data
                    })
                    setSelectedToken('BNB')
                }
            }).catch(err => {
                console.log(err)
                disconnect()
            })
        }
            
    }, [isConnected])

    useEffect(() => {
        setBalance(auth.state.balance)
    }, [auth.state.balance])

    // TODO - disable navigation on page loading for live chat
    return (
        <div className={`sidebar hidden md:block flex-shrink-0 h-screen w-[180px] px-[32px] bg-[#0d0d0d] text-[#fff] text-[16px] leading-normal`}>
            
            <div className='w-full h-full flex flex-col items-center'>
                <img className={`w-[64px] rounded-[10px] py-[2rem] cursor-pointer`} src={logoURL} alt='Project BAE' />

                <div className='flex flex-col flex-grow justify-between py-[2rem] border-b-[1px] border-t-[1px] border-[#171717]'>
                    <div className="navbar flex flex-col gap-[1rem]">
                        <SidebarItem 
                            text="Explore"
                            isActive={location.pathname.includes('/explore')}
                            Icon={ExploreSVG}
                            onClick={() => {
                                navigate('/explore')
                            }}
                        />
                        <SidebarItem 
                            text="Chat"
                            isActive={location.pathname.includes('/chat')}
                            Icon={ChatSVG}
                            onClick={() => {navigate('/chat')}}
                        />
                        <SidebarItem 
                            text="MyBae"
                            isActive={location.pathname.includes('/mybae')}
                            Icon={ToolSVG}
                            onClick={() => {navigate('/mybae')}}
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
                            onClick={() => {navigate('/profile')}}
                        />
                    </div>
                    {
                        isConnected &&
                        <div className="w-full flex flex-col items-center gap-2">
                            <div className='w-full flex-grow flex items-center gap-2 overflow-hidden bg-[#171717] rounded-md px-4 py-2'>
                                <span className="">
                                    {
                                        roundShowingBalance(balance[selectedToken])
                                    }
                                </span>
                                <span className='text-[14px] pl-4 cursor-pointer'>{selectedToken}</span>
                            </div>
                            <div className="flex items-center justify-center gap-2 px-3 py-1 rounded-[2rem] bg-[#5974ff] cursor-pointer"
                                onClick={() => {props.openWalletModal()}}
                            >
                                {/* <WalletSVG width={20} height={20} /> */}
                                Deposit
                            </div>
                        </div>
                    }
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
    );
}

export default Sidebar;