"use client";

import { useRef, useState, useEffect, useCallback } from "react";

export function useCertificationCarousel(totalItems: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(totalItems > 1);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScrollState = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).clientWidth + 24
      : clientWidth;
    const nextIndex = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(nextIndex, 0), totalItems - 1));
  }, [totalItems]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    checkScrollState();
    el.addEventListener("scroll", checkScrollState, { passive: true });
    window.addEventListener("resize", checkScrollState);

    return () => {
      el.removeEventListener("scroll", checkScrollState);
      window.removeEventListener("resize", checkScrollState);
    };
  }, [checkScrollState]);

  const scrollPrev = () => {
    const el = containerRef.current;
    if (!el) return;

    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).clientWidth + 24
      : 340;
    el.scrollBy({ left: -cardWidth, behavior: "smooth" });
  };

  const scrollNext = () => {
    const el = containerRef.current;
    if (!el) return;

    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).clientWidth + 24
      : 340;
    el.scrollBy({ left: cardWidth, behavior: "smooth" });
  };

  const scrollTo = (index: number) => {
    const el = containerRef.current;
    if (!el) return;

    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).clientWidth + 24
      : 340;
    el.scrollTo({ left: index * cardWidth, behavior: "smooth" });
  };

  return {
    containerRef,
    canScrollLeft,
    canScrollRight,
    activeIndex,
    scrollPrev,
    scrollNext,
    scrollTo,
  };
}
