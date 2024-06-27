import React from 'react';
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react'

export  default function WalletConnectButton (): React.JSX.Element {
    const { open } = useWeb3Modal()
    const { isConnected } = useWeb3ModalAccount()

    return (
        <div className='w-full h-full flex justify-center items-center'>
            {
                !isConnected &&
                <button className="flex items-center justify-center" onClick={() => open()}>
                    <div className="text-[#5974ff] px-4 py-2 rounded-[2rem] hover:bg-[#171717] border-[#5974ff] border-[1px]">
                        Connect Wallet
                    </div>
                </button>
            }
        </div>
    );
}