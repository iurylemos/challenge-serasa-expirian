// src/components/molecules/SnackbarViewport.tsx

import type { JSX } from "react";
import type { SnackbarItem } from "@/src/interfaces/snackbar.interface";
import Snackbar from "@/src/components/atoms/Snackbar";

type SnackbarViewportProps = {
  items: SnackbarItem[];
  onDismiss: (id: string) => void;
};

export default function SnackbarViewport({
  items,
  onDismiss,
}: Readonly<SnackbarViewportProps>): JSX.Element {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4">
      {items.map((item) => (
        <Snackbar
          key={item.id}
          message={item.message}
          variant={item.variant}
          onDismiss={() => onDismiss(item.id)}
        />
      ))}
    </div>
  );
}
