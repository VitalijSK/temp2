import {  checkRusLetter,
          checkCountName,
          checkUpperFirstLetter,
          checkSymbolName
      }  from './name';

describe('Name validator', () => {
  it('should be correct if name contains russuan symbols', () => {
    expect(checkRusLetter('Привет world'.split(''))).toBeTruthy();
  });
  it('should be wrong if name is not contains russuan symbols', () => {
    expect(checkRusLetter('Hello world'.split(''))).toBeFalsy();
  });

  it('should be correct if name is tree or more words', () => {
    expect(checkCountName('hello world omg.'.split(''))).toBeTruthy();
  });
  it('should be correct if name is two or one word', () => {
    expect(checkCountName('hello world'.split(''))).toBeFalsy();
  });

  it('should be correct if name is not correct format CamelCase', () => {
    expect(checkUpperFirstLetter('HeLlo world'.split(''))).toBeTruthy();
  });
  it('should be wrong if name is correct format CamelCase', () => {
    expect(checkUpperFirstLetter('Hello World'.split(''))).toBeFalsy();
  });

  it('should be correct if name is not contains forbbiden symbols', () => {
    expect(checkSymbolName('Hell@s'.split(''))).toBeTruthy();
  });
  it('should be wrong if name contains forbbiden symbols', () => {
    expect(checkSymbolName('Hells'.split(''))).toBeFalsy();
  });
});
