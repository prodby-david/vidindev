"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ExternalLink } from "lucide-react";
import ThemeToggle from "@/shared/components/theme/ThemeToggle";
import NavBrand from "@/shared/components/nav/NavBrand";
import { DashboardTab } from "../dashboard.types";
import { DASHBOARD_NAV_TABS } from "../constants";
import DashboardSidebar from "./DashboardSidebar";
import DashboardAnalyticsTab from "./tabs/DashboardAnalyticsTab";
import DashboardMarqueeTab from "./tabs/DashboardMarqueeTab";
import DashboardSkillsTab from "./tabs/DashboardSkillsTab";
import DashboardCertificationsTab from "./tabs/DashboardCertificationsTab";
import DashboardGearTab from "./tabs/DashboardGearTab";
import DashboardProjectsTab from "./tabs/DashboardProjectsTab";
import DashboardExperienceTab from "./tabs/DashboardExperienceTab";
import DashboardContactTab from "./tabs/DashboardContactTab";

export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("analytics");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const activeTabMeta = DASHBOARD_NAV_TABS.find((t) => t.id === activeTab);

  const renderActiveTab = () => {
    switch (activeTab) {
      case "analytics":
        return <DashboardAnalyticsTab />;
      case "marquee":
        return <DashboardMarqueeTab />;
      case "skills":
        return <DashboardSkillsTab />;
      case "certifications":
        return <DashboardCertificationsTab />;
      case "gear":
        return <DashboardGearTab />;
      case "projects":
        return <DashboardProjectsTab />;
      case "experience":
        return <DashboardExperienceTab />;
      case "contact":
        return <DashboardContactTab />;
    }
  };

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row bg-warm text-deep-ocean overflow-hidden">
      <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-deep-ocean/10 dark:border-horizon/15 bg-polaroid dark:bg-sand/40 shrink-0">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="p-1.5 rounded-md text-ocean hover:text-deep-ocean hover:bg-sand/60 dark:hover:bg-sand/60 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <NavBrand />
          {activeTabMeta && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-horizon/10 text-horizon">
              {activeTabMeta.label}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/"
            target="_blank"
            className="p-1.5 rounded-md text-ocean hover:text-horizon hover:bg-sand/60 transition-colors cursor-pointer"
            aria-label="View live site"
          >
            <ExternalLink size={16} />
          </Link>
        </div>
      </div>

      <DashboardSidebar
        activeTab={activeTab}
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setIsMobileNavOpen(false);
        }}
      />

      <main className="flex-1 h-full overflow-y-auto p-4 sm:p-6 lg:p-8 bg-warm">
        <div className="max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="w-full"
            >
              {renderActiveTab()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
