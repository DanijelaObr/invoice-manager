import { useState } from 'react';
import FormField from '../../../components/FormField/FormField';
import { validateSeller } from '../validation/sellerValidation';
import fieldStyles from '../../../components/FormField/controls.module.css';
import styles from './SellerForm.module.css';

function SellerForm({
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting,
  submitLabel = 'Save',
  onValidationError,
}) {
  const [values, setValues] = useState({
    companyName: initialValues?.companyName ?? '',
    hqAddress: initialValues?.hqAddress ?? '',
    isActive: initialValues?.isActive ?? true,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCheckbox = (e) => {
    setValues((prev) => ({ ...prev, isActive: e.target.checked }));
  };

  const handleSubmit = () => {
    const validationErrors = validateSeller(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      if (onValidationError) onValidationError();
      return;
    }
    onSubmit(values);
  };

  return (
    <div className={styles.form}>
      <FormField
        label="Company name"
        error={errors.companyName}
        htmlFor="companyName"
      >
        <input
          id="companyName"
          type="text"
          maxLength={100}
          className={`${fieldStyles.input} ${errors.companyName ? fieldStyles.inputError : ''}`}
          value={values.companyName}
          onChange={handleChange('companyName')}
        />
      </FormField>

      <FormField
        label="HQ address"
        error={errors.hqAddress}
        htmlFor="hqAddress"
      >
        <input
          id="hqAddress"
          type="text"
          maxLength={200}
          className={`${fieldStyles.input} ${errors.hqAddress ? fieldStyles.inputError : ''}`}
          value={values.hqAddress}
          onChange={handleChange('hqAddress')}
        />
      </FormField>

      <div className={styles.checkboxField}>
        <input
          id="isActive"
          type="checkbox"
          checked={values.isActive}
          onChange={handleCheckbox}
        />
        <label htmlFor="isActive">Aktivan prodavac</label>
      </div>

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

export default SellerForm;
