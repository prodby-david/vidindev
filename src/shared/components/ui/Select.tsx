import React, { SelectHTMLAttributes, forwardRef, useId } from "react";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string | null;
  containerClassName?: string;
  options?: SelectOption[];
  placeholder?: string;
  inputSize?: "sm" | "md";
  variant?: "surface" | "warm";
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      className = "",
      containerClassName = "",
      options,
      placeholder,
      children,
      id,
      inputSize = "sm",
      variant = "surface",
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId =
      id ||
      (label
        ? `${label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}-${generatedId}`
        : generatedId);

    const sizeClasses =
      inputSize === "md"
        ? "px-4 py-3 text-sm pr-10"
        : "px-3.5 py-2 text-sm pr-9";

    const variantClasses =
      variant === "warm"
        ? "bg-warm border-deep-ocean/15 dark:border-horizon/20"
        : "bg-polaroid dark:bg-sand/40 border-deep-ocean/15 dark:border-horizon/20";

    return (
      <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs font-bold text-ocean uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${selectId}-error` : undefined}
            className={`w-full rounded-md border text-deep-ocean focus:outline-none focus:border-horizon cursor-pointer appearance-none transition-colors ${sizeClasses} ${variantClasses} ${
              error ? "border-red-500/50 focus:border-red-500" : ""
            } ${className}`}
            {...props}
          >
            {placeholder && (
              <option value="" disabled className="text-ocean/50">
                {placeholder}
              </option>
            )}
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ocean pointer-events-none"
          />
        </div>
        {error && (
          <span
            id={`${selectId}-error`}
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

Select.displayName = "Select";

export default Select;
