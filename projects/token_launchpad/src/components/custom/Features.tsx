import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Airdrop from "./Airdrop";
import CreateToken from "./CreateToken";
import Transfer from "./Transfer";

const Features = () => {
  return (
    // <section className="w-full hover:bg-green-600" >
    <Tabs className="w-full" defaultValue="create-token">
      <TabsList>
        <TabsTrigger value="create-token">Create Token</TabsTrigger>
        <TabsTrigger value="transfer">Transfer</TabsTrigger>
        <TabsTrigger value="Airdrop">Airdrop</TabsTrigger>
      </TabsList>
      <TabsContent value="create-token">
        <CreateToken />
      </TabsContent>
      <TabsContent value="transfer">
        <Transfer />
      </TabsContent>
      <TabsContent value="Airdrop">
        <Airdrop />
      </TabsContent>
    </Tabs>
    // </section>
  );
};

export default Features;
