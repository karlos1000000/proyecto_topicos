export type Currency = 'USD' | 'HNL';
export type Frequency = 'monthly' | 'annual';

export interface Subscription {
  id: string;
  name: string;
  price: number;
  currency: Currency;
  frequency: Frequency;
  paymentDate: string; // Formato: YYYY-MM-DD
}

