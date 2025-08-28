import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";

const PopularMenu = () => {
  const [menu, loading] = useMenu();
  const popular = menu.filter((m) => m.category === "popular");

  if (loading)
    return (
      <>
        <span className="loading loading-dots loading-lg"></span>
        <span className="loading loading-dots loading-xl"></span>
      </>
    );
  return (
    <section className="w-full max-w-7xl mx-auto px-4 mb-20 mt-6">
      <SectionTitle
        heading="From Our Menu"
        subHeading="--- Popular Items ---"
      />
      <div className="grid sm:grid-cols-2 gap-4">
        {popular?.map((item) => (
          <MenuItem item={item} key={item._id}></MenuItem>
        ))}
      </div>
      <div className="text-center">
        <button className="btn mt-6 bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-full font-semibold tracking-wide shadow-md hover:shadow-lg transition-transform hover:scale-105">
          View Full Menu ➡️
        </button>
      </div>
    </section>
  );
};

export default PopularMenu;
