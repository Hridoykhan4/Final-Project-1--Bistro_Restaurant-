import { useQuery } from "@tanstack/react-query";
import useAuthValue from "./useAuthValue";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuthValue();
  // Tanstack Query
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/users/admin?email=${user.email}`
      );
      return data?.admin ?? false;
    },
    staleTime: 5 * 60 * 1000,staleTime: 5 * 60 * 1000,
  });
  return { isAdmin, isAdminLoading };
};

export default useAdmin;
