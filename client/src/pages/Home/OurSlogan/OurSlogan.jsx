import chefService from "../../../assets/home/chef-service.jpg";

const OurSlogan = () => {
  return (
    <div
      className="w-full max-w-7xl mx-auto mb-20 mt-12 px-4 rounded-2xl overflow-hidden shadow-2xl"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${chefService})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="flex justify-center items-center min-h-[300px] md:min-h-[400px] lg:min-h-[450px]">
        <div className="text-center bg-black/10 backdrop-blur-2xl text-white px-6 md:px-16 lg:px-24">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-wide uppercase drop-shadow-lg">
            Bistro Boss
          </h2>
          <p className="mt-4 text-sm md:text-lg lg:text-xl font-medium leading-relaxed text-gray-200">
            “Where Every Bite Tells a Story — Crafted with Passion, Served with
            Love.”
          </p>
          <div className="mt-6 flex justify-center">
            <span className="inline-block w-24 border-b-4 border-yellow-400 rounded-full"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurSlogan;
