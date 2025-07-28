import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const CreateToken = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Token</CardTitle>
        <CardDescription>
          Easily create your own SPL (Solana Program Library) token on the
          Solana blockchain using this simple and secure form.
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default CreateToken;
