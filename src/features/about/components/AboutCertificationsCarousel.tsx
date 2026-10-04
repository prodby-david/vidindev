"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { AboutCertItem } from "../about.types";
import { useCertificationCarousel } from "../hooks/useCertificationCarousel";
import AboutCertificateCard from "./AboutCertificateCard";

interface AboutCertificationsCarouselProps {
  items: AboutCertItem[];
}

export default function AboutCertificationsCarousel({
  items,
}: AboutCertificationsCarouselProps) {
  const {
    containerRef,
    canScrollLeft,
    canScrollRight,
    activeIndex,
    scrollPrev,
    scrollNext,
    scrollTo,
  } = useCertificationCarousel(items.length);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-end gap-2.5">
        <button
          type="button"
          onClick={scrollPrev}
          disabled={!canScrollLeft}
          aria-label="Previous certificates"
          className="p-2.5 rounded-full bg-polaroid dark:bg-sand/40 border border-deep-ocean/10 dark:border-horizon/20 text-deep-ocean hover:text-horizon hover:border-horizon/40 disabled:opacity-35 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          type="button"
          onClick={scrollNext}
          disabled={!canScrollRight}
          aria-label="Next certificates"
          className="p-2.5 rounded-full bg-polaroid dark:bg-sand/40 border border-deep-ocean/10 dark:border-horizon/20 text-deep-ocean hover:text-horizon hover:border-horizon/40 disabled:opacity-35 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 px-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, idx) => (
          <div
            key={item.id}
            className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start"
          >
            <AboutCertificateCard item={item} index={idx} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 pt-2">
        {items.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              activeIndex === idx
                ? "w-7 bg-horizon"
                : "w-2 bg-deep-ocean/20 dark:bg-horizon/30 hover:bg-horizon/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
