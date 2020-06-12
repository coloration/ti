import { isFunction } from './type'

export function equal (
  f: undefined | ((a: any, b: any) => boolean),
  a: any,
  b: any
) {
  return isFunction(f) ? f(a, b) : Object.is(a, b)
}
