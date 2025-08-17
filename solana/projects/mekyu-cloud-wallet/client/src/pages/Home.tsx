import { Wallet } from "@/sections";
import { MidScreen } from "@/wrappers/screens";

const Home = () => {
  return (
    <MidScreen className="w-full md:mt-10 mt-4 px-4">
      <Wallet />
    </MidScreen>
  );
};

export default Home;
