import { Helmet } from "react-helmet-async";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Cover from "../../Shared/Cover/Cover";
import useMenu from "../../../hooks/useMenu";
import FoodCard from "../../../components/FoodCard/FoodCard";

import orderCover from "../../../assets/shop/order.jpg";

/* Swiper */
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const categories = ["salad", "pizza", "soup", "dessert", "drinks"];

// Utility: split array into N-size chunks
const chunkArray = (arr, size) =>
  [...Array(Math.ceil(arr.length / size))].map((_, i) =>
    arr.slice(i * size, i * size + size)
  );

const Order = () => {
  const nav = useNavigate();
  const { category } = useParams();
  const { menu } = useMenu();

  /** Determine tab from URL */
  const initialTab = categories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(initialTab >= 0 ? initialTab : 0);

  /** Sync tab when URL changes */
  useEffect(() => {
    const idx = categories.indexOf(category);
    if (idx === -1) return;
    setTabIndex(idx);
  }, [category]);

  /** Group menu by category */
  const categorizedMenu = useMemo(() => {
    const grouped = Object.fromEntries(categories.map((c) => [c, []]));
    menu.forEach((item) => {
      if (grouped[item.category]) grouped[item.category].push(item);
    });
    return grouped;
  }, [menu]);

  /** Handle tab switch + sync URL */
  const handleTabSelect = (index) => {
    setTabIndex(index);
    nav(`/order/${categories[index]}`);
  };

  /** Desktop autoplay only */
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
        <title>Cafe Aziz | Order</title>
      </Helmet>

      {/* Header Cover */}
      <Cover
        img={orderCover}
        title="Order Food"
        desc="Your cravings, delivered hot & fresh!"
      />

      {/* Intro Section */}
      <div className="max-w-3xl mx-auto text-center px-6 mt-10">
        <h2 className="text-4xl font-bold tracking-tight mb-4">
          🍴 Choose. Click. Enjoy.
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Explore our delicious categories and pick your favorites — freshly
          made and ready to serve.
        </p>
      </div>

      {/* Tabs Section */}
      <div className="max-w-7xl mx-auto px-6 my-12">
        <Tabs selectedIndex={tabIndex} onSelect={handleTabSelect}>
          <TabList className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 border-b pb-4">
            {categories.map((c) => (
              <Tab
                key={c}
                className="px-6 py-2 text-lg rounded-lg cursor-pointer capitalize transition
                           duration-300 hover:bg-gray-100 font-medium"
                selectedClassName="bg-indigo-600 text-white shadow-md"
              >
                {c}
              </Tab>
            ))}
          </TabList>

          {/* Panels for each category */}
          {categories.map((c) => {
            const items = categorizedMenu[c];
            const slides = chunkArray(items, 6);

            return (
              <TabPanel key={c}>
                {items.length === 0 ? (
                  <p className="text-center text-gray-500 italic mt-6">
                    No items available
                  </p>
                ) : (
                  <Swiper
                    modules={[Pagination, Autoplay, Navigation]}
                    navigation
                    pagination={{ type: "fraction", clickable: true }}
                    autoplay={autoplaySettings}
                    loop={items.length > 6} 
                    spaceBetween={30}
                    className="mt-10"
                  >
                    {slides.map((group, idx) => (
                      <SwiperSlide key={idx}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-5 sm:px-20">
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
