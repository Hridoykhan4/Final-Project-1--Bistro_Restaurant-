import { useQuery } from "@tanstack/react-query";
import useAuthValue from "../../../../hooks/useAuthValue";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { FaArrowRight } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

const PaymentHistory = () => {
  const { user, loading } = useAuthValue();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [], isPending } = useQuery({
    queryKey: ["payment", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payments?email=${user?.email}`);
      console.log(data);
      return data;
    },
    enabled: !!user && !loading,
  });

  if (isPending) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div>
      <SectionTitle heading={"PAYMENT HISTORY"} subHeading={"At a Glance!"} />
      <h1 className="text-3xl font-bold cinzelFont">
        Total Payments: {payments?.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Payment Date</th>
              <th>Items</th>
              <th>Order Items</th>
            </tr>
          </thead>
          <tbody>
            {payments?.map((history, i) => (
              <tr key={history._id}>
                <th>{i + 1}</th>
                <td>{history?.email}</td>
                <td>{history?.price}</td>
                <td>{history?.status}</td>
                <td>
                  {new Date(history?.createdAt).toLocaleTimeString("en-US")}
                  <br />
                  {new Date(history?.createdAt).toLocaleDateString("en-US")}
                </td>
                <td>{history?.menuItemIds?.length}</td>
                <td>
                  <Link
                    className="btn"
                    to={`menuIds?ids=${history?.menuItemIds.join(",")}`}
                  >
                    <FaArrowRight className="text-sky-700 text-lg"></FaArrowRight>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-10">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
