import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Header from './Header.jsx';

function renderHeader(initialEntry = '/') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Header />
      <Routes>
        <Route path="/" element={<p>Home route</p>} />
        <Route path="/apply" element={<p>Apply route</p>} />
        <Route path="/admin" element={<p>Admin route</p>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('Header', () => {
  it('provides visible Home, Apply, and Admin route links and a Login route action', async () => {
    const user = userEvent.setup();
    renderHeader();

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Apply' })).toHaveAttribute('href', '/apply');
    expect(screen.getByRole('link', { name: 'Admin' })).toHaveAttribute('href', '/admin');
    expect(screen.getByRole('link', { name: 'Login' })).toHaveAttribute('href', '/admin');

    await user.click(screen.getByRole('link', { name: 'Apply' }));
    expect(screen.getByText('Apply route')).toBeVisible();
    await user.click(screen.getByRole('link', { name: 'Admin' }));
    expect(screen.getByText('Admin route')).toBeVisible();
  });

  it('reads the session state and logs out to the landing route', async () => {
    const user = userEvent.setup();
    sessionStorage.setItem('hirehub_admin_auth', 'true');
    renderHeader('/admin');

    expect(screen.getByRole('button', { name: 'Logout' })).toBeVisible();
    expect(screen.queryByRole('link', { name: 'Login' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Logout' }));
    expect(sessionStorage.getItem('hirehub_admin_auth')).toBeNull();
    expect(screen.getByText('Home route')).toBeVisible();
  });
});
