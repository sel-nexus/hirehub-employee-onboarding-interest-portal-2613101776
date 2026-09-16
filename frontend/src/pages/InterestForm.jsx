import { useEffect, useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { createSubmission } from '../utils/storage.js';
import { DEPARTMENTS, validateSubmission } from '../utils/validation.js';

const EMPTY_FORM = { fullName: '', email: '', mobile: '', department: '' };

/** Render the browser-local candidate interest form.
 *
 * Returns:
 *   The form page with inline validation and submission feedback.
 */
export default function InterestForm() {
  const formId = useId();
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [successVisible, setSuccessVisible] = useState(false);

  useEffect(() => {
    if (!successVisible) return undefined;
    const timeout = window.setTimeout(() => setSuccessVisible(false), 4000);
    return () => window.clearTimeout(timeout);
  }, [successVisible]);

  /** Update one form field and remove its prior error.
   *
   * Args:
   *   event: Input change event.
   */
  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  }

  /** Validate and persist a candidate interest submission.
   *
   * Args:
   *   event: Form submission event.
   */
  function handleSubmit(event) {
    event.preventDefault();
    setSuccessVisible(false);
    const nextErrors = validateSubmission(values);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    try {
      createSubmission(values);
      setValues(EMPTY_FORM);
      setErrors({});
      setSuccessVisible(true);
    } catch (error) {
      setErrors({ email: error.message });
    }
  }

  /** Render a field-specific message with its accessible relationship.
   *
   * Args:
   *   name: Field key associated with the message.
   * Returns:
   *   A message element when a field has an error.
   */
  function renderError(name) {
    return errors[name] ? <p className="field-error" id={`${formId}-${name}-error`} role="alert">{errors[name]}</p> : null;
  }

  return (
    <section className="form-page">
      <div className="form-card">
        <Link className="back-link" to="/">← Back to Home</Link>
        <div className="form-heading">
          <p className="section-label">Interest application</p>
          <h1>Join Our Team</h1>
          <p>Express your interest in working with us.</p>
        </div>
        {successVisible && (
          <div aria-live="polite" className="success-banner" role="status">
            Thank you! Your interest has been submitted successfully.
          </div>
        )}
        <form noValidate onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor={`${formId}-fullName`}>Full Name</label>
            <input aria-describedby={errors.fullName ? `${formId}-fullName-error` : undefined} aria-invalid={Boolean(errors.fullName)} aria-required="true" id={`${formId}-fullName`} maxLength="100" name="fullName" onChange={handleChange} type="text" value={values.fullName} />
            {renderError('fullName')}
          </div>
          <div className="field-group">
            <label htmlFor={`${formId}-email`}>Email Address</label>
            <input aria-describedby={errors.email ? `${formId}-email-error` : undefined} aria-invalid={Boolean(errors.email)} aria-required="true" id={`${formId}-email`} name="email" onChange={handleChange} type="email" value={values.email} />
            {renderError('email')}
          </div>
          <div className="field-group">
            <label htmlFor={`${formId}-mobile`}>Mobile Number</label>
            <input aria-describedby={errors.mobile ? `${formId}-mobile-error` : undefined} aria-invalid={Boolean(errors.mobile)} aria-required="true" id={`${formId}-mobile`} inputMode="numeric" maxLength="10" name="mobile" onChange={handleChange} type="tel" value={values.mobile} />
            {renderError('mobile')}
          </div>
          <div className="field-group">
            <label htmlFor={`${formId}-department`}>Department of Interest</label>
            <select aria-describedby={errors.department ? `${formId}-department-error` : undefined} aria-invalid={Boolean(errors.department)} aria-required="true" id={`${formId}-department`} name="department" onChange={handleChange} value={values.department}>
              <option value="">Select a department</option>
              {DEPARTMENTS.map((department) => <option key={department} value={department}>{department}</option>)}
            </select>
            {renderError('department')}
          </div>
          <button className="button button-submit" type="submit">Submit Application</button>
        </form>
      </div>
    </section>
  );
}
