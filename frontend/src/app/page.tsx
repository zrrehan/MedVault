import FAQ from "./_component/Home/FAQ";
import Hero from "./_component/Home/Hero";
import HowItWorks from "./_component/Home/HowItWorks";
import Testimonials from "./_component/Home/Testimonial";

export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <HowItWorks></HowItWorks>
      <Testimonials></Testimonials>
      <FAQ></FAQ>
    </div>
  );
}
