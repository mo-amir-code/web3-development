import { HomePage } from "./pages";
import { Provider } from "./wrappers";

const App = () => {
  return (
    <Provider>
      <HomePage />
    </Provider>
  );
};

export default App;
