import { describe, expect, it } from 'vitest';
import { validateSubmission } from './validation.js';

describe('validateSubmission', () => {
  it('accepts a complete submission using a supported department', () => {
    expect(validateSubmission({ fullName: 'Avery Stone', email: 'avery@example.com', mobile: '1234567890', department: 'Engineering' })).toEqual({});
  });

  it('reports every invalid field with a targeted message', () => {
    expect(validateSubmission({ fullName: 'Avery9', email: 'not-an-email', mobile: '123', department: '' })).toEqual({
      fullName: 'Full name can contain alphabets and spaces only.',
      email: 'Please enter a valid email address.',
      mobile: 'Mobile number must contain exactly 10 digits.',
      department: 'Please select a department.',
    });
  });

  it('rejects an overly long name', () => {
    expect(validateSubmission({ fullName: 'A'.repeat(101), email: 'avery@example.com', mobile: '1234567890', department: 'Design' }).fullName).toBe('Full name must be 100 characters or fewer.');
  });
});
