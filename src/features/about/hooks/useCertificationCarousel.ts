"use client";

import { useRef, useState, useEffect, useCallback } from "react";

export function useCertificationCarousel(totalItems: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(totalItems > 1);
  const [activeIndex, setActiveIndex] = useState(0);

  const getCardWidth = (el: HTMLDivElement) =>
    el.firstElementChild
      ? (el.firstElementChild as HTMLElement).clientWidth + 24
      : 340;

  const checkScrollState = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const nextIndex = Math.round(scrollLeft / getCardWidth(el));
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
    if (el) el.scrollBy({ left: -getCardWidth(el), behavior: "smooth" });
  };

  const scrollNext = () => {
    const el = containerRef.current;
    if (el) el.scrollBy({ left: getCardWidth(el), behavior: "smooth" });
  };

  const scrollTo = (index: number) => {
    const el = containerRef.current;
    if (el) el.scrollTo({ left: index * getCardWidth(el), behavior: "smooth" });
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
