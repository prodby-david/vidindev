import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_MAX_AGE,
  adminLoginSchema,
  clearAdminSessionCookie,
  createAdminSessionCookie,
  createAdminToken,
  isAdminConfigured,
  setAdminSessionCookie,
  verifyAdminPassword,
  verifyAdminToken,
} from "./index";

describe("admin-auth", () => {
  beforeEach(() => {
    delete process.env.ADMIN_SESSION_SECRET;
    delete process.env.ADMIN_PASSWORD;
    delete process.env.ADMIN_PASSWORD_HASH;
  });

  it("creates and verifies a valid admin token", () => {
    process.env.ADMIN_SESSION_SECRET = "test-session-secret-key";
    const token = createAdminToken();
    assert.equal(verifyAdminToken(token), true);
  });

  it("falls back to deriving a key from ADMIN_PASSWORD when ADMIN_SESSION_SECRET is unset", () => {
    process.env.ADMIN_PASSWORD = "correct-horse-battery-staple";
    const token = createAdminToken();
    assert.equal(verifyAdminToken(token), true);
  });

  it("falls back to deriving a key from ADMIN_PASSWORD_HASH when ADMIN_SESSION_SECRET and ADMIN_PASSWORD are unset", () => {
    process.env.ADMIN_PASSWORD_HASH = bcrypt.hashSync("secret-password", 10);
    const token = createAdminToken();
    assert.equal(verifyAdminToken(token), true);
  });

  it("rejects expired, tampered, or malformed tokens", () => {
    process.env.ADMIN_SESSION_SECRET = "test-session-secret-key";
    const expiredToken = createAdminToken(
      Date.now() - (ADMIN_SESSION_MAX_AGE + 10) * 1000,
    );
    assert.equal(verifyAdminToken(expiredToken), false);

    const validToken = createAdminToken();
    const [expiresAt] = validToken.split(".");
    assert.equal(verifyAdminToken(`${expiresAt}.invalid-signature`), false);
    assert.equal(verifyAdminToken("not-a-valid-token"), false);
    assert.equal(verifyAdminToken(undefined), false);
    assert.equal(verifyAdminToken(""), false);
    assert.equal(verifyAdminToken("."), false);
    assert.equal(verifyAdminToken(".."), false);
    assert.equal(verifyAdminToken(`${validToken}.extra`), false);
    assert.equal(verifyAdminToken(`.${validToken}`), false);
    assert.equal(verifyAdminToken(`abc.invalidsignature`), false);
    assert.equal(verifyAdminToken(`-1000.invalidsignature`), false);
    assert.equal(
      verifyAdminToken(`99999999999999999999999999999999.signature`),
      false,
    );
  });

  it("verifies admin password with plaintext ADMIN_PASSWORD fallback", async () => {
    process.env.ADMIN_PASSWORD = "correct-horse-battery-staple";
    assert.equal(
      await verifyAdminPassword("correct-horse-battery-staple"),
      true,
    );
    assert.equal(await verifyAdminPassword("wrong-password"), false);
  });

  it("verifies admin password with ADMIN_PASSWORD_HASH using bcrypt", async () => {
    const password = "my-secure-admin-pass";
    process.env.ADMIN_PASSWORD_HASH = bcrypt.hashSync(password, 10);

    assert.equal(await verifyAdminPassword(password), true);
    assert.equal(await verifyAdminPassword("incorrect-password"), false);
  });

  it("handles malformed or invalid ADMIN_PASSWORD_HASH gracefully", async () => {
    process.env.ADMIN_PASSWORD_HASH = "invalid-truncated-hash";
    assert.equal(await verifyAdminPassword("any-attempt"), false);
  });

  it("verifies admin password when ADMIN_PASSWORD is a bcrypt hash", async () => {
    const password = "admin-password-in-legacy-var";
    process.env.ADMIN_PASSWORD = bcrypt.hashSync(password, 10);

    assert.equal(await verifyAdminPassword(password), true);
    assert.equal(await verifyAdminPassword("incorrect-password"), false);
  });

  it("handles malformed bcrypt prefix in ADMIN_PASSWORD gracefully", async () => {
    process.env.ADMIN_PASSWORD = "$2a$invalid";
    assert.equal(await verifyAdminPassword("attempt"), false);
  });

  it("verifies admin password when ADMIN_PASSWORD is a $2y bcrypt hash", async () => {
    const password = "test-legacy-2y";
    const raw = bcrypt.hashSync(password, 10);
    process.env.ADMIN_PASSWORD = `$2y$${raw.slice(4)}`;

    assert.equal(await verifyAdminPassword(password), true);
    assert.equal(await verifyAdminPassword("wrong"), false);
  });

  it("returns false when neither ADMIN_PASSWORD nor ADMIN_PASSWORD_HASH is set", async () => {
    assert.equal(await verifyAdminPassword("any-password"), false);
  });

  it("reports whether admin access is configured", () => {
    assert.equal(isAdminConfigured(), false);
    process.env.ADMIN_PASSWORD = "   ";
    assert.equal(isAdminConfigured(), false);
    process.env.ADMIN_PASSWORD = "plain";
    assert.equal(isAdminConfigured(), true);
    delete process.env.ADMIN_PASSWORD;
    process.env.ADMIN_PASSWORD_HASH = "   ";
    assert.equal(isAdminConfigured(), false);
    process.env.ADMIN_PASSWORD_HASH = "hashed";
    assert.equal(isAdminConfigured(), true);
  });

  it("creates a well-formed admin session cookie descriptor", () => {
    process.env.ADMIN_SESSION_SECRET = "test-session-secret-key";
    const cookie = createAdminSessionCookie();
    assert.equal(cookie.name, ADMIN_COOKIE_NAME);
    assert.equal(typeof cookie.value, "string");
    assert.equal(verifyAdminToken(cookie.value), true);
    assert.equal(cookie.options.httpOnly, true);
    assert.equal(cookie.options.sameSite, "strict");
    assert.equal(cookie.options.maxAge, ADMIN_SESSION_MAX_AGE);
    assert.equal(cookie.options.path, "/");
  });

  it("sets and clears session cookie on NextResponse", () => {
    process.env.ADMIN_SESSION_SECRET = "test-session-secret-key";
    const response = NextResponse.json({ ok: true });
    setAdminSessionCookie(response);
    const cookie = response.cookies.get(ADMIN_COOKIE_NAME);
    assert.ok(cookie);
    assert.equal(verifyAdminToken(cookie.value), true);
    assert.equal(cookie.httpOnly, true);
    assert.equal(cookie.sameSite, "strict");

    clearAdminSessionCookie(response);
    const cleared = response.cookies.get(ADMIN_COOKIE_NAME);
    assert.ok(cleared);
    assert.equal(cleared.value, "");
    assert.equal(cleared.maxAge, 0);
  });

  it("validates login schema correctly", () => {
    assert.equal(adminLoginSchema.safeParse({ password: "pass" }).success, true);
    assert.equal(adminLoginSchema.safeParse({ password: "" }).success, false);
    assert.equal(adminLoginSchema.safeParse({}).success, false);
    assert.equal(adminLoginSchema.safeParse(null).success, false);
    assert.equal(
      adminLoginSchema.safeParse({ password: "a".repeat(257) }).success,
      false,
    );
  });
});
