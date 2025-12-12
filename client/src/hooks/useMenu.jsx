import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useMenu = ({ forMangeItems = false, page = 1, limit = 10 } = {}) => {
  const axiosPublic = useAxiosPublic();
  // Tanstack Query
  const {
    data = {},
    refetch,
    isLoading: loading,
  } = useQuery({
    queryKey: ["menu", page, limit, forMangeItems],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/menu?forManageItems=${forMangeItems}&page=${page}&limit=${limit}`
      );
      return data;
    },
  });
  return {
    menu: data?.items || [],
    refetch,
    loading,
    total: data?.total || 0,
    totalPages: data?.totalPages || 1,
    page,
    limit,
  };
};

export default useMenu;
