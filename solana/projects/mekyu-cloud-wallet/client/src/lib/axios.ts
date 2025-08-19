import { SERVER_BASE_URL } from "@/config/secrets";
import axios from "axios";

const httpAxios = axios.create({
  baseURL: SERVER_BASE_URL,
});

export { httpAxios };
