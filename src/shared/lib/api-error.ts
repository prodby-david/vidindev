import { isAxiosError } from "axios";

export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  if (isAxiosError(error)) {
    const data = error.response?.data as
      | { message?: string; errors?: string }
      | undefined;

    return data?.errors || data?.message || fallback;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}
