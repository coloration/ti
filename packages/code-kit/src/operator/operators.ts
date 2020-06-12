import { equal } from './equal'
import { isObject } from './type'
import { curry } from './curry'

export const is: <T = any>(a: T, b: T) => boolean = curry(equal, Object.is)
export const not: <T = any>(a: T, b: T) => boolean = curry(equal, function () {
  return !Object.is.apply(null, arguments)
})

export function deepEqual (a: any, b: any): boolean {
  if (a === b) return true
  const isObjectA = isObject(a)
  const isObjectB = isObject(b)
  if (isObjectA && isObjectB) {
    try {
      const isArrayA = Array.isArray(a)
      const isArrayB = Array.isArray(b)
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every((e: any, i: number) => {
          return deepEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        const keysA = Object.keys(a)
        const keysB = Object.keys(b)
        return keysA.length === keysB.length && keysA.every(key => {
          return deepEqual(a[key], b[key])
        })
      }

      return false

    } catch (e) {
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } 
  
  return false
}




export const identity = <T = any>(value: T) => value
export const noop = (..._args: any[]) => {}
export const no = (..._args: any[]) => false