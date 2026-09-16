import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createSubmission, deleteSubmission, getSubmissions, updateSubmission, SUBMISSIONS_KEY } from './storage.js';

const candidate = { fullName: 'Avery Stone', email: 'avery@example.com', mobile: '1234567890', department: 'Engineering' };

describe('submission storage', () => {
  beforeEach(() => {
    let sequence = 0;
    vi.stubGlobal('crypto', { randomUUID: () => `test-id-${++sequence}` });
  });

  it('creates a normalized record with an id and ISO timestamp', () => {
    const created = createSubmission({ ...candidate, email: 'AVERY@EXAMPLE.COM' });
    expect(created).toMatchObject({ id: 'test-id-1', email: 'avery@example.com', ...candidate });
    expect(created.submittedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(getSubmissions()).toEqual([created]);
  });

  it('rejects a duplicate email without adding a second record', () => {
    createSubmission(candidate);
    expect(() => createSubmission(candidate)).toThrow('This email has already been submitted.');
    expect(getSubmissions()).toHaveLength(1);
  });

  it('recovers from malformed localStorage JSON', () => {
    localStorage.setItem(SUBMISSIONS_KEY, '{invalid');
    expect(getSubmissions()).toEqual([]);
    expect(localStorage.getItem(SUBMISSIONS_KEY)).toBeNull();
  });

  it('returns an empty list for absent and non-array storage values', () => {
    expect(getSubmissions()).toEqual([]);
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify({ id: 'not-an-array' }));
    expect(getSubmissions()).toEqual([]);
  });

  it('updates allowed fields and deletes only the selected record', () => {
    createSubmission(candidate);
    const second = createSubmission({ ...candidate, email: 'second@example.com', fullName: 'Morgan Reed' });
    const updated = updateSubmission('test-id-1', { ...candidate, fullName: 'Avery Rivers', mobile: '0987654321', department: 'Design' });
    expect(updated).toMatchObject({ fullName: 'Avery Rivers', email: 'avery@example.com', mobile: '0987654321', department: 'Design' });
    expect(deleteSubmission(second.id)).toEqual([updated]);
  });

  it('rejects invalid and unknown updates without changing browser storage', () => {
    createSubmission(candidate);
    const before = localStorage.getItem(SUBMISSIONS_KEY);

    expect(() => updateSubmission('test-id-1', { ...candidate, mobile: '123' })).toThrow('Submission fields are invalid.');
    expect(localStorage.getItem(SUBMISSIONS_KEY)).toBe(before);
    expect(() => updateSubmission('missing-id', candidate)).toThrow('Submission not found.');
    expect(localStorage.getItem(SUBMISSIONS_KEY)).toBe(before);
  });
});
