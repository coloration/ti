import { PlainObject, isObject, curry, isPlainObject, isString } from "../operator"

export function objectHas (obj: PlainObject, ...fields: string[]): boolean {
  return fields.every(function (field) {
    if (!isObject(obj)) return false
    const has = obj.hasOwnProperty(field)
    obj = obj[field]
    return has
  })
}

export function objectGet<V = any, D = undefined> (defaultValue: D, obj: PlainObject, ...fields: string[]) {

  if (!isObject(obj)) return defaultValue
  let value: V

  fields.some(function (field) {
    return (value = obj = obj[field]) === undefined
  })

  return value === undefined ? defaultValue : value
}

export const objectGetDefaultNull: <T = any>(obj: PlainObject, ...fields: string[]) => T | null
  = curry(objectGet, null)


export function reverseKeyValue <T = string> (obj: PlainObject<T>): PlainObject<T> {
  return Object.fromEntries(reverseEntries<T>(Object.entries(obj)))
}

export function reverseEntries <T = string>(entries: (string | T)[][]) : (string | T)[][] {
  return entries.map(entry => entry.reverse())
}


export function objectToQuery<T = PlainObject> (encode: boolean, object: T): string {
  
  if (!isPlainObject(object)) return ''
  
  const result = []

  for (const key in object) {
    const stringValue = object[key] + ''
    const value = encode ? encodeURIComponent(stringValue) : stringValue
    result.push(`${key}=${value}`)
  }

  return result.join('&')
}

export function queryToObject (raw: boolean, query: string): PlainObject {
  const result = Object.create(null)
  
  if (!isString(query)) return result
  query = query.replace(/^\?/, '')

  return query.split('&').reduce(function (acc, curr) {
    const p = curr.split('=')
    if (p.length === 2) {
      let val = p[1]
      if (raw) {
        try { val = JSON.parse(val) } catch (e) {}
      }
      acc[p[0]] = val
    }
    return acc
  }, result)
}

export * from './tree'