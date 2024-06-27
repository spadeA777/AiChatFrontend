
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useWeb3ModalAccount } from '@web3modal/ethers/react'

import AppContextProvider from '@/contexts';

import Layout from '@/layouts';
import Loading from "@/components/Loading";
import Home from "./pages/Home";
import NotFound from '@/pages/NotFound';
import WalletConnectButton from "./components/WalletConnectButton";

const Explore = React.lazy(() => import('@/pages/Explore'))
const Chat = React.lazy(() => import('@/pages/Chat'))
const MyBae = React.lazy(() => import('@/pages/MyBae'))
const Profile = React.lazy(() => import('@/pages/Profile'))

import '@/styles/index.scss';

export default function App() {

  const { isConnected } = useWeb3ModalAccount()

  return (
    <AppContextProvider>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/explore/*" element={
            <Suspense fallback={<Loading />}>
                <Explore />
            </Suspense>
          }/>
          <Route path="/chat" element={
            <Suspense fallback={<Loading />}>
              {
                isConnected ? <Chat /> : <WalletConnectButton />
              }  
            </Suspense>
          }/>
          <Route path="/mybae/*" element={
            <Suspense fallback={<Loading />}>
              {
                isConnected ? <MyBae /> : <WalletConnectButton />
              }
            </Suspense>
          }/>
          <Route path="/profile/*" element={
            <Suspense fallback={<Loading />}>
              {
                isConnected ? <Profile /> : <WalletConnectButton />
              }
            </Suspense>
          } />
          <Route path="*" element={ <NotFound /> }/>
        </Routes>
      </Layout>
    </Router>
    </AppContextProvider>
  );
}