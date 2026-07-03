import type {
  InvoiceFormValues,
  ValidationErrors,
  Seller,
} from '../../../../types';

export const validateInvoice = (
  values: InvoiceFormValues,
  sellers: Seller[],
): ValidationErrors<InvoiceFormValues> => {
  const errors: ValidationErrors<InvoiceFormValues> = {};

  if (!values.sellerId) {
    errors.sellerId = 'Seller is required.';
  }
  if (!values.customerId) {
    errors.customerId = 'Customer is required.';
  }
  if (!values.date) {
    errors.date = 'Date is required';
  }
  if (
    values.amount === '' ||
    values.amount === null ||
    values.amount === undefined
  ) {
    errors.amount = 'Amount is required.';
  }

  if (
    values.amount !== '' &&
    values.amount !== null &&
    values.amount !== undefined
  ) {
    const num = Number(values.amount);
    if (Number.isNaN(num) || !Number.isFinite(num)) {
      errors.amount = 'Amount must be a valid number.';
    } else if (num <= 0) {
      errors.amount = 'Amount must be greater than 0.';
    } else if (num > 1_000_000_000) {
      errors.amount = 'Amount is unrealistically large.';
    }
  }

  if (values.date) {
    const selectedDate = new Date(values.date);
    if (Number.isNaN(selectedDate.getTime())) {
      errors.date = 'Date is not valid.';
    } else if (selectedDate.getFullYear() < 2000) {
      errors.date = 'The date is unrealistically old.';
    } else {
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      if (selectedDate > today) {
        errors.date = "The date can't be in the future!";
      }
    }
  }

  if (values.sellerId) {
    const seller = sellers.find(
      (s) => String(s.id) === String(values.sellerId),
    );
    if (seller && !seller.isActive) {
      errors.sellerId = 'Cannot create an invoice with an inactive seller.';
    }
  }

  return errors;
};
