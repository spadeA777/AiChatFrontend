import React, { useContext, useState, useEffect } from 'react';
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react'
import { SwapWidget } from '@native_org/widgets'

import {
    Dialog,
    DialogBody,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";

import AppContext from '@/contexts/AppContext';
import { getDepositAddr } from '@/utils/axios';

interface WalletModalProps {
    isOpen: boolean,
    handler: () => void
}

export default function WalletModal (props: WalletModalProps): React.JSX.Element {
    const tabHeaders = [
        "Deposit",
        "Withdraw",
        "Swap"
    ]
    const { walletProvider } = useWeb3ModalProvider()
    const { address, chainId, isConnected } = useWeb3ModalAccount();
    const { auth } = useContext(AppContext)
    const [selectedToken, setSelectedToken] = useState('BNB')
    const [depositAmount, setDepositAmount] = useState<number>(NaN)
    const [depositAddr, setDepositAddr] = useState<any | null>(null)
    const [balance, setBalance] = useState<any>(auth.state.balance)

    function trimMiddleString(str: string) {
        return str.slice(0, 5) + " ... " + str.slice(-4)
    }

    function roundShowingBalance(val: number) {
        return val.toFixed(3).toString()
    }

    // function copyToClipboard(text: string) {
    //     const el = document.createElement('textarea');
    //     el.value = text;
    //     document.body.appendChild(el);
    //     el.select();
    //     document.execCommand('copy');
    //     document.body.removeChild(el);
    // }

    function deposit () {
        if(depositAmount < 0.003) {
            console.log('too small amount, you should deposit at least 0.003 BNB')
            return
        }
        
    }

    useEffect(() => {
        getDepositAddr({token: selectedToken}).then( res => {
            if(res.data) setDepositAddr(res.data)
        }).catch(e => console.log(e))
    }, [selectedToken])

    useEffect(() => {
        setBalance(auth.state.balance)
    }, [auth.state.balance])

    return (
        <Dialog  placeholder={undefined}
            className='bg-[#171717] outline-none rounded-[2rem]'
            size='md'
            animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
            }}
            open={ props.isOpen } handler={() => props.handler()}
        >
            <DialogBody placeholder={undefined} className='relative h-[40rem] flex flex-col p-0 rounded-[2rem] bg-[#171717] overflow-y-auto thin-scroll z-50'>
                <div className='h-full flex flex-col gap-4 p-4 text-[#fff]'>
                    <div className='flex justify-between items-end mt-4'>
                        <span className='text-[24px]'>Wallet</span>
                        <span className='text-[14px] hover:text-[#5974ff] cursor-pointer'>
                            {
                                trimMiddleString(auth.state.address)
                            }
                        </span>
                    </div>
                    
                    <Tabs value="deposit" className="h-full flex flex-col gap-2">
                        <TabsHeader placeholder={undefined} className='bg-[#1e2024]'
                            indicatorProps={{
                                className: "bg-[#5974ff]",
                            }}
                        >
                            {
                                tabHeaders.map( (item, idx) => 
                                    <Tab key={idx} value={item.toLowerCase()} className='rounded-[1rem] bg-transparent text-[#fff]' placeholder={undefined}>
                                        {item}
                                    </Tab>
                                )
                            }
                        </TabsHeader>
                        <TabsBody placeholder={undefined} className='flex-grow'>
                            <TabPanel value='deposit' className='h-full flex flex-col gap-4 bg-[#1e2024] rounded-[1rem]'>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex justify-between items-end'>
                                        <span>Balance</span>
                                        <span className='text-[12px] text-[#5974ff]'></span>
                                    </div>
                                    <div className='flex justify-between items-center gap-4 p-2 rounded-[1rem] bg-[#2d303580] border-[1px] border-[#2d3035] text-[#fff]'>
                                        <div className='w-full text-center text-[20px] font-semibold cursor-pointer'>{selectedToken}</div>
                                        <div className='w-[1px] h-full bg-[#2d3035]'></div>
                                        <div className='w-full text-center'>{roundShowingBalance(balance[selectedToken])}</div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex justify-between items-end'>
                                        <span>Deposit amount</span>
                                        <div className='text-[12px]'>min 0.003 BNB</div>
                                    </div>
                                    
                                    <input type="number" className='w-full h-full px-4 py-2 border-[1px] border[#b8bccf] rounded-[1rem] text-[#fff] bg-transparent outline-none' placeholder='deposit amount' required
                                        value={isNaN(depositAmount) ? '' : depositAmount} onChange={(e) => {
                                            setDepositAmount(parseFloat(e.target.value))
                                        }}
                                    />
                                </div>
                                <button className='shrink px-8 py-4 bg-[#5974ff] text-[#fff] rounded-[1rem]'
                                    onClick={() => deposit()}
                                >
                                    Deposit
                                </button>
                                {/* {
                                    depositAddr &&
                                    <div className='flex flex-col gap-2 mt-8'>
                                        <div className='flex justify-between items-end'>
                                            <span>
                                                Desposit Address (<span className='text-[#5974ff]'>{depositAddr.network}</span>)
                                            </span>
                                        </div>
                                        <div className='flex justify-between items-center gap-4 p-2 rounded-[1rem] bg-[#2d303580] border-[1px] border-[#2d3035] text-[#fff]'>
                                            <div className=''>
                                                { depositAddr.addr }
                                            </div>
                                            <div className='text-[#5974ff] text-[14px] cursor-pointer'  onClick={() => copyToClipboard(depositAddr.addr)}>
                                                copy
                                            </div>
                                        </div>
                                        <div className='p-2 border-[1px] border-[#2d3035] rounded-md'>
                                            <p className='text-[14px]'>
                                                <span className='text-[#5974ff]'>Notice: </span>
                                                Send only {selectedToken} to this deposit address. Coins will be deposited automatically after confirmations. Smart contract addresses are not supported(Contact us).
                                            </p>
                                        </div>
                                    </div>
                                } */}
                            </TabPanel>
                            <TabPanel value='withdraw' className='h-full flex flex-col gap-2 bg-[#1e2024] rounded-[1rem]'>
                                <span className='text-center'>
                                    coming soon
                                </span>
                            </TabPanel>
                            <TabPanel value='swap' className='h-full flex flex-col gap-2 bg-[#1e2024] rounded-[1rem]'>
                                {
                                    (address && chainId && isConnected && walletProvider) ?
                                    <SwapWidget 
                                        apiKey="cf8411b7414ffbfc2b897145c7bc03fe9952c847"
                                        baseApiUrl='https://newapi.native.org'
                                        theme={{
                                            theme: 'dark',
                                        }}
                                        walletSettings={{
                                            usingNative: false,
                                            address: address,
                                            chainId: chainId.toString(),
                                            provider: walletProvider
                                        }}
                                    /> :
                                    <></>
                                }
                            </TabPanel>
                        </TabsBody>
                    </Tabs>
                </div>
            </DialogBody>
        </Dialog>
    );
}