import type { ReactNode } from "react";

type FieldProps = {
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
};

export default function Field({ label, error, children, className = "" }: FieldProps) {
  return (
    <label className={`block ${className}`.trim()}>
      <span className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-stone">
        {label}
      </span>
      {children}
      {error && <span className="mt-2 block text-xs text-red-800">{error}</span>}
    </label>
  );
}
