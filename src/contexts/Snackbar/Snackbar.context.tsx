"use client";

import {
  createContext,
  useCallback,
  useState,
  type JSX,
  type ReactNode,
} from "react";
import type { SnackbarItem } from "@/src/interfaces/snackbar.interface";
import SnackbarViewport from "@/src/components/molecules/SnackbarViewport";
import { SnackbarVariant } from "@/src/interfaces/variant.enum";
import { MagicNumber } from "@/src/interfaces/magicNumber.enum";

export type SnackbarContextValue = {
  showSnackbar: (message: string, variant: SnackbarVariant) => void;
};

export const SnackbarContext = createContext<SnackbarContextValue>({
  showSnackbar: () => {},
});

type SnackbarProviderProps = { children: ReactNode };

export function SnackbarProvider({
  children,
}: Readonly<SnackbarProviderProps>): JSX.Element {
  const [items, setItems] = useState<SnackbarItem[]>([]);

  const dismiss = useCallback((id: string): void => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const showSnackbar = useCallback(
    (message: string, variant: SnackbarVariant) => {
      const id = crypto.randomUUID();
      setItems((current) => [...current, { id, message, variant }]);
      setTimeout(() => dismiss(id), MagicNumber.THREE_THOUSAND_SIX_HUNDRED);
    },
    [dismiss],
  );

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <SnackbarViewport items={items} onDismiss={dismiss} />
    </SnackbarContext.Provider>
  );
}
