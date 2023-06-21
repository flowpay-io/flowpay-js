import {orElse, isDefined, round2} from '../util';

test('orElse works', () => {
  const x1 = null;
  const x2 = undefined;
  const x3 = '';
  const x4 = ' ';
  const x5 = 0;
  const x6 = false;
  const x7 = true;

  expect(orElse(x1, 'y')).toBe('y');
  expect(orElse(x2, 'y')).toBe('y');
  expect(orElse(x3, 'y')).toBe('');
  expect(orElse(x4, 'y')).toBe(' ');
  expect(orElse(x5, 'y')).toBe(0);
  expect(orElse(x6, 'y')).toBe(false);
  expect(orElse(x7, 'y')).toBe(true);
});

test('isDefined works', () => {
  const x1 = null;
  const x2 = undefined;
  const x3 = '';
  const x4 = ' ';
  const x5 = 0;
  const x6 = false;
  const x7 = true;

  expect(isDefined(x1)).toBe(false);
  expect(isDefined(x2)).toBe(false);
  expect(isDefined(x3)).toBe(true);
  expect(isDefined(x4)).toBe(true);
  expect(isDefined(x5)).toBe(true);
  expect(isDefined(x6)).toBe(true);
  expect(isDefined(x7)).toBe(true);
});

test('round2 works', () => {
  const x1 = 1;
  const x2 = 1.1;
  const x3 = 1.12;
  const x4 = 1.123;
  const x5 = 1.1234;

  expect(round2(x1)).toBe(1.0);
  expect(round2(x2)).toBe(1.1);
  expect(round2(x3)).toBe(1.12);
  expect(round2(x4)).toBe(1.12);
  expect(round2(x5)).toBe(1.12);
});
