// eslint-disable-next-line no-unused-vars
import { easeInOut, motion } from "framer-motion";
import useAuthValue from "../../hooks/useAuthValue";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
const FoodCard = ({ item }) => {
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();
  const { name, price, recipe, image, _id } = item || {};
  const { user } = useAuthValue();
  const location = useLocation();
  const nav = useNavigate();
  const handleAddToCart = async () => {
    if (user && user?.email) {
      // send cart item to the database
      const cartItem = {
        menuId: _id,
        email: user?.email,
        name,
        image,
        price,
      };
      try {
        const { data } = await axiosSecure.post("/carts", cartItem);
        if (data?.insertedId) {
          Swal.fire({
            title: "✅ Added!",
            text: `${name} has been added to your cart.`,
            icon: "success",
            background: "#f0fdf4",
            color: "#166534",
            timer: 2000,
            showConfirmButton: false,
          });
        }

        // Refetch the cart
        refetch();
      } catch (err) {
        console.log(err);
        Swal.fire({
          title: "Oops!",
          text: "Something went wrong while adding to cart.",
          icon: "error",
          background: "#fef2f2",
          color: "#7f1d1d",
          confirmButtonColor: "#ef4444",
        });
      }
    } else {
      Swal.fire({
        title: "⚠️ You are not logged in",
        text: "Please login to add items to your cart!",
        icon: "warning",
        background: "#f0f9ff",
        color: "#0f172a",
        showCancelButton: true,
        confirmButtonColor: "#0ea5e9",
        cancelButtonColor: "#94a3b8",
        confirmButtonText: "Yes, Login!",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          nav("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ ease: easeInOut, duration: 0.5, delay: 0.1 }}
      className="card bg-base-100 shadow-xl rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
    >
      {/* Food Image */}
      <figure className="relative">
        <img src={image} alt={name} className="w-full h-56 object-cover" />
        {/* Price Tag */}
        <span className="absolute top-3 right-3 bg-black/70 text-white text-sm font-semibold px-3 py-1 rounded-full">
          ${price}
        </span>
      </figure>

      {/* Card Content */}
      <div className="card-body space-y-3">
        <h2 className="card-title text-lg font-bold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-600 line-clamp-3">{recipe}</p>

        {/* Order Button */}
        <div className="card-actions justify-center mt-3">
          <button
            onClick={handleAddToCart}
            className="btn bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full px-6 hover:opacity-90 transition"
          >
            Order Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
