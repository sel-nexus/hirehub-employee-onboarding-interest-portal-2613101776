import { useEffect, useId, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { DEPARTMENTS, validateSubmission } from '../utils/validation.js';

/** Render an accessible editor for the permitted submission fields.
 *
 * Args:
 *   submission: Record being edited.
 *   onSave: Callback for valid editable fields.
 *   onCancel: Callback closing the dialog.
 * Returns:
 *   A modal edit form.
 */
export default function EditModal({ submission, onSave, onCancel }) {
  const titleId = useId();
  const triggerRef = useRef(document.activeElement);
  const [values, setValues] = useState({ fullName: submission.fullName, email: submission.email, mobile: submission.mobile, department: submission.department });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onCancel();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
      triggerRef.current?.focus();
    };
  }, [onCancel]);

  /** Update a modal field and reset its inline error.
   *
   * Args:
   *   event: Input change event.
   */
  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  }

  /** Validate and return the permitted changes.
   *
   * Args:
   *   event: Form submit event.
   */
  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateSubmission(values);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    onSave(values);
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <form
        aria-labelledby={titleId}
        aria-modal="true"
        className="modal-card"
        noValidate
        onSubmit={handleSubmit}
        role="dialog"
      >
        <h2 id={titleId}>Edit Submission</h2>
        <div className="field-group">
          <label htmlFor="edit-fullName">Full Name</label>
          <input
            aria-invalid={Boolean(errors.fullName)}
            id="edit-fullName"
            maxLength="100"
            name="fullName"
            onChange={handleChange}
            value={values.fullName}
          />
          {errors.fullName && <p className="field-error" role="alert">{errors.fullName}</p>}
        </div>
        <div className="field-group">
          <label htmlFor="edit-email">Email</label>
          <input className="readonly-input" disabled id="edit-email" type="email" value={values.email} />
        </div>
        <div className="field-group">
          <label htmlFor="edit-mobile">Mobile</label>
          <input
            aria-invalid={Boolean(errors.mobile)}
            id="edit-mobile"
            inputMode="numeric"
            maxLength="10"
            name="mobile"
            onChange={handleChange}
            value={values.mobile}
          />
          {errors.mobile && <p className="field-error" role="alert">{errors.mobile}</p>}
        </div>
        <div className="field-group">
          <label htmlFor="edit-department">Department</label>
          <select
            aria-invalid={Boolean(errors.department)}
            id="edit-department"
            name="department"
            onChange={handleChange}
            value={values.department}
          >
            {DEPARTMENTS.map((department) => <option key={department} value={department}>{department}</option>)}
          </select>
          {errors.department && <p className="field-error" role="alert">{errors.department}</p>}
        </div>
        <div className="modal-actions">
          <button className="outline-button" onClick={onCancel} type="button">Cancel</button>
          <button className="primary-button" type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
}

EditModal.propTypes = {
  submission: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
