import orderCover from "../../../assets/shop/order.jpg";
import Cover from "../../Shared/Cover/Cover";
import { Helmet } from "react-helmet-async";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "../../../hooks/useMenu";
import FoodCard from "../../../components/FoodCard/FoodCard";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
/* Swiper */
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Order = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();

  const categories = ["salad", "pizza", "soup", "dessert", "drinks"];
  const { category } = useParams();
  const initialState = categories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(
    initialState === -1 ? 0 : initialState
  );

  const [menu] = useMenu();

  useEffect(() => {
    if (pathname === "/order/salad") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const newIndex = categories.indexOf(category);
    setTabIndex(newIndex === -1 ? 0 : initialState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const handleTabSelect = (index) => {
    setTabIndex(index);
    nav(`/order/${categories[index]}`);
  };

  // helper: chunk items into pages
  const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  return (
    <section>
      <Helmet>
        <title>Bistro | Order</title>
      </Helmet>
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
          you’re craving something cheesy, spicy, or sweet – we’ve got it
          covered.
        </p>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mb-10 mx-auto px-4 sm:px-0">
        <Tabs selectedIndex={tabIndex} onSelect={handleTabSelect}>
          {/* Tab List */}
          <TabList className="flex justify-center gap-6 border-b-2 border-gray-200 pb-4">
            {categories.map((category) => (
              <Tab
                key={category}
                className="react-tabs__tab px-6 py-2 text-lg font-medium cursor-pointer rounded-lg transition-all capitalize duration-300"
                selectedClassName="bg-indigo-600 text-white rounded-lg shadow-md"
              >
                {category}
              </Tab>
            ))}
          </TabList>

          {/* Panels */}
          {categories.map((category) => {
            const items = menu.filter((m) => m.category === category);
            const pages = chunkArray(items, 6);

            return (
              <TabPanel key={category}>
                {items.length > 0 ? (
                  <Swiper
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                    spaceBetween={30}
                    className="my-6"
                  >
                    {pages.map((page, pageIndex) => (
                      <SwiperSlide key={pageIndex}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                          {page.map((item) => (
                            <FoodCard key={item._id} item={item} />
                          ))}
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <p className="text-gray-500 italic">No items found</p>
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
