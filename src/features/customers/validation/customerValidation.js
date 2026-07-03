export function validateCustomer(values) {
  const errors = {};

  const name = values.name?.trim() ?? '';
  const surname = values.surname?.trim() ?? '';
  const address = values.address?.trim() ?? '';

  // First name
  if (name === '') {
    errors.name = 'First name is required.';
  } else if (name.length < 2) {
    errors.name = 'First name must be at least 2 characters.';
  } else if (name.length > 50) {
    errors.name = 'First name is too long (max 50 characters).';
  } else if (!/\p{L}/u.test(name)) {
    errors.name = 'First name must contain letters.';
  }

  // Last name
  if (surname === '') {
    errors.surname = 'Last name is required.';
  } else if (surname.length < 2) {
    errors.surname = 'Last name must be at least 2 characters.';
  } else if (surname.length > 50) {
    errors.surname = 'Last name is too long (max 50 characters).';
  } else if (!/\p{L}/u.test(surname)) {
    errors.surname = 'Last name must contain letters.';
  }

  // Address
  if (address === '') {
    errors.address = 'Address is required.';
  } else if (address.length < 5) {
    errors.address = 'Address must be at least 5 characters.';
  } else if (address.length > 200) {
    errors.address = 'Address is too long (max 200 characters).';
  } else if (!/\p{L}/u.test(address)) {
    errors.address = 'Address must contain letters.';
  }

  // Age
  if (values.age === '' || values.age === null || values.age === undefined) {
    errors.age = 'Age is required.';
  } else {
    const age = Number(values.age);
    if (Number.isNaN(age) || !Number.isInteger(age)) {
      errors.age = 'Age must be a whole number.';
    } else if (age < 18) {
      errors.age = 'Customer must be an adult (18+).';
    } else if (age > 120) {
      errors.age = 'Age is not realistic.';
    }
  }

  return errors;
}
