import { ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from "@solana/wallet-adapter-react-ui"
import { clusterApiUrl } from "@solana/web3.js"
import "@solana/wallet-adapter-react-ui/styles.css"
import { useMemo } from "react"
import Airdrop from "./Airdrop"
import { Balance } from "./Balance"
import { SendTokens } from "./SendToken"
import { SignMessage } from "./SignMessage"

const App = () => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
      <ConnectionProvider endpoint={endpoint} >
        <WalletProvider wallets={[]} autoConnect >
          <WalletModalProvider>

            <div>
              <WalletMultiButton />
              <WalletDisconnectButton />
            </div>

            <Airdrop />
            <Balance />
            <SendTokens />
            <SignMessage />

          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
  )
}

export default App
