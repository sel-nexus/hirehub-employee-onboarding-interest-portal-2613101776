import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import AdminLogin from './AdminLogin.jsx';

describe('AdminLogin', () => {
  it('rejects invalid demo credentials and does not establish a session', async () => {
    const user = userEvent.setup();
    render(<AdminLogin onLogin={vi.fn()} />);
    await user.type(screen.getByLabelText('Username'), 'wrong');
    await user.type(screen.getByLabelText('Password'), 'credentials');
    await user.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid credentials. Please try again.');
    expect(sessionStorage.getItem('hirehub_admin_auth')).toBeNull();
  });

  it('accepts admin/admin, records the tab session, and informs the parent', async () => {
    const user = userEvent.setup();
    const onLogin = vi.fn();
    render(<AdminLogin onLogin={onLogin} />);
    await user.type(screen.getByLabelText('Username'), 'admin');
    await user.type(screen.getByLabelText('Password'), 'admin');
    await user.click(screen.getByRole('button', { name: 'Login' }));
    expect(sessionStorage.getItem('hirehub_admin_auth')).toBe('true');
    expect(onLogin).toHaveBeenCalledOnce();
  });
});
