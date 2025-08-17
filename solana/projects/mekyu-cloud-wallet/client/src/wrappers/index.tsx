import type { Props } from "@/types/layouts";
import Routes from "./Routes";
import { Toaster } from "react-hot-toast";

const AllProvider: React.FC<Props> = () => {
  return (
    <main>
      <Routes />
      <Toaster position="bottom-right" />
    </main>
  );
};

export default AllProvider;
