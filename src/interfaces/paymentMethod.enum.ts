export enum PaymentMethodType {
  CREDIT_CARD = "CREDIT_CARD",
  PIX = "PIX",
  BILLET = "BILLET",
}

export enum PaymentMethodDetailIcon {
  CALENDAR = "calendar",
  QR_CODE = "qrCode",
  CLOCK = "clock",
}

export interface PaymentMethodDetail {
  id: string;
  icon: PaymentMethodDetailIcon;
  text: string;
}

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  title: string;
  description: string;
  badge?: string;
  details?: PaymentMethodDetail[];
  dueDate: string;
  note: string;
}
