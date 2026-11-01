import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdmin, AdminLoginForm } from "@/features/admin";

export const metadata: Metadata = {
  title: "Sign in | Content Studio",
  description: "Sign in to manage portfolio content.",
};

export default async function DashboardLoginPage() {
  if (await isAdmin()) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-warm px-4 py-12">
      <AdminLoginForm />
    </div>
  );
}
