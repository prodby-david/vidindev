import { AboutMarqueeItem } from "./about.types";
import { ABOUT_DATA } from "./constants/bio/about.constant";
import AboutPolaroid from "./components/bio/AboutPolaroid";
import AboutContent from "./components/bio/AboutContent";
import AboutMarquee from "./components/marquee/AboutMarquee";

interface AboutSectionProps {
  marqueeItems: AboutMarqueeItem[];
}

export default function AboutSection({ marqueeItems }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="w-full pt-16 sm:pt-20 md:pt-24 pb-10 sm:pb-14 flex flex-col items-center gap-14 sm:gap-20"
    >
      <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 md:px-10 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 xl:gap-24">
        <AboutPolaroid imageSrc={ABOUT_DATA.imageSrc} />
        <AboutContent data={ABOUT_DATA} />
      </div>

      <AboutMarquee items={marqueeItems} />
    </section>
  );
}
