
import Hero from "./components/Hero";
import ProductCategories from "./components/ProductCategories";
import FeaturedProducts from "./components/FeaturedProducts";
import Testimonials from "./components/Testimonials";
import Banner from "./components/Banner";

export default function Home() {
  return (
    <div>
      <Hero />
      <ProductCategories />
      <FeaturedProducts />
      <Testimonials/>
      <Banner />
      
    </div>
  );
}
