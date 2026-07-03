export interface Seller {
  id: string;
  companyName: string;
  hqAddress: string;
  isActive: boolean;
}

export interface Customer {
  id: string;
  name: string;
  surname: string;
  address: string;
  age: number;
}

export interface Invoice {
  id: string;
  sellerId: string;
  customerId: string;
  date: string;
  amount: number;
}

// Form values — fields can be strings while the user is typing
export interface InvoiceFormValues {
  sellerId: string;
  customerId: string;
  date: string;
  amount: number | string;
}

export interface SellerFormValues {
  companyName: string;
  hqAddress: string;
  isActive: boolean;
}

export interface CustomerFormValues {
  name: string;
  surname: string;
  address: string;
  age: number | string;
}

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

// Validation errors — each field optionally has an error message
export type ValidationErrors<T> = Partial<Record<keyof T, string>>;

// Data for creating (no id yet — assigned by the backend)
export type NewSeller = Omit<Seller, 'id'>;
export type NewCustomer = Omit<Customer, 'id'>;
export type NewInvoice = Omit<Invoice, 'id'>;
