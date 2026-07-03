export function validateSeller(values) {
  const errors = {};

  const companyName = values.companyName?.trim() ?? '';
  const hqAddress = values.hqAddress?.trim() ?? '';

  // Company name
  if (companyName === '') {
    errors.companyName = 'Company name is required.';
  } else if (companyName.length < 2) {
    errors.companyName = 'Company name must be at least 2 characters.';
  } else if (companyName.length > 100) {
    errors.companyName = 'Company name is too long (max 50 characters).';
  } else if (!/\p{L}/u.test(companyName)) {
    errors.companyName = 'Company name must contain letters.';
  }

  // HQ address
  if (hqAddress === '') {
    errors.hqAddress = 'HQ address is required.';
  } else if (hqAddress.length < 5) {
    errors.hqAddress = 'Address must be at least 5 characters.';
  } else if (hqAddress.length > 200) {
    errors.hqAddress = 'Address is too long (max 200 characters).';
  } else if (!/\p{L}/u.test(hqAddress)) {
    errors.hqAddress = 'Address must contain letters.';
  }

  return errors;
}
