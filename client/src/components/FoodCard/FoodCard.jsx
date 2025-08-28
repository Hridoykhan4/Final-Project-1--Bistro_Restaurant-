// eslint-disable-next-line no-unused-vars
import {easeInOut, motion} from 'framer-motion'
const FoodCard = ({ item }) => {
  const { name, price, recipe, image } = item || {};

  return (
    <motion.div
    initial={{opacity: 0, y: 10}}
    whileInView={{opacity: 1, y: 0}}
    transition={{ease: easeInOut, duration:0.5, delay: 0.1}}
    className="card bg-base-100 shadow-xl rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
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
          <button className="btn bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full px-6 hover:opacity-90 transition">
            Order Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
