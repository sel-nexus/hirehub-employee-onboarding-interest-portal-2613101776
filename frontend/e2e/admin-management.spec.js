import { expect, test } from '@playwright/test';

test('administrator reaches an authenticated empty dashboard from the visible login flow', async ({ page }) => {
  const browserErrors = [];
  page.on('pageerror', (error) => browserErrors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') browserErrors.push(message.text());
  });

  await page.goto('/admin');
  await page.getByLabel('Username').fill('invalid');
  await page.getByLabel('Password').fill('invalid');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Invalid credentials. Please try again.')).toBeVisible();

  await page.getByLabel('Username').fill('admin');
  await page.getByLabel('Password').fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Submissions Dashboard' })).toBeVisible();
  await expect(page.getByText('No submissions yet.')).toBeVisible();
  await expect(page.getByText('N/A')).toBeVisible();
  expect(browserErrors).toEqual([]);
});

test('administrator can manage a mobile-friendly submissions table and logout', async ({ page }) => {
  const browserErrors = [];
  page.on('pageerror', (error) => browserErrors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') browserErrors.push(message.text());
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => {
    localStorage.setItem('hirehub_submissions', JSON.stringify([
      { id: 'candidate-1', fullName: 'Avery Stone', email: 'avery@example.com', mobile: '1234567890', department: 'Engineering', submittedAt: '2026-03-04T10:00:00.000Z' },
      { id: 'candidate-2', fullName: 'Morgan Reed', email: 'morgan@example.com', mobile: '0987654321', department: 'Design', submittedAt: '2026-03-05T10:00:00.000Z' },
    ]));
  });
  await page.goto('/admin');
  await expect(page.getByRole('link', { name: 'Apply' })).toBeVisible();
  await page.getByLabel('Username').fill('admin');
  await page.getByLabel('Password').fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('table')).toBeVisible();
  await expect(page.getByText('Avery Stone')).toBeVisible();
  await page.getByRole('button', { name: 'Edit' }).first().click();
  await page.getByLabel('Full Name').fill('Avery Rivers');
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await expect(page.getByText('Avery Rivers')).toBeVisible();
  await page.screenshot({ path: 'test-results/mobile-admin-dashboard.png', fullPage: true });

  page.once('dialog', (dialog) => dialog.accept());
  await page.getByRole('button', { name: 'Delete' }).nth(1).click();
  await expect(page.getByText('Morgan Reed')).not.toBeVisible();
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('hirehub_submissions')).length)).toBe(1);

  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect.poll(() => page.evaluate(() => sessionStorage.getItem('hirehub_admin_auth'))).toBeNull();
  expect(browserErrors).toEqual([]);
});
