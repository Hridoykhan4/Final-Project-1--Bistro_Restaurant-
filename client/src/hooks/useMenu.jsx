import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useMenu = () => {
  const axiosPublic = useAxiosPublic();
  // Tanstack Query
  const { data: menu = [], refetch , isLoading: loading} = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/menu`);
      return data;
    },
  });
  return { menu, refetch , loading};
};

export default useMenu;
