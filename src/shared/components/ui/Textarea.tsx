import React, { TextareaHTMLAttributes, forwardRef, useId } from "react";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string | null;
  containerClassName?: string;
  inputSize?: "sm" | "md";
  variant?: "surface" | "warm";
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      className = "",
      containerClassName = "",
      inputSize = "sm",
      variant = "surface",
      id,
      rows = 3,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId =
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
            htmlFor={textareaId}
            className="text-xs font-bold text-ocean uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          className={`w-full rounded-md border text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon resize-none transition-colors ${sizeClasses} ${variantClasses} ${
            error ? "border-red-500/50 focus:border-red-500" : ""
          } ${className}`}
          {...props}
        />
        {error && (
          <span
            id={`${textareaId}-error`}
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

Textarea.displayName = "Textarea";

export default Textarea;
