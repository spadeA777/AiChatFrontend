import React, { useState } from 'react';
import Sidebar from '@/layouts/Sidebar';
import TopNavbar from '@/layouts/TopNavbar';
import WalletModal from '@/components/WalletModal';
import SideDrawer from './SideDrawer';

export interface LayoutProps {
  children: React.ReactNode;
}

function Layout(props : LayoutProps) {

  const [drawerOpen, setDraweropen] = useState(false)
  const [walletOpen, setWalletOpen] = useState(false)
  // const [toast, setToast] = useState<string | null>(null);

  // function showToast(text: string, timeout = 1000) {
  //   setToast(text);

  //   setTimeout(() => {
  //     setToast(null);
  //   }, timeout);
  // }

  return (
    <div className='relative w-full h-screen flex overflow-hidden text-[#fff]'>
      <Sidebar 
        openWalletModal={() => {setWalletOpen(true)}}
      />
      <TopNavbar 
        onDrawerOpen={() => { setDraweropen(true) }}
        openWalletModal={() => {setWalletOpen(true)}}
      />
      <SideDrawer 
        open={drawerOpen} 
        handler={() => setDraweropen(false)} 
      />
      <div className='flex-grow pt-[4rem] md:pt-0 bg-[#1b1b1d]'>
        {
          props.children
        }
      </div>
      {/* {
        toast &&
        <div className="absolute flex justify-center w-fit mx-auto my-0 top-[2rem] left-0 right-0 px-[1rem] py-[0.5rem] bg-[#0006] rounded-[1rem] transition-all duration-200">
          <span className='text-[#fff]'>{toast}</span>
        </div>
      } */}
      <WalletModal isOpen={walletOpen} handler={() => setWalletOpen(false)} />
    </div>
  );
}

export default Layout;
