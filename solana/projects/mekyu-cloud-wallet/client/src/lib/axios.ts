import { SERVER_BASE_URL } from "@/config/secrets";
import axios from "axios";

const httpAxios = axios.create({
  baseURL: SERVER_BASE_URL,
  headers: {
    Referer: "https://mekyu-cloud-wallet.vercel.app/", // or any value you want to set as Referer
  },
});

export { httpAxios };
