import { useEffect, useState, type JSX } from "react";
import { SnackbarVariant } from "@/src/interfaces/variant.enum";
import XIcon from "@/src/components/atoms/XIcon";
import XCircleIcon from "@/src/components/atoms/XCircleIcon";
import CheckCircleIcon from "@/src/components/atoms/CheckCircleIcon";

type SnackbarProps = {
  message: string;
  variant: SnackbarVariant;
  onDismiss: () => void;
};

const VARIANT_STYLES: Record<SnackbarVariant, string> = {
  success: "bg-gray-900 text-white",
  error: "bg-red-600 text-white",
};

export default function Snackbar({
  message,
  variant,
  onDismiss,
}: Readonly<SnackbarProps>): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);
  const role = variant === "error" ? "alert" : "status";

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      role={role}
      className={`pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-lg px-4 py-3 shadow-lg transition-all duration-300 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      } ${VARIANT_STYLES[variant]}`}
    >
      {variant === SnackbarVariant.SUCCESS ? (
        <CheckCircleIcon />
      ) : (
        <XCircleIcon />
      )}
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Fechar notificação"
        className="shrink-0 rounded p-0.5 hover:bg-white/10"
      >
        <XIcon />
      </button>
    </div>
  );
}
