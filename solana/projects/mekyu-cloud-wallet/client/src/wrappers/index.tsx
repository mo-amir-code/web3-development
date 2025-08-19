import type { Props } from "@/types/layouts";
import Routes from "./Routes";
import { Toaster } from "react-hot-toast";
import TanStackQuery from "./TanStackQuery";

const AllProvider: React.FC<Props> = () => {
  return (
    <main>
      <TanStackQuery>
        <Routes />
      </TanStackQuery>
      <Toaster position="bottom-right" />
    </main>
  );
};

export default AllProvider;
