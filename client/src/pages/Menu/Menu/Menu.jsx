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
  const [menu] = useMenu();

  // Category filters
  const dessert = menu.filter((m) => m.category === "dessert");
  const soup = menu.filter((m) => m.category === "soup");
  const salad = menu.filter((m) => m.category === "salad");
  const pizza = menu.filter((m) => m.category === "pizza");
  const offered = menu.filter((m) => m.category === "offered");

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
      <MenuCategory items={offered} />

      {/* Dessert Section */}
      <MenuCategory
        title="Dessert"
        desc="Sweet delights to end your meal with a smile"
        coverImage={dessertBg}
        items={dessert}
      />

      {/* Soup Section */}
      <MenuCategory
        title="Soup"
        desc="Warm, comforting, and full of flavor"
        coverImage={soupBg}
        items={soup}
      />

      {/* Salad Section */}
      <MenuCategory
        title="Salad"
        desc="Fresh, healthy, and crunchy bites"
        coverImage={saladBg}
        items={salad}
      />

      {/* Pizza Section */}
      <MenuCategory
        title="Pizza"
        desc="Cheesy, crispy, and baked to perfection"
        coverImage={pizzaBg}
        items={pizza}
      />
    </section>
  );
};

export default Menu;
