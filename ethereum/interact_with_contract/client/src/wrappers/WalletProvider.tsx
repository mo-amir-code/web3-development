import { Contract } from "ethers";
import { ethers } from "ethers";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { contractABI, contractAddress } from "../utils";

interface WalletContextType {
  provider: any;
  signer: any;
  address: string | null;
  isConnected: boolean;
  contract: any;
  setProvider: Function;
  setSigner: Function;
  setAddress: Function;
  setIsConnected: Function;
  setContract: Function;
}

const defaultState: WalletContextType = {
  provider: null,
  signer: null,
  address: null,
  isConnected: false,
  contract: null,
  setProvider: () => {},
  setSigner: () => {},
  setAddress: () => {},
  setIsConnected: () => {},
  setContract: () => {},
};

const WalletContextAPI = createContext<WalletContextType>(defaultState);

const WalletContextProvider = ({ children }: { children: ReactNode }) => {
  const [provider, setProvider] = useState<any>(null);
  const [signer, setSigner] = useState<any>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [contract, setContract] = useState<any>(null);

  const handleToConnect = async () => {
    try {
      await window.ethereum?.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum!);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setProvider(provider);
      setSigner(signer);
      setAddress(address);

      setIsConnected(true);
    } catch (error) {
      console.error("Error while connecting metamask wallet: ", error);
    }
  };

  const handleToCreateWallet = async () => {
    try {
      const contract = new Contract(contractAddress, contractABI, signer);
      setContract(contract);
      console.log("Contract instance initialized");
    } catch (error) {
      console.error("Error while creating contract instance: ", error);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      handleToConnect();
    } else {
      console.log("Metamask is not detected or installed");
    }
  }, [window.ethereum]);

  useEffect(() => {
    if (signer) handleToCreateWallet();
  }, [signer]);

  const values = {
    provider,
    signer,
    address,
    isConnected,
    contract,
    setIsConnected,
    setProvider,
    setSigner,
    setAddress,
    setContract,
  };

  return (
    <WalletContextAPI.Provider value={values}>
      {children}
    </WalletContextAPI.Provider>
  );
};

const useWalletContext = () => useContext(WalletContextAPI);

export { useWalletContext };
export default WalletContextProvider;
