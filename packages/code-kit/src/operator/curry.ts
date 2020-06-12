export function curry(fn: Function, ...args: any[]){
  return (..._args: any[]) =>
    (
      rest => rest.length >= fn.length ? fn(...rest) : curry(fn, rest)
    )([ ...args, ..._args ])
}