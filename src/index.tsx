import 'regenerator-runtime/runtime'
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'
import Loading from '@/components/Loading';

import { availableChains } from "./utils/constants";
import config from "./config";

const App = React.lazy(() => import("./App"));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const metadata = {
  name: 'Project BAE',
  description: 'Create your personal Jarvis -  Engage, Evolve & Earn',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://res.cloudinary.com/dtysxszqe/image/upload/v1702964717/ylt3yueyrhxd1vobi5qc.png']
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: availableChains,
  projectId: config.WALLETCONNECT_PROJECT_ID,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

root.render(
  <Suspense fallback={<Loading />} >
    <App />
  </Suspense>
);