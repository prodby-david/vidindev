export interface AdminSession {
  expiresAt: number;
}

export interface AdminLoginState {
  isSubmitting: boolean;
  error: string | null;
}

export interface AdminSessionCookieOptions {
  httpOnly: boolean;
  sameSite: "strict" | "lax" | "none";
  secure: boolean;
  path: string;
  maxAge: number;
}

export interface AdminSessionCookie {
  name: string;
  value: string;
  options: AdminSessionCookieOptions;
}
