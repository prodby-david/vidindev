import React, { InputHTMLAttributes, forwardRef, useId } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
  containerClassName?: string;
  inputSize?: "sm" | "md";
  variant?: "surface" | "warm";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      className = "",
      containerClassName = "",
      inputSize = "sm",
      variant = "surface",
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId =
      id ||
      (label
        ? `${label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}-${generatedId}`
        : generatedId);

    const sizeClasses =
      inputSize === "md" ? "px-4 py-3 text-sm" : "px-3.5 py-2 text-sm";

    const variantClasses =
      variant === "warm"
        ? "bg-warm border-deep-ocean/15 dark:border-horizon/20"
        : "bg-polaroid dark:bg-sand/40 border-deep-ocean/15 dark:border-horizon/20";

    return (
      <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-bold text-ocean uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`w-full rounded-md border text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon transition-colors ${sizeClasses} ${variantClasses} ${
            error ? "border-red-500/50 focus:border-red-500" : ""
          } ${className}`}
          {...props}
        />
        {error && (
          <span
            id={`${inputId}-error`}
            role="alert"
            className="text-[11px] text-red-500 font-medium"
          >
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
