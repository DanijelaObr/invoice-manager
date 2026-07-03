import { useState } from 'react';
import FormField from '../../../components/FormField/FormField';
import { validateInvoice } from '../validation/invoiceValidation';
import fieldStyles from '../../../components/FormField/controls.module.css';
import styles from './InvoiceForm.module.css';

function InvoiceForm({
  initialValues,
  sellers,
  customers,
  onSubmit,
  onCancel,
  isSubmitting,
  submitLabel = 'Save',
  onValidationError,
}) {
  const [values, setValues] = useState({
    sellerId: initialValues?.sellerId ?? '',
    customerId: initialValues?.customerId ?? '',
    date: initialValues?.date ?? '',
    amount: initialValues?.amount ?? '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
    // Očisti grešku za to polje čim korisnik krene da kuca
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
    <div className={styles.form}>
      <FormField label="Seller" error={errors.sellerId} htmlFor="sellerId">
        <select
          id="sellerId"
          className={`${fieldStyles.select} ${errors.sellerId ? fieldStyles.inputError : ''}`}
          value={values.sellerId}
          onChange={handleChange('sellerId')}
        >
          <option value="">— Select a seller —</option>
          {sellers.map((s) => (
            <option key={s.id} value={s.id}>
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
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} {c.surname}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="Date" error={errors.date} htmlFor="date">
        <input
          id="date"
          type="date"
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
          type="button"
          className={styles.submitBtn}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </div>
  );
}

export default InvoiceForm;
