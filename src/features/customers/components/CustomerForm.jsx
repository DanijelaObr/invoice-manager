import { useState } from 'react';
import FormField from '../../../components/FormField/FormField';
import { validateCustomer } from '../validation/customerValidation';
import fieldStyles from '../../../components/FormField/controls.module.css';
import styles from './CustomerForm.module.css';

function CustomerForm({
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting,
  submitLabel = 'Save',
  onValidationError,
}) {
  const [values, setValues] = useState({
    name: initialValues?.name ?? '',
    surname: initialValues?.surname ?? '',
    address: initialValues?.address ?? '',
    age: initialValues?.age ?? '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = () => {
    const validationErrors = validateCustomer(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      if (onValidationError) onValidationError();
      return;
    }
    onSubmit({ ...values, age: Number(values.age) });
  };

  return (
    <div className={styles.form}>
      <FormField label="First name" error={errors.name} htmlFor="name">
        <input
          id="name"
          type="text"
          maxLength={50}
          className={`${fieldStyles.input} ${errors.name ? fieldStyles.inputError : ''}`}
          value={values.name}
          onChange={handleChange('name')}
        />
      </FormField>

      <FormField label="Last name" error={errors.surname} htmlFor="surname">
        <input
          id="surname"
          type="text"
          maxLength={50}
          className={`${fieldStyles.input} ${errors.surname ? fieldStyles.inputError : ''}`}
          value={values.surname}
          onChange={handleChange('surname')}
        />
      </FormField>

      <FormField label="Address" error={errors.address} htmlFor="address">
        <input
          id="address"
          type="text"
          maxLength={200}
          className={`${fieldStyles.input} ${errors.address ? fieldStyles.inputError : ''}`}
          value={values.address}
          onChange={handleChange('address')}
        />
      </FormField>

      <FormField label="Age" error={errors.age} htmlFor="age">
        <input
          id="age"
          type="number"
          min="18"
          max="120"
          className={`${fieldStyles.input} ${errors.age ? fieldStyles.inputError : ''}`}
          value={values.age}
          onChange={handleChange('age')}
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

export default CustomerForm;
