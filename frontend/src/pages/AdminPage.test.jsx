import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import AdminPage from './AdminPage.jsx';

function renderPage() {
  return render(
    <MemoryRouter>
      <AdminPage />
    </MemoryRouter>,
  );
}

describe('AdminPage', () => {
  it('shows the demo login when no authenticated session exists', () => {
    renderPage();

    expect(screen.getByRole('heading', { name: 'Admin Login' })).toBeVisible();
    expect(screen.queryByRole('heading', { name: 'Submissions Dashboard' })).not.toBeInTheDocument();
  });

  it('shows the dashboard for an authenticated browser session', () => {
    sessionStorage.setItem('hirehub_admin_auth', 'true');
    renderPage();

    expect(screen.getByRole('heading', { name: 'Submissions Dashboard' })).toBeVisible();
    expect(screen.getByText('No submissions yet.')).toBeVisible();
    expect(screen.queryByRole('heading', { name: 'Admin Login' })).not.toBeInTheDocument();
  });
});
