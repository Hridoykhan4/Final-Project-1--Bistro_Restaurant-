// Category.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import slide1 from "../../../assets/home/slide1.jpg";
import slide2 from "../../../assets/home/slide2.jpg";
import slide3 from "../../../assets/home/slide3.jpg";
import slide4 from "../../../assets/home/slide4.jpg";
import slide5 from "../../../assets/home/slide5.jpg";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Category = () => {
  const slides = [
    { img: slide1, title: "SALADS" },
    { img: slide2, title: "SOUPS" },
    { img: slide3, title: "PIZZAS" },
    { img: slide4, title: "DESSERTS" },
    { img: slide5, title: "SALADS" },
  ];

  // Framer Motion Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 mb-20 mt-12">
      <SectionTitle
        heading="Order Online"
        subHeading="--- From 11:00am to 10:00pm ---"
      />

      <Swiper
        slidesPerView={2}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 25 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <motion.div
              className="relative group rounded-2xl overflow-hidden shadow-xl"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.3 }} 
            >
              {/* Image */}
              <motion.img
                src={slide.img}
                alt={slide.title}
                className="w-full h-64 object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/60 to-black/80 opacity-70 group-hover:opacity-90 transition duration-500"></div>

              {/* Title */}
              <motion.h2
                className="absolute bottom-6 left-1/2 -translate-x-1/2 text-2xl md:text-3xl font-extrabold text-white tracking-widest uppercase drop-shadow-lg"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                {slide.title}
              </motion.h2>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Category;
