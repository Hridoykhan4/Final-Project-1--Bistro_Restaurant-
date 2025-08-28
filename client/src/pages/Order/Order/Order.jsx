import useScrollTo from "../../../hooks/useScrollTo";
import orderCover from "../../../assets/shop/order.jpg";
import Cover from "../../Shared/Cover/Cover";

const Order = () => {
  useScrollTo();

  return (
    <section>
      <Cover
        img={orderCover}
        title="Order Food"
        desc="Your cravings, delivered hot & fresh!"
      />

      {/* Extra touch: small intro below the cover */}
      <div className="max-w-4xl mx-auto text-center px-6 my-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
          🍴 Choose. Click. Enjoy.
        </h2>
        <p className="text-gray-600 md:text-lg leading-relaxed animate-slide-up">
          Discover a wide variety of dishes tailored to your taste. Whether
          you’re craving something cheesy, spicy, or sweet – we’ve got it
          covered.
        </p>
      </div>
    </section>
  );
};

export default Order;
