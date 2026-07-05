import { useState } from 'react';
import type { ChangeEvent } from 'react';
import FormField from '../../../components/FormField/FormField';
import { validateInvoice } from '../validation/invoiceValidation';
import fieldStyles from '../../../components/FormField/controls.module.css';
import styles from './InvoiceForm.module.css';
import InfoTooltip from '../../../components/InfoTooltip/InfoTooltip';
import type {
  Invoice,
  InvoiceFormValues,
  NewInvoice,
  ValidationErrors,
  Seller,
  Customer,
} from '../../../../types';

interface InvoiceFormProps {
  initialValues?: Invoice;
  sellers: Seller[];
  customers: Customer[];
  onSubmit: (values: NewInvoice) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  submitLabel?: string;
  onValidationError?: () => void;
}

const InvoiceForm = ({
  initialValues,
  sellers,
  customers,
  onSubmit,
  onCancel,
  isSubmitting,
  submitLabel = 'Save',
  onValidationError,
}: InvoiceFormProps) => {
  const [values, setValues] = useState<InvoiceFormValues>({
    sellerId: initialValues?.sellerId ?? '',
    customerId: initialValues?.customerId ?? '',
    date: initialValues?.date ?? '',
    amount: initialValues?.amount ?? '',
  });
  const [errors, setErrors] = useState<ValidationErrors<InvoiceFormValues>>({});

  const handleChange =
    (field: keyof InvoiceFormValues) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      // Clear field error on user input
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleSubmit = () => {
    const validationErrors = validateInvoice(values, sellers);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      if (onValidationError) onValidationError();
      return;
    }
    onSubmit({ ...values, amount: Number(values.amount) });
  };

  return (
    <form
      className={styles.form}
      noValidate
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <FormField
        label="Seller"
        labelExtra={<InfoTooltip text="Inactive seller cannot be selected." />}
        error={errors.sellerId}
        htmlFor="sellerId"
      >
        <select
          id="sellerId"
          autoFocus
          className={`${fieldStyles.select} ${errors.sellerId ? fieldStyles.inputError : ''}`}
          value={values.sellerId}
          onChange={handleChange('sellerId')}
        >
          <option value="">— Select a seller —</option>
          {sellers.map((s) => (
            <option key={s.id} value={s.id} disabled={!s.isActive}>
              {s.companyName} {!s.isActive ? '(inactive)' : ''}
            </option>
          ))}
        </select>
      </FormField>

      <FormField
        label="Customer"
        error={errors.customerId}
        htmlFor="customerId"
      >
        <select
          id="customerId"
          className={`${fieldStyles.select} ${errors.customerId ? fieldStyles.inputError : ''}`}
          value={values.customerId}
          onChange={handleChange('customerId')}
        >
          <option value="">— Select a customer —</option>
          {customers.map((c) => {
            const fullName = `${c.name} ${c.surname}`;
            const label =
              fullName.length > 25 ? `${fullName.slice(0, 25)}…` : fullName;
            return (
              <option key={c.id} value={c.id} title={fullName}>
                {label}
              </option>
            );
          })}
        </select>
      </FormField>

      <FormField label="Date" error={errors.date} htmlFor="date">
        <input
          id="date"
          type="date"
          max={new Date().toISOString().split('T')[0]}
          className={`${fieldStyles.input} ${errors.date ? fieldStyles.inputError : ''}`}
          value={values.date}
          onChange={handleChange('date')}
        />
      </FormField>

      <FormField label="Amount ($)" error={errors.amount} htmlFor="amount">
        <input
          id="amount"
          type="number"
          min="0"
          step="0.01"
          className={`${fieldStyles.input} ${errors.amount ? fieldStyles.inputError : ''}`}
          value={values.amount}
          onChange={handleChange('amount')}
          placeholder="e.g. 325400"
        />
      </FormField>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cancelBtn}
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Discard
        </button>
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default InvoiceForm;
