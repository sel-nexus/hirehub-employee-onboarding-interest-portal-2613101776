import { expect, test } from '@playwright/test';

test('candidate can review culture, correct invalid fields, submit interest, and see duplicate protection', async ({ page }) => {
  const browserErrors = [];
  page.on('pageerror', (error) => browserErrors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') browserErrors.push(message.text()); });

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
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('hirehub_submissions')).length)).toBe(1);

  await page.getByLabel('Full Name').fill('Avery Stone');
  await page.getByLabel('Email Address').fill('avery@example.com');
  await page.getByLabel('Mobile Number').fill('1234567890');
  await page.getByLabel('Department of Interest').selectOption('Engineering');
  await page.getByRole('button', { name: 'Submit Application' }).click();
  await expect(page.getByText('This email has already been submitted.')).toBeVisible();
  expect(browserErrors).toEqual([]);
});
