import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuthValue from "./useAuthValue";

const useUsers = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuthValue()
  // Tanstack Query
  return useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users`);
      return data;
    },
    retry: 3,
    staleTime: 1000 * 60 * 2,
    enabled: !!user
  });
};

export default useUsers;
