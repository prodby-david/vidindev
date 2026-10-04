import SplashScreen from "@/features/splash/components/SplashScreen";
import HeroSection from "@/features/hero/HeroSection";
import HomeCapabilitiesSection from "@/features/home/components/HomeCapabilitiesSection";
import HomeProcessSection from "@/features/home/components/HomeProcessSection";
import HomeAboutPreviewSection from "@/features/home/components/HomeAboutPreviewSection";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      <SplashScreen />
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
        <HeroSection />
      </div>
      <HomeCapabilitiesSection />
      <HomeProcessSection />
      <HomeAboutPreviewSection />
    </div>
  );
}
