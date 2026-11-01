import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_MAX_AGE,
} from "../constants/admin-auth.constant";
import type { AdminSessionCookie } from "../admin-auth.types";

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (secret) return secret;

  const keySource =
    process.env.ADMIN_PASSWORD_HASH || process.env.ADMIN_PASSWORD;
  if (!keySource) {
    throw new Error(
      "ADMIN_PASSWORD_HASH or ADMIN_PASSWORD must be configured.",
    );
  }

  return createHash("sha256").update(`${keySource}:admin_session`).digest("hex");
}

function sign(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createAdminToken(now = Date.now()): string {
  const expiresAt = String(now + ADMIN_SESSION_MAX_AGE * 1000);
  return `${expiresAt}.${sign(expiresAt)}`;
}

export function verifyAdminToken(token: string | undefined): boolean {
  if (!token) return false;

  try {
    const parts = token.split(".");
    if (parts.length !== 2) return false;

    const [expiresAt, signature] = parts;
    if (!expiresAt || !signature || !/^\d+$/.test(expiresAt)) return false;

    const parsedExpiry = Number(expiresAt);
    if (!Number.isSafeInteger(parsedExpiry) || parsedExpiry <= Date.now()) {
      return false;
    }

    const expected = sign(expiresAt);
    const actualBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expected);

    return (
      actualBuffer.length === expectedBuffer.length &&
      timingSafeEqual(actualBuffer, expectedBuffer)
    );
  } catch {
    return false;
  }
}

export async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifyAdminToken(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
}

export function isAdminConfigured(): boolean {
  return Boolean(
    process.env.ADMIN_PASSWORD_HASH?.trim() ||
      process.env.ADMIN_PASSWORD?.trim(),
  );
}

export async function verifyAdminPassword(value: string): Promise<boolean> {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (hash) {
    try {
      const normalized = hash.startsWith("$2y$")
        ? `$2a$${hash.slice(4)}`
        : hash;
      return await bcrypt.compare(value, normalized);
    } catch {
      return false;
    }
  }

  const fallback = process.env.ADMIN_PASSWORD;
  if (!fallback) return false;

  if (
    fallback.startsWith("$2a$") ||
    fallback.startsWith("$2b$") ||
    fallback.startsWith("$2y$")
  ) {
    try {
      const normalized = fallback.startsWith("$2y$")
        ? `$2a$${fallback.slice(4)}`
        : fallback;
      return await bcrypt.compare(value, normalized);
    } catch {
      return false;
    }
  }

  const actualHash = createHash("sha256").update(value).digest();
  const expectedHash = createHash("sha256").update(fallback).digest();

  return timingSafeEqual(actualHash, expectedHash);
}

export function createAdminSessionCookie(now = Date.now()): AdminSessionCookie {
  return {
    name: ADMIN_COOKIE_NAME,
    value: createAdminToken(now),
    options: {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: ADMIN_SESSION_MAX_AGE,
    },
  };
}

export function setAdminSessionCookie(
  response: NextResponse,
  token?: string,
): void {
  const sessionCookie = createAdminSessionCookie();
  response.cookies.set(
    sessionCookie.name,
    token ?? sessionCookie.value,
    sessionCookie.options,
  );
}

export function clearAdminSessionCookie(response: NextResponse): void {
  const { options } = createAdminSessionCookie();
  response.cookies.set(ADMIN_COOKIE_NAME, "", {
    ...options,
    maxAge: 0,
  });
}
