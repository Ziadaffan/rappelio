import axios from "axios";
import { getToken } from "@/store/authentification";

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? '';
const API_KEY = process.env.EXPO_PUBLIC_API_KEY ?? '';

export const createApiClientWithToken = async () => {
  const token = await getToken();
  if (!token) {
    throw new Error("No token found");
  }
  return axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "x-api-key": API_KEY,
    },
  });
};

export const createApiClient = async () => {
  console.log("API URL:", API_URL);
  return axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
  });
};
