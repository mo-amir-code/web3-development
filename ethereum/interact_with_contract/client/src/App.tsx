import { WalletProvider } from "./wrappers";
import { HomePage } from "./pages";

const App = () => {
  return (
    <WalletProvider>
      <HomePage />
    </WalletProvider>
  );
};

export default App;
