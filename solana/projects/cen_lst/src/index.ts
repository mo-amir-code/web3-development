import express from "express";
import { burnTokens, mintTokens, sendNativeTokens } from "./mintTokens";

const app = express();
app.use(express.json());

const data: any = [];

app.post("/helius", async (req: any, res: any) => {
  console.log(req.body);
  data.push(req.body);

  // const fromAddress = req.body.fromAddress;
  // const toAddress = req.body.toAddress;
  // const amount = req.body.amount;
  // const type = "received_native_sol";

  // if (type === "received_native_sol") {
  //     await mintTokens(fromAddress, toAddress, amount);
  // } else {
  //     // What could go wrong here?
  //     await burnTokens(fromAddress, toAddress, amount);
  //     await sendNativeTokens(fromAddress, toAddress, amount);
  // }

  res.send("Transaction successful");
});

app.get("/", (_req, res) => {
  res.json(data);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
