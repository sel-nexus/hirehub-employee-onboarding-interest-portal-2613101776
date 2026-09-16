/** Define the allowed department selections for every HireHub form. */
export const DEPARTMENTS = [
  'Engineering',
  'Design',
  'Marketing',
  'Human Resources',
  'Finance',
  'Operations',
  'Sales',
  'Data Science',
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_PATTERN = /^[A-Za-z ]+$/;

/** Validate a candidate name against the HireHub data contract.
 *
 * Args:
 *   fullName: Candidate-entered name.
 * Returns:
 *   An empty string when valid, otherwise a user-facing error message.
 */
export function validateFullName(fullName) {
  const value = fullName.trim();
  if (!value) return 'Full name is required.';
  if (value.length > 100) return 'Full name must be 100 characters or fewer.';
  if (!NAME_PATTERN.test(value)) return 'Full name can contain alphabets and spaces only.';
  return '';
}

/** Validate a candidate email address.
 *
 * Args:
 *   email: Candidate-entered email address.
 * Returns:
 *   An empty string when valid, otherwise a user-facing error message.
 */
export function validateEmail(email) {
  if (!email.trim()) return 'Email address is required.';
  if (!EMAIL_PATTERN.test(email.trim())) return 'Please enter a valid email address.';
  return '';
}

/** Validate a candidate mobile number.
 *
 * Args:
 *   mobile: Candidate-entered phone number.
 * Returns:
 *   An empty string when valid, otherwise a user-facing error message.
 */
export function validateMobile(mobile) {
  if (!mobile) return 'Mobile number is required.';
  if (!/^\d{10}$/.test(mobile)) return 'Mobile number must contain exactly 10 digits.';
  return '';
}

/** Validate a selected department.
 *
 * Args:
 *   department: Candidate-selected department.
 * Returns:
 *   An empty string when valid, otherwise a user-facing error message.
 */
export function validateDepartment(department) {
  if (!department) return 'Please select a department.';
  if (!DEPARTMENTS.includes(department)) return 'Please select a valid department.';
  return '';
}

/** Validate all fields submitted from an interest form.
 *
 * Args:
 *   values: Form fields to validate.
 * Returns:
 *   A map containing only invalid field messages.
 */
export function validateSubmission(values) {
  const checks = {
    fullName: validateFullName(values.fullName),
    email: validateEmail(values.email),
    mobile: validateMobile(values.mobile),
    department: validateDepartment(values.department),
  };

  return Object.fromEntries(Object.entries(checks).filter(([, message]) => message));
}
