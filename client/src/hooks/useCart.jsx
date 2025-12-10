import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuthValue from "./useAuthValue";

const useCart = () => {
    const axiosSecure = useAxiosSecure()
    const {user, loading} = useAuthValue();
    // Tanstack Query
    const {data: cart = [],  refetch} = useQuery({
        queryKey: ['cart', user?.email],
        enabled: !!user && !loading,
        queryFn: async() => {
            const {data} = await axiosSecure.get(`/carts?email=${user.email}`);
            return data
        }
    })
    return {cart, refetch}
};


export default useCart;