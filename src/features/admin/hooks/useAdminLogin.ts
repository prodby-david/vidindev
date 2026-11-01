"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function useAdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const payload = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        setError(payload?.message ?? "Unable to sign in.");
        return;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch {
      setError("Unable to reach the server. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    password,
    setPassword,
    error,
    isSubmitting,
    handleSubmit,
  };
}
