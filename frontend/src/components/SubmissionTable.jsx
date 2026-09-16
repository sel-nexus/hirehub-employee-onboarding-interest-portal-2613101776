import PropTypes from 'prop-types';

/** Format an ISO timestamp for the dashboard table and statistics.
 *
 * Args:
 *   isoDate: Timestamp to format.
 * Returns:
 *   A human-readable date, or N/A when the input is absent.
 */
export function formatSubmissionDate(isoDate) {
  if (!isoDate) return 'N/A';
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(isoDate));
}

/** Render submission data with empty state and row actions.
 *
 * Args:
 *   submissions: Records to display.
 *   onEdit: Callback receiving an editable record.
 *   onDelete: Callback receiving an id to remove.
 * Returns:
 *   The responsive submissions table.
 */
export default function SubmissionTable({ submissions, onEdit, onDelete }) {
  if (!submissions.length) {
    return <div className="table-card"><p className="empty-state">No submissions yet.</p></div>;
  }

  return (
    <div className="table-card">
      <div className="table-scroll">
        <table>
          <thead><tr><th scope="col">#</th><th scope="col">Full Name</th><th scope="col">Email</th><th scope="col">Mobile</th><th scope="col">Department</th><th scope="col">Submitted On</th><th scope="col">Actions</th></tr></thead>
          <tbody>
            {submissions.map((submission, index) => (
              <tr key={submission.id}>
                <td>{index + 1}</td><td>{submission.fullName}</td><td>{submission.email}</td><td>{submission.mobile}</td><td><span className="department-badge">{submission.department}</span></td><td>{formatSubmissionDate(submission.submittedAt)}</td>
                <td><div className="table-actions"><button className="small-button" onClick={() => onEdit(submission)} type="button">Edit</button><button className="small-button delete" onClick={() => onDelete(submission.id)} type="button">Delete</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

SubmissionTable.propTypes = { submissions: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired, fullName: PropTypes.string.isRequired, email: PropTypes.string.isRequired, mobile: PropTypes.string.isRequired, department: PropTypes.string.isRequired, submittedAt: PropTypes.string.isRequired })).isRequired, onEdit: PropTypes.func.isRequired, onDelete: PropTypes.func.isRequired };
