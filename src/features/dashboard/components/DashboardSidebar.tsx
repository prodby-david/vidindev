"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Layers, ExternalLink, LogOut, X } from "lucide-react";
import ThemeToggle from "@/shared/components/theme/ThemeToggle";
import NavBrand from "@/shared/components/nav/NavBrand";
import { DashboardTab } from "../dashboard.types";
import {
  DASHBOARD_NAV_TABS,
  TAB_ICON_MAP,
} from "../constants/dashboard-nav.constant";

interface DashboardSidebarProps {
  activeTab: DashboardTab;
  isOpen?: boolean;
  onClose?: () => void;
  onSelectTab: (tab: DashboardTab) => void;
}

export default function DashboardSidebar({
  activeTab,
  isOpen = false,
  onClose,
  onSelectTab,
}: DashboardSidebarProps) {
  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.assign("/dashboard/login");
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="dashboard-mobile-backdrop"
            role="presentation"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 lg:static lg:z-auto lg:w-64 xl:w-72 h-full shrink-0 flex flex-col justify-between border-r border-deep-ocean/10 dark:border-horizon/15 bg-polaroid dark:bg-sand/40 p-4 transition-transform duration-250 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between px-2 pt-1">
            <div className="flex flex-col gap-0.5">
              <NavBrand />
              <span className="text-[10px] text-ocean uppercase font-mono tracking-wider">
                Content Studio
              </span>
            </div>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="lg:hidden p-1.5 rounded-md text-ocean hover:text-deep-ocean hover:bg-sand/60 transition-colors"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-ocean uppercase tracking-wider px-2">
              Dashboard Navigation
            </span>

            <nav className="flex flex-col gap-1">
              {DASHBOARD_NAV_TABS.map((tab) => {
                const Icon = TAB_ICON_MAP[tab.iconName] || Layers;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => onSelectTab(tab.id)}
                    className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-md text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer text-left ${
                      isActive
                        ? "bg-ocean text-white shadow-xs scale-[1.01]"
                        : "text-deep-ocean hover:bg-sand/60 dark:hover:bg-sand/60 hover:text-horizon"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon size={16} className="shrink-0" />
                      <span>{tab.label}</span>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="pt-4 border-t border-deep-ocean/10 dark:border-horizon/15 flex flex-col gap-3 px-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-ocean font-medium">Appearance</span>
            <ThemeToggle />
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-md text-xs font-semibold text-deep-ocean hover:text-horizon bg-sand/40 dark:bg-sand/60 hover:bg-sand/70 transition-colors cursor-pointer"
          >
            <span>View Public Site</span>
            <ExternalLink size={13} />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center justify-between px-3 py-2 rounded-md text-xs font-semibold text-ocean hover:text-red-600 hover:bg-red-500/5 transition-colors cursor-pointer"
          >
            <span>Sign out</span>
            <LogOut size={13} />
          </button>
        </div>
      </aside>
    </>
  );
}
