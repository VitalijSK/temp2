import { checkDate }  from './date';

describe('Date validator', () => {
  it('should be wrong if date is wrong format', () => {
    expect(checkDate('10.10.18', 'DD-MMM-YY')).toBeFalsy();
  });
  it('should be true if date is correct format', () => {
    expect(checkDate('11-Jun-18', 'DD-MMM-YY')).toBeTruthy();
  });
});
