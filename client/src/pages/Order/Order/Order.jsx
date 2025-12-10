import { Helmet } from "react-helmet-async";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Cover from "../../Shared/Cover/Cover";
import useMenu from "../../../hooks/useMenu";
import FoodCard from "../../../components/FoodCard/FoodCard";

// Images
import orderCover from "../../../assets/shop/order.jpg";

/* Swiper */
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const categories = ["salad", "pizza", "soup", "dessert", "drinks"];

// Reusable chunk helper
const chunk = (array, size) =>
  Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );

const Order = () => {
  const nav = useNavigate();
  const { category } = useParams();
  const { menu } = useMenu();

  // Initial tab value
  const initialTab = categories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(initialTab !== -1 ? initialTab : 0);

  // Sync when URL changes
  useEffect(() => {
    const idx = categories.indexOf(category);
    setTabIndex(idx !== -1 ? idx : 0);
  }, [category]);

  const categorized = useMemo(() => {
    const grouped = {};
    categories.forEach((c) => (grouped[c] = []));
    menu.forEach((item) => {
      if (grouped[item.category]) grouped[item.category].push(item);
    });
    return grouped;
  }, [menu]);

  const handleTabSelect = (index) => {
    setTabIndex(index);
    nav(`/order/${categories[index]}`);
  };

  const autoplaySettings = useMemo(
    () =>
      window.innerWidth > 768
        ? {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }
        : false,
    []
  );

  return (
    <section>
      <Helmet>
        <title>Bistro | Order</title>
      </Helmet>

      {/* Cover */}
      <Cover
        img={orderCover}
        title="Order Food"
        desc="Your cravings, delivered hot & fresh!"
      />

      {/* Intro */}
      <div className="max-w-4xl mx-auto text-center px-6 my-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          🍴 Choose. Click. Enjoy.
        </h2>
        <p className="text-gray-600 md:text-lg leading-relaxed">
          Discover a wide variety of dishes tailored to your taste. Whether
          you're craving something cheesy, spicy, or sweet — we’ve got it all
          ready for you.
        </p>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mb-10 mx-auto px-6 sm:px-0">
        <Tabs selectedIndex={tabIndex} onSelect={handleTabSelect}>
          <TabList className="flex justify-center gap-6 border-b-2 border-gray-200 pb-4">
            {categories.map((c) => (
              <Tab
                key={c}
                className="react-tabs__tab px-6 py-2 text-lg font-medium cursor-pointer rounded-lg capitalize transition-all duration-300"
                selectedClassName="bg-indigo-600 text-white shadow-md"
              >
                {c}
              </Tab>
            ))}
          </TabList>

          {/* Panels */}
          {categories.map((c) => {
            const items = categorized[c];
            const slides = chunk(items, 6);

            return (
              <TabPanel key={c}>
                {items.length === 0 ? (
                  <p className="text-gray-500 italic mt-6">
                    No items available
                  </p>
                ) : (
                  <Swiper
                    modules={[Pagination, Autoplay, Navigation]}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={autoplaySettings}
                    loop={items?.length > 5}
                    spaceBetween={30}
                    className="my-6"
                  >
                    {slides.map((group, idx) => (
                      <SwiperSlide key={idx}>
                        <div className="grid grid-cols-1 px-5 sm:px-20 sm:grid-cols-2 md:grid-cols-3 gap-6">
                          {group.map((item) => (
                            <FoodCard key={item._id} item={item} />
                          ))}
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </TabPanel>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
};

export default Order;
