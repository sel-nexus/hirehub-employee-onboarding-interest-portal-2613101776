import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AdminDashboard from './AdminDashboard.jsx';

const seeded = [
  { id: 'one', fullName: 'Avery Stone', email: 'avery@example.com', mobile: '1234567890', department: 'Engineering', submittedAt: '2026-03-04T10:00:00.000Z' },
  { id: 'two', fullName: 'Morgan Reed', email: 'morgan@example.com', mobile: '0987654321', department: 'Design', submittedAt: '2026-03-05T10:00:00.000Z' },
];

function seedSubmissions(records = seeded) { localStorage.setItem('hirehub_submissions', JSON.stringify(records)); }

describe('AdminDashboard', () => {
  beforeEach(() => { seedSubmissions(); vi.spyOn(window, 'confirm').mockReturnValue(true); });

  it('renders derived total, department, latest-date statistics and table data', () => {
    render(<AdminDashboard onLogout={vi.fn()} />);
    expect(screen.getByText('Total Submissions')).toBeVisible();
    expect(screen.getByText('Total Submissions').closest('article')).toHaveTextContent('2');
    expect(screen.getByText('Departments')).toBeVisible();
    expect(screen.getByText('Departments').closest('article')).toHaveTextContent('2');
    expect(screen.getByText('Latest Submission').closest('article')).toHaveTextContent('Mar 5, 2026');
    expect(screen.getByRole('cell', { name: 'avery@example.com' })).toBeVisible();
  });

  it('shows an empty-state when no local records exist', () => {
    localStorage.clear();
    render(<AdminDashboard onLogout={vi.fn()} />);
    expect(screen.getByText('No submissions yet.')).toBeVisible();
    expect(screen.getByText('N/A')).toBeVisible();
  });

  it('edits permitted values while retaining the email unique key', async () => {
    const user = userEvent.setup();
    render(<AdminDashboard onLogout={vi.fn()} />);
    await user.click(screen.getAllByRole('button', { name: 'Edit' })[0]);
    expect(screen.getByRole('dialog', { name: 'Edit Submission' })).toBeVisible();
    expect(screen.getByLabelText('Email')).toBeDisabled();
    await user.clear(screen.getByLabelText('Full Name'));
    await user.type(screen.getByLabelText('Full Name'), 'Avery Rivers');
    await user.selectOptions(screen.getByLabelText('Department'), 'Data Science');
    await user.click(screen.getByRole('button', { name: 'Save Changes' }));
    expect(screen.getByText('Avery Rivers')).toBeVisible();
    expect(JSON.parse(localStorage.getItem('hirehub_submissions'))[0]).toMatchObject({ email: 'avery@example.com', fullName: 'Avery Rivers', department: 'Data Science' });
  });

  it('requires confirmation then removes only the selected submission', async () => {
    const user = userEvent.setup();
    render(<AdminDashboard onLogout={vi.fn()} />);
    await user.click(screen.getAllByRole('button', { name: 'Delete' })[1]);
    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this submission?');
    expect(screen.queryByText('Morgan Reed')).not.toBeInTheDocument();
    expect(screen.getByText('Avery Stone')).toBeVisible();
  });

  it('clears the session and notifies the parent when logging out', async () => {
    const user = userEvent.setup();
    const onLogout = vi.fn();
    sessionStorage.setItem('hirehub_admin_auth', 'true');
    render(<AdminDashboard onLogout={onLogout} />);
    await user.click(screen.getByRole('button', { name: 'Logout' }));
    expect(sessionStorage.getItem('hirehub_admin_auth')).toBeNull();
    expect(onLogout).toHaveBeenCalledOnce();
  });
});
