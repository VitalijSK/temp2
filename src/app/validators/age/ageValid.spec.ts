import { checkInterval, checkInt }  from './age';

describe('Age validator', () => {
  it('should be wrong if age is out of range', () => {
    expect(checkInterval(18, 65, 1)).toBeFalsy();
  });
  it('should be true if age is in of range', () => {
    expect(checkInterval(18, 65, 21)).toBeTruthy();
  });

  it('should be wrong if age is not intenger', () => {
    expect(checkInt(18.3)).toBeFalsy();
  });
  it('should be true if age is intenger', () => {
    expect(checkInt(18)).toBeTruthy();
  });
});
