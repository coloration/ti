import { microDelay, macroDelay } from '../src'
describe('process', () => {

  test('microDelay', () => {

    const a = jest.fn()

    const delayA = microDelay(a)

    delayA()
    delayA()
    delayA()
    delayA()
    delayA()

    expect(a).not.toBeCalled()

    return Promise.resolve()
    .then(() => {
      expect(a).toBeCalled()
      expect(a).toHaveBeenCalledTimes(1)
    })
  })

  jest.useFakeTimers()

  test('microDelay2', () => {
    let b = 0
    function delay (fn) {
      return function () {
        setTimeout(() => {
          b++
          microDelay(fn)
        }, 0)
      }
    }


    const a = jest.fn()

    const delayA = delay(a)

    delayA()
    delayA()
    delayA()
    delayA()
    delayA()

    expect(a).not.toBeCalled()
    
    jest.runAllTimers()
    expect(a).not.toBeCalled()
    expect(b).toBe(5)
    
  })

  jest.useFakeTimers()

  test('macroDelay', () => {
    const a = jest.fn()

    const delayA = macroDelay(a)

    delayA()
    delayA()
    delayA()
    delayA()
    delayA()

    expect(a).not.toBeCalled()
    jest.runAllTimers()
    expect(a).toBeCalled()
    expect(a).toHaveBeenCalledTimes(1)
    
  })

  test('macroDelay 2', () => {
    const a = jest.fn()

    const delayA = macroDelay(a)

    delayA()
    delayA()
    delayA()
    delayA()
    delayA()
   
    return Promise.resolve()
    .then(() => {
      expect(a).not.toBeCalled()
    })
  })
})