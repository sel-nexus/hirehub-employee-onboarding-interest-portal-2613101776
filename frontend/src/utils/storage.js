import { validateSubmission } from './validation';

export const SUBMISSIONS_KEY = 'hirehub_submissions';

/** Read candidate submissions and recover safely from damaged browser data.
 *
 * Returns:
 *   A submission array, or an empty array when data is unavailable or invalid.
 */
export function getSubmissions() {
  try {
    const rawValue = localStorage.getItem(SUBMISSIONS_KEY);
    if (!rawValue) return [];
    const parsed = JSON.parse(rawValue);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    localStorage.removeItem(SUBMISSIONS_KEY);
    return [];
  }
}

/** Persist a complete submission array.
 *
 * Args:
 *   submissions: Records to write to browser storage.
 */
export function saveSubmissions(submissions) {
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
}

/** Create one validated submission unless its email already exists.
 *
 * Args:
 *   values: Candidate fields from the interest form.
 * Returns:
 *   The newly stored submission.
 * Raises:
 *   Error: When a field is invalid or the email is already stored.
 */
export function createSubmission(values) {
  const errors = validateSubmission(values);
  if (Object.keys(errors).length) throw new Error('Submission fields are invalid.');

  const submissions = getSubmissions();
  const normalizedEmail = values.email.trim().toLowerCase();
  if (submissions.some((item) => item.email.toLowerCase() === normalizedEmail)) {
    throw new Error('This email has already been submitted.');
  }

  const submission = {
    id: crypto.randomUUID(),
    fullName: values.fullName.trim(),
    email: normalizedEmail,
    mobile: values.mobile,
    department: values.department,
    submittedAt: new Date().toISOString(),
  };
  saveSubmissions([...submissions, submission]);
  return submission;
}

/** Update the editable fields on a stored submission.
 *
 * Args:
 *   id: Identifier of the record to update.
 *   values: Replacement fields, including the immutable email value.
 * Returns:
 *   The updated submission.
 * Raises:
 *   Error: When the record does not exist or fields are invalid.
 */
export function updateSubmission(id, values) {
  const errors = validateSubmission(values);
  if (Object.keys(errors).length) throw new Error('Submission fields are invalid.');

  let updatedSubmission;
  const nextSubmissions = getSubmissions().map((item) => {
    if (item.id !== id) return item;
    updatedSubmission = { ...item, fullName: values.fullName.trim(), mobile: values.mobile, department: values.department };
    return updatedSubmission;
  });
  if (!updatedSubmission) throw new Error('Submission not found.');
  saveSubmissions(nextSubmissions);
  return updatedSubmission;
}

/** Delete one submission by identifier.
 *
 * Args:
 *   id: Identifier of the record to remove.
 * Returns:
 *   The remaining submission array.
 */
export function deleteSubmission(id) {
  const nextSubmissions = getSubmissions().filter((item) => item.id !== id);
  saveSubmissions(nextSubmissions);
  return nextSubmissions;
}
