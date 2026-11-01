"use client";

import { ArrowRight, LockKeyhole } from "lucide-react";
import { Input } from "@/shared/components/ui";
import { useAdminLogin } from "../hooks/useAdminLogin";

export function AdminLoginForm() {
  const { password, setPassword, error, isSubmitting, handleSubmit } =
    useAdminLogin();

  return (
    <div className="w-full max-w-sm">
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-horizon/10 text-horizon">
          <LockKeyhole size={22} />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ocean">
          Content Studio
        </p>
        <h1 className="mt-1 font-display text-2xl font-bold text-deep-ocean">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-ocean">
          Enter the admin password to manage portfolio content.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-md border border-deep-ocean/10 bg-polaroid p-6 shadow-sm dark:border-horizon/15 dark:bg-sand/40"
      >
        <Input
          id="admin-password"
          label="Password"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={error}
          inputSize="md"
          variant="warm"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-deep-ocean px-4 py-3 text-sm font-semibold text-polaroid transition-colors hover:bg-horizon disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>{isSubmitting ? "Signing in..." : "Sign in"}</span>
          {!isSubmitting && <ArrowRight size={15} />}
        </button>
      </form>

      <p className="mt-4 text-center text-[11px] text-ocean/80">
        Set <code className="font-mono">ADMIN_PASSWORD</code> or{" "}
        <code className="font-mono">ADMIN_PASSWORD_HASH</code> in your
        environment to enable access.
      </p>
    </div>
  );
}

export default AdminLoginForm;
