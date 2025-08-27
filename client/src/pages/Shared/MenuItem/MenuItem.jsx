const MenuItem = ({ item }) => {
  const { name, price, recipe, image } = item || {};
  return (
    <div className="flex items-center gap-6 p-4 rounded-2xl shadow-md bg-white hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <img
        className="w-28 h-28 rounded-[40%] object-cover object-center shadow-md"
        src={image}
        alt={name}
      />

      {/* Text Section */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h2 className="uppercase font-semibold text-lg tracking-wide text-gray-800">
            {name}
          </h2>
          <span className="text-amber-600 font-bold text-lg">${price}</span>
        </div>
        <p className="text-gray-600 text-sm mt-2 leading-relaxed">{recipe}</p>
      </div>
    </div>
  );
};

export default MenuItem;
