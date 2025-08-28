import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg";
import { Link } from "react-router-dom";

const Featured = () => {
  return (
    <section
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.7)), url(${featuredImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
      className="w-full max-w-7xl mx-auto text-white mb-10 mt-12 px-4 rounded-2xl overflow-hidden shadow-2xl"
    >
      {/* Section Heading */}
      <SectionTitle
        heading="Featured Item"
        subHeading="--- Chef’s Special ---"
      />

      {/* Content */}
      <div className="sm:flex min-h-[300px] md:min-h-[350px] lg:min-h-[450px] justify-center items-center gap-8">
        {/* Image */}
        <div className="flex-1">
          <img
            className="rounded-lg shadow-lg"
            src={featuredImg}
            alt="Featured Dish"
          />
        </div>

        {/* Text */}
        <div className="flex-1 py-10 bg-black/40 p-6 rounded-lg backdrop-blur-xl">
          <p className="text-sm text-gray-300">Aug 20, 2029</p>
          <h3 className="uppercase text-2xl font-bold text-amber-400 mt-2">
            Discover The Bold Flavors
          </h3>
          <p className="text-gray-200 mt-3 leading-relaxed">
            Experience the taste of perfection — a rich fusion of spices, tender
            ingredients, and a smoky finish that leaves a lasting punch. Crafted
            by our master chefs, this dish is not just food — it’s a statement.
          </p>

          <Link to="/order" className="btn mt-6 bg-amber-500 hover:bg-amber-600 border-0 text-white px-6 py-2 rounded-full font-semibold tracking-wide shadow-md hover:shadow-lg transition-transform hover:scale-105">
            Order Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Featured;
