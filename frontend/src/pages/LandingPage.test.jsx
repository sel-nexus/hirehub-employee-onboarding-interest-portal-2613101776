import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Header from '../components/Header.jsx';
import LandingPage from './LandingPage.jsx';

describe('LandingPage', () => {
  it('renders culture content and sends both CTAs and header Apply navigation to the visible apply route', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter initialEntries={['/']}><Header /><Routes><Route path="/" element={<LandingPage />} /><Route path="/apply" element={<p>Apply route</p>} /></Routes></MemoryRouter>);
    expect(screen.getByRole('heading', { name: 'Build Your Future With Us' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Why Join Us?' })).toBeVisible();
    expect(screen.getByText('Innovation')).toBeVisible();
    expect(screen.getByText('Career Growth')).toBeVisible();
    expect(screen.getByText('Great Culture')).toBeVisible();
    expect(screen.getByText('Global Impact')).toBeVisible();

    await user.click(screen.getByRole('link', { name: 'Express Your Interest' }));
    expect(screen.getByText('Apply route')).toBeVisible();
    await user.click(screen.getByRole('link', { name: 'Home' }));
    await user.click(screen.getByRole('link', { name: 'Apply Now' }));
    expect(screen.getByText('Apply route')).toBeVisible();
    await user.click(screen.getByRole('link', { name: 'Home' }));
    await user.click(screen.getByRole('link', { name: 'Apply' }));
    expect(screen.getByText('Apply route')).toBeVisible();
  });

  it('renders the fallback route instead of landing content for an unknown path', () => {
    render(
      <MemoryRouter initialEntries={['/not-a-route']}>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/apply" element={<p>Apply route</p>} />
          <Route path="*" element={<p>Route not found</p>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Route not found')).toBeVisible();
    expect(screen.queryByRole('heading', { name: 'Build Your Future With Us' })).not.toBeInTheDocument();
  });
});
