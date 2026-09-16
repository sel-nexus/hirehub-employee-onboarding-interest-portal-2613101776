import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import EditModal from './EditModal.jsx';
import SubmissionTable, { formatSubmissionDate } from './SubmissionTable.jsx';
import { deleteSubmission, getSubmissions, updateSubmission } from '../utils/storage.js';

/** Render dashboard statistics and management actions for stored records.
 *
 * Args:
 *   onLogout: Callback invoked after session removal.
 * Returns:
 *   The authenticated admin dashboard.
 */
export default function AdminDashboard({ onLogout }) {
  const [submissions, setSubmissions] = useState(() => getSubmissions());
  const [editing, setEditing] = useState(null);
  const latestDate = useMemo(() => submissions.reduce((latest, item) => !latest || new Date(item.submittedAt) > new Date(latest) ? item.submittedAt : latest, null), [submissions]);

  /** Clear the demo session and signal the route to show login. */
  function handleLogout() { sessionStorage.removeItem('hirehub_admin_auth'); onLogout(); }
  /** Confirm then remove one submission and refresh local state.
   *
   * Args:
   *   id: Identifier to remove.
   */
  function handleDelete(id) { if (window.confirm('Are you sure you want to delete this submission?')) setSubmissions(deleteSubmission(id)); }
  /** Persist a validated edit then replace local dashboard state.
   *
   * Args:
   *   values: Valid editable form values.
   */
  function handleSave(values) { updateSubmission(editing.id, values); setSubmissions(getSubmissions()); setEditing(null); }

  return (
    <section className="admin-page"><div className="admin-shell"><div className="dashboard-head"><h1>Submissions Dashboard</h1><button className="danger-button" onClick={handleLogout} type="button">Logout</button></div><div className="stats-grid"><article className="stat-card"><p>Total Submissions</p><strong>{submissions.length}</strong></article><article className="stat-card success"><p>Departments</p><strong>{new Set(submissions.map((item) => item.department)).size}</strong></article><article className="stat-card warning"><p>Latest Submission</p><strong>{formatSubmissionDate(latestDate)}</strong></article></div><SubmissionTable onDelete={handleDelete} onEdit={setEditing} submissions={submissions} />{editing && <EditModal onCancel={() => setEditing(null)} onSave={handleSave} submission={editing} />}</div></section>
  );
}

AdminDashboard.propTypes = { onLogout: PropTypes.func.isRequired };
