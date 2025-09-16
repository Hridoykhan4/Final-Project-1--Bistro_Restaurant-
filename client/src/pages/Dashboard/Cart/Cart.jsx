import { useMemo } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useCart from "../../../hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Cart = () => {
  const [cart, refetch] = useCart();
  const axiosSecure = useAxiosSecure();
  const totalCost = useMemo(() => {
    return cart.reduce((acc, val) => acc + val.price, 0);
  }, [cart]);

  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      const { data } = await axiosSecure.delete(`/carts/${id}`);
      if (data?.deletedCount > 0) {
        refetch();
        Swal.fire({
          title: "Deleted!",
          text: `${name} has been deleted.`,
          icon: "success",
        });
      }
    }
  };

  return (
    <section>
      <div className="text-center space-y-2">
        <SectionTitle
          heading={"Wanna add more?"}
          subHeading="---MyCart---"
        ></SectionTitle>
        <p className="border border-black/20 w-1/2 mx-auto "></p>
      </div>
      <div className="py-10 flex justify-evenly items-center">
        <h2 className="font-semibold text-lg">Total Orders: {cart?.length}</h2>
        <p className="font-semibold text-lg">Total Price: {totalCost}</p>
        <button className="btn btn-primary">Pay</button>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, i) => (
              <tr key={item._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={item?.image} alt={item?.name} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item?.name}</td>
                <td>${item?.price}</td>
                <th>
                  <button
                    onClick={() => handleDelete(item._id, item?.name)}
                    className="btn btn-ghost btn-lg"
                  >
                    <FaTrashAlt className=" text-red-600"></FaTrashAlt>
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Table end */}
    </section>
  );
};

export default Cart;
