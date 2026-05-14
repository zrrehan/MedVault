import FAQ from "./_component/Home/FAQ";
import Hero from "./_component/Home/Hero";
import HowItWorks from "./_component/Home/HowItWorks";
import Testimonials from "./_component/Home/Testimonial";
import Categories from "./_component/Home/Categories";
import Features from "./_component/Home/Features";
import AppPromo from "./_component/Home/AppPromo";
import Newsletter from "./_component/Home/Newsletter";
import Partners from "./_component/Home/Partners";
import HealthTips from "./_component/Home/HealthTips";

export default function Home() {
  return (
    <div>
      <Hero />
      <Partners />
      <Categories />
      <HowItWorks />
      <Features />
      <HealthTips />
      <Testimonials />
      <AppPromo />
      <FAQ />
      <Newsletter />
    </div>
  );
}
