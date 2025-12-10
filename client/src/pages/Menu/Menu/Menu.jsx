import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg from "../../../assets/menu/banner3.jpg";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import MenuCategory from "../MenuCategory/MenuCategory";

// Category background images
import dessertBg from "../../../assets/menu/dessert-bg.jpeg";
import soupBg from "../../../assets/menu/soup-bg.jpg";
import saladBg from "../../../assets/menu/salad-bg.jpg";
import pizzaBg from "../../../assets/menu/pizza-bg.jpg";
import useScrollTo from "../../../hooks/useScrollTo";

const Menu = () => {
  useScrollTo();
  const { menu } = useMenu();

  const categories = [
    {
      key: "dessert",
      title: "Dessert",
      desc: "Sweet delights to end your meal with a smile",
      coverImage: dessertBg,
    },
    {
      key: "soup",
      title: "Soup",
      desc: "Warm, comforting, and full of flavor",
      coverImage: soupBg,
    },
    {
      key: "salad",
      title: "Salad",
      desc: "Fresh, healthy, and crunchy bites",
      coverImage: saladBg,
    },
    {
      key: "pizza",
      title: "Pizza",
      desc: "Cheesy, crispy, and baked to perfection",
      coverImage: pizzaBg,
    },
  ];

  const categorizedMenu =
    menu?.reduce((acc, item) => {
      const cat = item?.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    }, {}) || {};

  return (
    <section>
      <Helmet>
        <title>Bistro | Menu</title>
      </Helmet>

      {/* Main Hero Cover */}
      <Cover
        img={menuImg}
        title="Our Menu"
        desc="Would you like to try a dish ?"
      />

      {/* Today's Offer Section */}
      <SectionTitle
        subHeading="---Don't miss---"
        heading="🔥 Today's Offer 🔥"
      />
      <MenuCategory items={categorizedMenu["offered"] || []} />

      {categories?.map(({ key, title, desc, coverImage }) => (
        <MenuCategory
          key={key}
          title={title}
          desc={desc}
          coverImage={coverImage}
          items={categorizedMenu[key] || []}
        ></MenuCategory>
      ))}
    </section>
  );
};

export default Menu;
