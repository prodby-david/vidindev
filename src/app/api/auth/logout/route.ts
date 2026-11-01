import { NextResponse } from "next/server";
import { clearAdminSessionCookie } from "@/features/admin";

export async function POST() {
  const response = NextResponse.json({ message: "Signed out" });
  clearAdminSessionCookie(response);
  return response;
}
