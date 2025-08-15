import { Features, WalletConnectors } from "./components/custom";
import BackgroundBeams from "./components/ui/BackgroundBeams";
import { Provider } from "./wrapper";

const App = () => {
  return (
    <Provider>
      <div className="font-sans antialiased max-w-4xl mx-auto py-12 sm:py-24 px-6">
        <main className="z-10 flex flex-col items-center gap-4 justify-center">
          <WalletConnectors />
          <Features />
          
        </main>

        <BackgroundBeams />
      </div>
    </Provider>
  );
};

export default App;
