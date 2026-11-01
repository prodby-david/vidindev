import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdmin } from "@/features/admin";
import DashboardLayout from "@/features/dashboard/components/DashboardLayout";

export const metadata: Metadata = {
  title: "Dashboard | Content Studio",
  description: "Content management studio to create, update, and manage portfolio content.",
};

export default async function DashboardPage() {
  if (!(await isAdmin())) {
    redirect("/dashboard/login");
  }

  return (
    <div className="flex-1 flex flex-col w-full bg-warm">
      <DashboardLayout />
    </div>
  );
}
