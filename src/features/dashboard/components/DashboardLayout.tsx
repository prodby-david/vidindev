"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ExternalLink } from "lucide-react";
import ThemeToggle from "@/shared/components/theme/ThemeToggle";
import NavBrand from "@/shared/components/nav/NavBrand";
import { DashboardTab } from "../dashboard.types";
import { DASHBOARD_NAV_TABS } from "../constants/dashboard-nav.constant";
import DashboardSidebar from "./DashboardSidebar";
import AboutMarqueeTab from "@/features/about/admin/components/marquee/AboutMarqueeTab";
import AboutCertificationsTab from "@/features/about/admin/components/certifications/AboutCertificationsTab";
import GearAdminTab from "@/features/gear/admin/components/GearAdminTab";
import SkillsAdminTab from "@/features/skills/admin/components/SkillsAdminTab";
import ProjectsAdminTab from "@/features/projects/admin/components/showcase/ProjectsAdminTab";
import ExperienceAdminTab from "@/features/experience/admin/components/timeline/ExperienceAdminTab";
import InquiriesTab from "@/features/contact/admin/components/InquiriesTab";

export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("marquee");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const activeTabMeta = DASHBOARD_NAV_TABS.find((t) => t.id === activeTab);

  const renderActiveTab = () => {
    switch (activeTab) {
      case "marquee":
        return <AboutMarqueeTab />;
      case "skills":
        return <SkillsAdminTab />;
      case "certifications":
        return <AboutCertificationsTab />;
      case "gear":
        return <GearAdminTab />;
      case "projects":
        return <ProjectsAdminTab />;
      case "experience":
        return <ExperienceAdminTab />;
      case "inquiries":
        return <InquiriesTab />;
    }
  };

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row bg-warm text-deep-ocean overflow-hidden">
      <header className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-deep-ocean/10 dark:border-horizon/15 bg-polaroid dark:bg-sand/40 shrink-0">
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
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-horizon/10 text-horizon">
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
      </header>

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
