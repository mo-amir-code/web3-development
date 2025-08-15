import { useEffect, useState } from "react";
import { useWalletContext } from "../wrappers/WalletProvider";
import { ethers } from "ethers";

const HomePage = () => {
  const [counter, setCounter] = useState<number>(0);
  const [network, setNetwork] = useState<any>(null);
  const [balance, setBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { address, provider, isConnected, contract } = useWalletContext();

  const handleToGetCurrentCount = async () => {
    const counter = await contract.getCounter();
    setCounter(counter);
  };

  const handleOnIncrease = async () => {
    setIsLoading(true);
    try {
      if (!contract) return;

      const tx = await contract.increase();
      await tx.wait();

      handleToGetCurrentCount();
      console.log("Value has been increased");
    } catch (error) {
      console.error(
        "Error occurred while increasing the contract counter: ",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnDecrease = async () => {
    setIsLoading(true);
    try {
      if (!contract) return;

      const tx = await contract.decrease();
      await tx.wait();

      handleToGetCurrentCount();
      console.log("Value has been decreased");
    } catch (error) {
      console.error("Error while decreasing the contract counter: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnPay = async () => {
    setIsLoading(true);
    try {
      if (!contract) return;

      const valueToSend = ethers.parseEther("0.001");

      const tx = await contract.transferEth({value: valueToSend});
      await tx.wait();

      handleToGetCurrentCount();
      handleToGetNetwork();

      console.log("Eth has been sent");
    } catch (error) {
      console.error("Error while decreasing the contract counter: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToGetNetwork = async () => {
    const network = await provider.getNetwork();
    setNetwork(network);
    const balance = await provider.getBalance(address);
    setBalance(parseFloat(ethers.formatEther(balance)));
  };

  useEffect(() => {
    if (provider) {
      handleToGetNetwork();
      if (contract) handleToGetCurrentCount();
    }
  }, [provider, contract]);

  return (
    <div className="max-w-2xl mx-auto min-h-dvh p-4">
      <div>
        Address: {address} <br />
        <br />
        connection: {!isConnected ? "Disconnected" : "Connected"} <br />
        <br />
        Counter: {counter} <br />
        <br />
        Network: {network ? network.name : "None"}
        <br />
        <br />
        Balance: {balance.toFixed(4)}
        <br />
        <br />
        <div className="flex items-center gap-2 ">
          <button
            disabled={isLoading}
            onClick={() => handleOnIncrease()}
            className={`${
              isLoading ? "bg-gray-400" : "bg-white"
            } rounded-md px-3 py-1 text-black cursor-pointer`}
          >
            Increase
          </button>
          <button
            disabled={isLoading}
            onClick={() => handleOnDecrease()}
            className={`${
              isLoading ? "bg-gray-400" : "bg-white"
            } rounded-md px-3 py-1 text-black cursor-pointer`}
          >
            Decrease
          </button>
          <button
            disabled={isLoading}
            onClick={() => handleOnPay()}
            className={`${
              isLoading ? "bg-gray-400" : "bg-white"
            } rounded-md px-3 py-1 text-black cursor-pointer`}
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
