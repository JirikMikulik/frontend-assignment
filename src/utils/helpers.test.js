import {getFormatedDate} from './helpers';

describe('getFormatedDate', () => {
  it('should format the date correctly for the first day of January', () => {
    const date = new Date(2024, 0, 1); // 1. ledna 2024
    const result = getFormatedDate(date);
    expect(result).toBe('1. ledna 2024');
  });

  it('should format the date correctly for a mid-month date', () => {
    const date = new Date(2024, 5, 15); // 15. června 2024
    const result = getFormatedDate(date);
    expect(result).toBe('15. června 2024');
  });

  it('should format the date correctly for the last day of December', () => {
    const date = new Date(2024, 11, 31); // 31. prosince 2024
    const result = getFormatedDate(date);
    expect(result).toBe('31. prosince 2024');
  });

  it('should handle different years', () => {
    const date = new Date(2020, 3, 10); // 10. dubna 2020
    const result = getFormatedDate(date);
    expect(result).toBe('10. dubna 2020');
  });
});
