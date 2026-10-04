import type { Metadata } from "next";
import DashboardLayout from "@/features/dashboard/components/DashboardLayout";

export const metadata: Metadata = {
  title: "Dashboard | Content Studio",
  description: "Content management studio to create, update, and manage portfolio content.",
};

export default function DashboardPage() {
  return (
    <div className="flex-1 flex flex-col w-full bg-warm">
      <DashboardLayout />
    </div>
  );
}
