
type pipeFn = (value: any) => any;
type pipe = (...fn: Array<pipeFn>) => pipeFn;

export const pipe: pipe = (...fn) => (initialValue) => {
  return fn.reduce((y, f) => f(y), initialValue);
};

export const tap = (action) => (value) => {
  action(value);
  return value;
};

export const iif = (predicate, action, alternative?) => value => {
  if (!alternative) {
    alternative = v => v;
  }
  return predicate(value)
    ? action(value)
    : alternative(value);
};
