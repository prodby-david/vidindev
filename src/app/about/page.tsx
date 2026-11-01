import type { Metadata } from "next";
import AboutSection from "@/features/about/AboutSection";
import AboutCertificationsSection from "@/features/about/components/certifications/AboutCertificationsSection";
import { MarqueeRepository } from "@/features/about/repository/marquee.repository";
import { CertificationsService } from "@/features/about/service/certifications.service";
import type { AboutCertItem, AboutMarqueeItem } from "@/features/about/about.types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About | John David Gaspar",
  description:
    "Learn more about John David Gaspar, software engineer based in the Philippines.",
};

async function loadMarquee(): Promise<AboutMarqueeItem[]> {
  try {
    return await MarqueeRepository.getAllSnapshots();
  } catch {
    return [];
  }
}

async function loadCertifications(): Promise<AboutCertItem[]> {
  try {
    return await CertificationsService.getAllCertifications();
  } catch {
    return [];
  }
}

export default async function AboutPage() {
  const [marqueeItems, certifications] = await Promise.all([
    loadMarquee(),
    loadCertifications(),
  ]);

  return (
    <div className="flex-1 flex flex-col">
      <AboutSection marqueeItems={marqueeItems} />
      <AboutCertificationsSection items={certifications} />
    </div>
  );
}
