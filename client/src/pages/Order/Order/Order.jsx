import useScrollTo from "../../../hooks/useScrollTo";
import orderCover from "../../../assets/shop/order.jpg";
import Cover from "../../Shared/Cover/Cover";
import { Helmet } from "react-helmet-async";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "../../../hooks/useMenu";
import FoodCard from "../../../components/FoodCard/FoodCard";
import { useParams } from "react-router-dom";
import { useState } from "react";
const Order = () => {
  const categories = ["salad", "pizza", "soup", "dessert", "drinks"];
  const { category } = useParams();
  const [tabIndex, setTabIndex] = useState(categories.indexOf(category));
  useScrollTo();
  const [menu] = useMenu();
  return (
    <section className="">
      <Helmet>
        <title>Bistro | Order</title>
      </Helmet>
      <Cover
        img={orderCover}
        title="Order Food"
        desc="Your cravings, delivered hot & fresh!"
      />

      {/* Extra touch: small intro below the cover */}
      <div className="max-w-4xl mx-auto text-center px-6 my-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
          🍴 Choose. Click. Enjoy.
        </h2>
        <p className="text-gray-600 md:text-lg leading-relaxed animate-slide-up">
          Discover a wide variety of dishes tailored to your taste. Whether
          you’re craving something cheesy, spicy, or sweet – we’ve got it
          covered.
        </p>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mb-10 mx-auto px-4 sm:px-0">
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          {/* Tab List */}
          <TabList className="flex justify-center gap-6 border-b-2 border-gray-200 pb-4">
            {categories.map((category) => (
              <Tab
                key={category}
                className="react-tabs__tab px-6 py-2 text-lg font-medium cursor-pointer rounded-lg transition-all capitalize duration-300 hover:bg-gray-100 hover:text-indigo-600"
              >
                {category}
              </Tab>
            ))}
          </TabList>

          {/* Panels */}

          {categories.map((category) => {
            const items = menu.filter((m) => m.category === category);
            return (
              <TabPanel key={category}>
                <div className="grid overflow-hidden grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {items?.length > 0 ? (
                    items.map((item) => (
                      <FoodCard item={item} key={item._id}></FoodCard>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">No items found</p>
                  )}
                </div>
              </TabPanel>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
};

export default Order;
