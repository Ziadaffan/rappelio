import { createApiClientWithToken } from "@/axios/createApiClient";
import { User } from "./user";

export const getUser = async () : Promise<User> => {
    const api = await createApiClientWithToken();
    const response = await api.get("/user/me");
    return response.data;
}; 
