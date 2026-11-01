import { NextRequest, NextResponse } from "next/server";
import {
  adminLoginSchema,
  isAdminConfigured,
  setAdminSessionCookie,
  verifyAdminPassword,
} from "@/features/admin";

export async function POST(req: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { message: "Admin access is not configured" },
      { status: 503 },
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = adminLoginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  const isValid = await verifyAdminPassword(parsed.data.password);
  if (!isValid) {
    return NextResponse.json(
      { message: "Incorrect password" },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ message: "Authenticated" });
  setAdminSessionCookie(response);

  return response;
}
