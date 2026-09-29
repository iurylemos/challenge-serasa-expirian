import { SnackbarVariant } from "@/src/interfaces/variant.enum";

export interface SnackbarItem {
  id: string;
  message: string;
  variant: SnackbarVariant;
}
