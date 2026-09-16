import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import LandingPage from './LandingPage.jsx';

describe('LandingPage', () => {
  it('renders culture content and sends the primary CTA to apply', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter initialEntries={['/']}><Routes><Route path="/" element={<LandingPage />} /><Route path="/apply" element={<p>Apply route</p>} /></Routes></MemoryRouter>);
    expect(screen.getByRole('heading', { name: 'Build Your Future With Us' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Why Join Us?' })).toBeVisible();
    expect(screen.getByText('Innovation')).toBeVisible();
    expect(screen.getByText('Career Growth')).toBeVisible();
    expect(screen.getByText('Great Culture')).toBeVisible();
    expect(screen.getByText('Global Impact')).toBeVisible();
    await user.click(screen.getByRole('link', { name: 'Express Your Interest' }));
    expect(screen.getByText('Apply route')).toBeVisible();
  });
});
