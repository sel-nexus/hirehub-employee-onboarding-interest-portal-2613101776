import { expect, test } from '@playwright/test';

test('candidate submits interest, navigates through the visible header to admin, and persists an editable record', async ({ page }) => {
  const browserErrors = [];
  page.on('pageerror', (error) => browserErrors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') browserErrors.push(message.text());
  });

  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Build Your Future With Us' })).toBeVisible();
  await expect(page.getByText('Why Join Us?')).toBeVisible();
  await page.getByRole('link', { name: 'Express Your Interest' }).click();
  await page.getByRole('button', { name: 'Submit Application' }).click();
  await expect(page.getByText('Full name is required.')).toBeVisible();

  await page.getByLabel('Full Name').fill('Avery Stone');
  await page.getByLabel('Email Address').fill('avery@example.com');
  await page.getByLabel('Mobile Number').fill('1234567890');
  await page.getByLabel('Department of Interest').selectOption('Engineering');
  await page.getByRole('button', { name: 'Submit Application' }).click();
  await expect(page.getByRole('status')).toContainText('Thank you! Your interest has been submitted successfully.');

  await page.getByRole('link', { name: 'Admin' }).click();
  await expect(page.getByRole('heading', { name: 'Admin Login' })).toBeVisible();
  await page.getByLabel('Username').fill('admin');
  await page.getByLabel('Password').fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Submissions Dashboard' })).toBeVisible();
  await expect(page.getByText('Avery Stone')).toBeVisible();

  await page.getByRole('button', { name: 'Edit' }).click();
  await expect(page.getByLabel('Email')).toBeDisabled();
  await page.getByLabel('Full Name').fill('Avery Rivers');
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await expect(page.getByText('Avery Rivers')).toBeVisible();

  await page.reload();
  await expect(page.getByRole('heading', { name: 'Submissions Dashboard' })).toBeVisible();
  await expect(page.getByText('Avery Rivers')).toBeVisible();
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('hirehub_submissions'))[0].email)).toBe('avery@example.com');
  expect(browserErrors).toEqual([]);
});
