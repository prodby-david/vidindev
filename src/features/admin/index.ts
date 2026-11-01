export {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_MAX_AGE,
} from "./constants/admin-auth.constant";

export {
  adminLoginSchema,
  type AdminLoginInput,
} from "./validator/admin-auth.schema";

export {
  createAdminSessionCookie,
  createAdminToken,
  clearAdminSessionCookie,
  isAdmin,
  isAdminConfigured,
  setAdminSessionCookie,
  verifyAdminPassword,
  verifyAdminToken,
} from "./service/admin-auth.service";

export { useAdminLogin } from "./hooks/useAdminLogin";
export { AdminLoginForm, default as AdminLoginFormComponent } from "./components/AdminLoginForm";

export type {
  AdminLoginState,
  AdminSession,
  AdminSessionCookie,
  AdminSessionCookieOptions,
} from "./admin-auth.types";
