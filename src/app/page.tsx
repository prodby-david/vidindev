import SplashScreen from "@/features/splash/components/SplashScreen";
import HeroSection from "@/features/hero/HeroSection";
import HomeServicesSection from "@/features/home/components/services/HomeServicesSection";
import HomeProcessSection from "@/features/home/components/process/HomeProcessSection";
import HomeAboutPreviewSection from "@/features/home/components/about-preview/HomeAboutPreviewSection";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      <SplashScreen />
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
        <HeroSection />
      </div>
      <HomeServicesSection />
      <HomeProcessSection />
      <HomeAboutPreviewSection />
    </div>
  );
}
