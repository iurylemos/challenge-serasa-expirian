export interface Offer {
  id: string;
  companyInitials: string;
  companyName: string;
  subtitle: string;
  originalPrice: number;
  finalPrice: number;
  discountPercentage: number;
  paymentDescription: string;
  isBestOffer: boolean;
}
