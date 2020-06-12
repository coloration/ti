import { a, c, cPick } from '../src/math'

describe('test c', () => {
  test('c32 equal 3', () => expect(c(3, 2)).toBe(3))
  test('c53 equal 10', () => expect(c(5, 3)).toBe(10))
})


describe('test a', () => {
  test('a32 equal 6', () => expect(a(3, 2)).toBe(6))
  test('a53 equal 60', () => expect(a(5, 3)).toBe(60))
})

describe('test cPick', () => {

  const collection = [
    1, 2, 3, 4, 5, 6
  ]

  test('return empty', () => {
    const result = cPick(collection, 0)
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(0)
  })

  test('pick one', () => {
    const result = cPick(collection, 1)
    expect(Array.isArray(result)).toBe(true)
    expect(result.every((r, i) => {

      return Array.isArray(r) &&
      r.length === 1 &&
      r[0] === collection[i]
    })).toBe(true)
    expect(result.length).toBe(collection.length)

  })
})