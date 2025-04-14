import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/userService";

export const useGetUser = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser(),
    });
    return { data, isLoading, error };
};

