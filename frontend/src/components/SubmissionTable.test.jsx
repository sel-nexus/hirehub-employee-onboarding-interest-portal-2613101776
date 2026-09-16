import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import SubmissionTable from './SubmissionTable.jsx';

const submission = {
  id: 'candidate-1',
  fullName: 'Avery Stone',
  email: 'avery@example.com',
  mobile: '1234567890',
  department: 'Engineering',
  submittedAt: '2026-03-04T10:00:00.000Z',
};

describe('SubmissionTable', () => {
  it('renders the required empty dashboard state without a table', () => {
    render(<SubmissionTable submissions={[]} onEdit={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText('No submissions yet.')).toBeVisible();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('renders submission details and sends the selected record to edit and delete actions', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    render(<SubmissionTable submissions={[submission]} onEdit={onEdit} onDelete={onDelete} />);

    expect(screen.getByRole('cell', { name: 'avery@example.com' })).toBeVisible();
    expect(screen.getByText('Mar 4, 2026')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Edit' }));
    await user.click(screen.getByRole('button', { name: 'Delete' }));

    expect(onEdit).toHaveBeenCalledWith(submission);
    expect(onDelete).toHaveBeenCalledWith('candidate-1');
  });

  it('renders malicious stored submission text literally without creating executable markup', () => {
    const maliciousSubmission = {
      ...submission,
      id: 'candidate-xss',
      fullName: '<img src=x onerror=window.__xss=1>',
    };
    delete window.__xss;

    render(<SubmissionTable submissions={[maliciousSubmission]} onEdit={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText(maliciousSubmission.fullName)).toHaveTextContent(maliciousSubmission.fullName);
    expect(document.querySelector('img')).not.toBeInTheDocument();
    expect(window.__xss).toBeUndefined();
  });
});
