import React, { useState, useEffect, useContext } from 'react';
import { useDisconnect, useWeb3ModalAccount } from '@web3modal/ethers/react'
import AppContext from '@/contexts/AppContext';
import { login } from '@/utils/axios';
import WalletConnectButton from "@/components/WalletConnectButton";
// import WalletSVG from '@/assets/images/icon/wallet.svg'

const logoURL = 'https://res.cloudinary.com/dtysxszqe/image/upload/v1702964717/ylt3yueyrhxd1vobi5qc.png';

interface TopNavbarProps {
    onDrawerOpen: () => void
    openWalletModal: () => void
}

const TopNavbar = (props: TopNavbarProps) => {

    const [collapsed, setCollapsed] = useState(false);
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
        <div className={`absolute md:relative md:hidden md:top-0 md:left-0 w-full h-[4rem] flex items-center justify-between gap-4 px-8 py-2 bg-[#171717] shadow-md`}>
            <div className='flex items-center gap-4'>
                <img className={`w-[32px] rounded-[4px] py-[2rem] cursor-pointer`} src={logoURL} alt='Project BAE'
                    onClick={() => { 
                        setCollapsed(!collapsed)
                        props.onDrawerOpen()
                    }}
                />
                {/* <h1 className='text-[#fff] text-lg font-semibold'>Project BAE</h1> */}
            </div>
            <div className=''>
                {
                    isConnected ?
                    <div className="w-full flex items-center gap-2">
                        <div className='w-full flex-grow flex items-center gap-2 overflow-hidden bg-[#171717] rounded-md px-4 py-2'>
                            <span className='text-[14px] pl-4 cursor-pointer'>{selectedToken}</span>
                            <span className="">
                                {
                                    
                                    roundShowingBalance(balance[selectedToken])
                                }
                            </span>
                        </div>
                        <div className="flex items-center gap-2 rounded-[2rem] bg-[#171717]">
                            <div className="flex items-center justify-center gap-2 px-3 py-1 rounded-[2rem] bg-[#5974ff] cursor-pointer"
                                onClick={() => {props.openWalletModal()}}
                            >
                                Deposit
                            </div>
                        </div>
                    </div> :
                    <WalletConnectButton />
                }
            </div>
        </div>
    );
}

export default TopNavbar;