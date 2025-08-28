import chefService from "../../../assets/home/chef-service.jpg";

const OurSlogan = () => {
  return (
    <div
      className="w-full max-w-7xl mx-auto mb-20 mt-12 px-4 rounded-2xl overflow-hidden shadow-2xl group relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${chefService})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Animated Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>

      {/* Content */}
      <div className="flex z-0 justify-center items-center min-h-[300px] md:min-h-[400px] lg:min-h-[450px] relative ">
        <div className="text-center text-white px-6 md:px-16 lg:px-24 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-wide uppercase drop-shadow-lg animate-slide-down">
            Bistro Boss
          </h2>
          <p className="mt-4 text-sm md:text-lg lg:text-xl font-medium leading-relaxed text-gray-200 animate-slide-up">
            “Where Every Bite Tells a Story — Crafted with Passion, Served with Love.”
          </p>

          {/* Glowing underline */}
          <div className="mt-6 flex justify-center">
            <span className="inline-block w-24 h-1 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 animate-pulse shadow-lg shadow-yellow-400/40"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurSlogan;
