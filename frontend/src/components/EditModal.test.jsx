import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import EditModal from './EditModal.jsx';

const submission = {
  id: 'candidate-1',
  fullName: 'Avery Stone',
  email: 'avery@example.com',
  mobile: '1234567890',
  department: 'Engineering',
};

function renderModal(overrides = {}) {
  const onSave = vi.fn();
  const onCancel = vi.fn();
  const view = render(<EditModal submission={submission} onSave={onSave} onCancel={onCancel} {...overrides} />);
  return { onSave, onCancel, ...view };
}

describe('EditModal', () => {
  it('keeps email immutable and blocks saving invalid editable fields', async () => {
    const user = userEvent.setup();
    const { onSave } = renderModal();

    expect(screen.getByLabelText('Email')).toBeDisabled();
    expect(screen.getByLabelText('Email')).toHaveValue('avery@example.com');
    await user.clear(screen.getByLabelText('Full Name'));
    await user.clear(screen.getByLabelText('Mobile'));
    await user.type(screen.getByLabelText('Mobile'), '123');
    await user.click(screen.getByRole('button', { name: 'Save Changes' }));

    expect(screen.getByText('Full name is required.')).toBeVisible();
    expect(screen.getByText('Mobile number must contain exactly 10 digits.')).toBeVisible();
    expect(onSave).not.toHaveBeenCalled();
  });

  it('cancels from the button, Escape key, and backdrop without saving', async () => {
    const user = userEvent.setup();
    const first = renderModal();
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(first.onCancel).toHaveBeenCalledOnce();
    expect(first.onSave).not.toHaveBeenCalled();
    first.unmount();

    const second = renderModal();
    await user.keyboard('{Escape}');
    expect(second.onCancel).toHaveBeenCalledOnce();
    expect(second.onSave).not.toHaveBeenCalled();
    second.unmount();

    const third = renderModal();
    fireEvent.mouseDown(document.querySelector('.modal-backdrop'));
    expect(third.onCancel).toHaveBeenCalledOnce();
    expect(third.onSave).not.toHaveBeenCalled();
  });
});
