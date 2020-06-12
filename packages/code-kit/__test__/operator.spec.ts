import { 
  toRawType, 
  isDefind, 
  isObject, 
  isPlainObject, 
  isString, 
  isNumber, 
  isSymbol, 
  isBoolean, 
  isFunction,
  isRegExp,
  isPromise,
  isPrimitive,
  isIE,

  is,
  not,
  deepEqual,
  identity,
  noop,
  no,

  curry,
  equal

} from '../src/operator'

function typeCheck (typeFunc: Function, values: any[], results: any) {
  values.forEach((v, i) => {
    expect(typeFunc(v)).toBe(Array.isArray(results) ? results[i] : results)
  })
}


describe('toRawType', () => {

  test('number type', () => {

    typeCheck(
      toRawType,
      [NaN, 12, Math.random(), Infinity, -0],
      'Number'
    )
  })

  test('string type', () => {
    typeCheck(
      toRawType,
      ['', 'abc'],
      'String'
    )
  })

  test('reg type', () => {
    typeCheck(
      toRawType,
      [/abc$/, new RegExp('abc')],
      'RegExp'
    )
  })
})

describe('type', () => {
  test('isDefind', () => {
    typeCheck(
      isDefind,
      [undefined, null, false],
      [false, false, true]
    )
  })

  test('isObject', () => {
    typeCheck(
      isObject,
      [undefined, null, /abc/, { a: 1 }, [1], 1, '', Promise.resolve()],
      [false, false, true, true, true, false, false, true]
    )
  })

  test('isPlainObject', () => {
    typeCheck(
      isPlainObject,
      [undefined, null, /abc/, { a: 1 }, [1], 1, ''],
      [false, false, true, true, true, false, false]
    )
  })

  test('isString', () => {
    typeCheck(
      isString,
      [undefined, null, /abc/, { a: 1 }, [1], 1, '', String(12)],
      [false, false, false, false, false, false, true, true]
    )
  })

  test('isNumber', () => {
    typeCheck(
      isNumber,
      [NaN, 12, Math.random(), Infinity, -0],
      true
    )

    typeCheck(
      isNumber,
      [undefined, null, /abc/, { a: 1 }, [1], '', String(12)],
      false
    )
  })

  test('isSymbol', () => {
    typeCheck(
      isSymbol,
      [undefined, null, /abc/, { a: 1 }, [1], 1, '', String(12)],
      false
    )

    typeCheck(
      isSymbol,
      [Symbol('1'), Symbol(5)],
      true
    )
  })

  test('isBoolean', () => {
    typeCheck(
      isBoolean,
      [undefined, null, /abc/, { a: 1 }, [1], 1, '', String(12)],
      false
    )

    typeCheck(
      isBoolean,
      [true, false, Boolean('true'), JSON.parse('false')],
      true
    )
  })

  test('isFunction', () => {
    typeCheck(
      isFunction,
      [undefined, null, /abc/, { a: 1 }, [1], 1, '', String(12)],
      false
    )

    typeCheck(
      isFunction,
      [Promise.resolve, Math.random, () => {}],
      true
    )
  })

  test('isRegExp', () => {
    typeCheck(
      isRegExp,
      [undefined, null, { a: 1 }, [1], 1, '', RegExp],
      false
    )

    typeCheck(
      isRegExp,
      [/1234/, new RegExp('abc')],
      true
    )
  })


  test('isPrimitive', () => {
    typeCheck(
      isPrimitive,
      [undefined, null, { a: 1 }, [1], /1234/],
      false
    )

    typeCheck(
      isPrimitive,
      [123, '123', Symbol('5'), false],
      true
    )
  })

  test('isPromise', () => {
    typeCheck(
      isPromise,
      [undefined, null, { a: 1 }, [1], /1234/, Promise],
      false
    )

    typeCheck(
      isPromise,
      [Promise.resolve(), new Promise(() => {})],
      true
    )
  })

  test('isIE', () => {
    expect(isIE()).toBe(false)
  })
})


describe('operators', () => {
  test('is', () => {
    expect(is(1, 2)).toBe(false)
    expect(is(1, 1)).toBe(true)
    expect(is([], [])).toBe(false)
  })


  test('not', () => {
    expect(not(1, 2)).toBe(true)
    expect(not({ a: 1 }, { a: 1 })).toBe(true)
    expect(not([], [])).toBe(true)
  })

  test('identity', () => {
    expect(identity(1) === 1).toBe(true)
    const obj = { a: 1 }
    expect(identity(obj) === { a: 1 }).toBe(false)
    expect(identity(obj) === obj).toBe(true)
  })

  test('noop', () => {
    expect(noop(1)).toBe(undefined)
    const obj = { a: 1 }
    noop(obj)
    expect(deepEqual(obj, obj)).toBe(true)
  })


  test('no', () => {
    expect(no(1)).toBe(false)
    expect(no(false)).toBe(false)
    expect(no()).toBe(false)
    expect(no('asd', [], {})).toBe(false)
  })

  test('deepEqual', () => {
    expect(deepEqual(1, 2)).toBe(false)
    expect(deepEqual(1, 1)).toBe(true)
    expect(deepEqual({ a: 1 }, { a: 1 })).toBe(true)
    expect(deepEqual({ a: 1 }, Promise.resolve)).toBe(false)
    expect(deepEqual([], [])).toBe(true)
    expect(deepEqual(
      { a: 1, b: { c: '2' } }, 
      { a: 1, b: { c: '2' } }
    )).toBe(true)
    expect(deepEqual(
      [2, [5, [9]]],
      [2, [5, [9]]],
    )).toBe(true)

    expect(deepEqual(
      [2, [5, [9]]],
      [2, [5, [7]]],
    )).toBe(false)

    expect(deepEqual(
      [2, [5, [9]]],
      [2, /abc/],
    )).toBe(false)

    const o1 = { a: { b: new Date() }}
    const o2 = { a: { b: new Date(2019) }} 
    const o3 = { a: { b: new Date(o1.a.b) }}

    expect(deepEqual(o1, o2)).toBe(false)
    expect(deepEqual(o1, o3)).toBe(true)

    const isArray = Array.isArray
    Array.isArray = false as any
    
    expect(deepEqual(
      [2, [5, [9]]],
      [2, [5, [9]]],
    )).toBe(false)

    Array.isArray = isArray
  })
})


describe('curry', () => {
  function add (a: number, b: number, c: number) {
    return a + b + c
  }

  test('simple curry', () => {
    const add5 = curry(add, 2, 3)

    expect(add5(7)).toBe(12)
  })

  test('multiple curry', () => {
    const add2 = curry(add, 2)
    const add5 = curry(add2, 3)

    expect(add2(1, 100)).toBe(103)
    expect(typeof add2(1)).toBe('function')
    expect(add5(4)).toBe(9)
  })
})



describe('equal', () => {
  function add (a: number, b: number, c: number) {
    return a + b + c
  }

  test('simple equal', () => {
    const add5 = curry(add, 2, 3)

    expect(equal(null, [], [])).toBe(false)
    expect(equal(null, 1, 2)).toBe(false)
    expect(equal(null, '5', '5')).toBe(true)
  })

  test('custom validator', () => {
    const isSameBusinessObject = curry(equal, (a, b) => a.id === b.id && a.category === b.category)

    expect(isSameBusinessObject(
      { id: 5, category: 4, name: 'fruit' },
      { id: 5, category: 4, name: 'fish' },
    )).toBe(true)

    expect(isSameBusinessObject(
      { id: 5, category: 4, name: 'fruit' },
      { id: 5, category: 5, name: 'fruit' },
    )).toBe(false)
  })
})
