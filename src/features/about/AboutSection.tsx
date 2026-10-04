import { ABOUT_DATA } from "./constants";
import AboutPolaroid from "./components/AboutPolaroid";
import AboutContent from "./components/AboutContent";
import AboutMarquee from "./components/AboutMarquee";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="w-full pt-16 sm:pt-20 md:pt-24 pb-10 sm:pb-14 flex flex-col items-center gap-14 sm:gap-20"
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 xl:gap-24">
        <AboutPolaroid imageSrc={ABOUT_DATA.imageSrc} />
        <AboutContent data={ABOUT_DATA} />
      </div>

      <AboutMarquee />
    </section>
  );
}
