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

const Category = () => {
  const slides = [
    { img: slide1, title: "SALADS" },
    { img: slide2, title: "SOUPS" },
    { img: slide3, title: "PIZZAS" },
    { img: slide4, title: "DESSERTS" },
    { img: slide5, title: "SALADS" },
  ];

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
          1024: { slidesPerView: 4, spaceBetween: 30 },
        }}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative group rounded-2xl overflow-hidden shadow-xl">
              {/* Image */}
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-64 object-cover transform transition duration-700 group-hover:scale-110"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition duration-500"></div>
              {/* Title */}
              <h2 className="absolute bottom-6 left-1/2 -translate-x-1/2 text-2xl md:text-3xl font-extrabold text-white tracking-widest uppercase drop-shadow-lg group-hover:scale-105 transition duration-300">
                {slide.title}
              </h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Category;
