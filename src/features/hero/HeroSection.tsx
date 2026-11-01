import HeroHeader from "./components/HeroHeader";

export default function HeroSection() {
  return (
    <section className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-16 flex items-center justify-center">
      <HeroHeader />
    </section>
  );
}
