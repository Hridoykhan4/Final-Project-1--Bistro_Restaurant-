import { useMemo } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useCart from "../../../hooks/useCart";

const Cart = () => {
  const [cart] = useCart();
  const totalCost = useMemo(() => {
    return cart.reduce((acc, val) => acc + val.price, 0);
  }, [cart]);
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
                    {/* <div>
                      <div className="font-bold">Hart Hagerty</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div> */}
                  </div>
                </td>
                <td>
                  Zemlak, Daniel and Leannon
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    Desktop Support Technician
                  </span>
                </td>
                <td>Purple</td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
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
