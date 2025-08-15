/// <reference types="vite/client" />

import { MetaMaskInpageProvider } from "@metamask/providers"; // If using @metamask/providers

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider; // Using MetaMaskInpageProvider for specific types
    // Or, if not using @metamask/providers:
    // ethereum?: any; // Less specific, but avoids the error
    // ethereum?: import('ethers').providers.ExternalProvider; // If using ethers.js
  }
}
