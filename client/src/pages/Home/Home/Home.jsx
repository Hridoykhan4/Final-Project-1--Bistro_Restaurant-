import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import OurRecommends from "../OurRecommends/OurRecommends";
import OurSlogan from "../OurSlogan/OurSlogan";
import PopularMenu from "../PopularMenu/PopularMenu";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
  return (
    <section>
      <Banner></Banner>
      <Category></Category>
      <OurSlogan></OurSlogan>
      <PopularMenu></PopularMenu>
      <OurRecommends></OurRecommends>
      <Featured></Featured>
      <Testimonials></Testimonials>
    </section>
  );
};

export default Home;
