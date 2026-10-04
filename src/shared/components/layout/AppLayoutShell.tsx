"use client";

import { usePathname } from "next/navigation";
import Navigation from "@/shared/components/nav/Navigation";
import Footer from "@/shared/components/footer/Footer";
import ScrollToTop from "@/shared/components/scroll/ScrollToTop";
import ChatbotWidget from "@/features/chatbot/components/ChatbotWidget";

interface AppLayoutShellProps {
  children: React.ReactNode;
}

export default function AppLayoutShell({ children }: AppLayoutShellProps) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      <ScrollToTop />
      <Navigation />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
      <ChatbotWidget />
    </>
  );
}
