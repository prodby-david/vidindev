import HeroHeader from "./components/HeroHeader";
import HeroPolaroid from "./components/HeroPolaroid";

export default function HeroSection() {
  return (
    <section className="bg-warm flex items-center gap-x-5 justify-around w-full px-5">
      <HeroHeader />
      <HeroPolaroid />
    </section>
  );
}
