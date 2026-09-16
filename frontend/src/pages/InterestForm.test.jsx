import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import InterestForm from './InterestForm.jsx';

function renderForm() { return render(<BrowserRouter><InterestForm /></BrowserRouter>); }

async function completeValidForm(user, email = 'avery@example.com') {
  await user.type(screen.getByLabelText('Full Name'), 'Avery Stone');
  await user.type(screen.getByLabelText('Email Address'), email);
  await user.type(screen.getByLabelText('Mobile Number'), '1234567890');
  await user.selectOptions(screen.getByLabelText('Department of Interest'), 'Engineering');
}

describe('InterestForm', () => {
  it('renders field-level feedback for invalid submission', async () => {
    const user = userEvent.setup();
    renderForm();
    await user.click(screen.getByRole('button', { name: 'Submit Application' }));
    expect(screen.getByText('Full name is required.')).toBeVisible();
    expect(screen.getByText('Email address is required.')).toBeVisible();
    expect(screen.getByText('Mobile number is required.')).toBeVisible();
    expect(screen.getByText('Please select a department.')).toBeVisible();
  });

  it('persists a valid application, resets fields, and auto-dismisses confirmation', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderForm();
    await completeValidForm(user);
    await user.click(screen.getByRole('button', { name: 'Submit Application' }));
    expect(screen.getByRole('status')).toHaveTextContent('Thank you! Your interest has been submitted successfully.');
    expect(JSON.parse(localStorage.getItem('hirehub_submissions'))).toHaveLength(1);
    expect(screen.getByLabelText('Full Name')).toHaveValue('');
    act(() => { vi.advanceTimersByTime(4000); });
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it('displays the exact duplicate email message', async () => {
    const user = userEvent.setup();
    renderForm();
    await completeValidForm(user);
    await user.click(screen.getByRole('button', { name: 'Submit Application' }));
    await completeValidForm(user);
    await user.click(screen.getByRole('button', { name: 'Submit Application' }));
    expect(screen.getByText('This email has already been submitted.')).toBeVisible();
  });
});
